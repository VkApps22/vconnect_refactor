import path from 'path';
import * as yup from 'yup';
import multer from '@koa/multer';
import GridFsStorage from 'multer-gridfs-storage';

import { env } from '../../../../config';
import { addModelService } from '../../../../service/management/model';

const storage = new GridFsStorage({
  url: env.MONGODB_URI,
  file: (req, file) => {
    return new Promise((resolve) => {
      const filename = req.body.fileName + path.extname(file.originalname);
      const fileInfo = {
        filename,
        bucketName: 'files',
      };
      resolve(fileInfo);
    });
  },
});

const fileFilter = (req, file, callback) => {
  const ext = path.extname(file.originalname);
  if (ext !== '.pdf') return callback(new Error('Only PDF files are allowed'));

  return callback(null, true);
};

const uploadMulter = multer({
  storage,
  fileFilter,
  limits: { fieldSize: 25 * 1024 * 1024 },
});

export const addFormFields = uploadMulter.fields([
  { name: 'enManualFile', maxCount: 1 },
  { name: 'ptManualFile', maxCount: 1 },
  { name: 'esManualFile', maxCount: 1 },
]);

const schema = yup.object().shape({
  model: yup
    .string()
    .required('model-is-required')
    .max(15, 'maximum-allowed-model-length-is-15-characters'),
  codePattern: yup.string().required('code-pattern-is-required'),
  augmentifyId: yup.string(),
  name: yup
    .array()
    .of(
      yup.object().shape({
        value: yup
          .string()
          .required('name-value-is-required')
          .max(25, 'maximum-allowed-name-length-is-25-characters'),
        language: yup.string().required('name-language-is-required'),
      })
    )
    .required('name-is-required'),
  family: yup
    .array()
    .of(
      yup.object().shape({
        value: yup
          .string()
          .required('family-value-is-required')
          .max(25, 'maximum-allowed-family-length-is-25-characters'),
        language: yup.string().required('family-language-is-required'),
      })
    )
    .required('family-is-required'),
  manual: yup.array().of(
    yup.object().shape({
      sections: yup.array().of(
        yup.object().shape({
          icon: yup.string().required('manual-section-icon-is-required'),
          title: yup.string().required('manual-section-title-is-required'),
          page: yup.number().required('manual-section-page-is-required'),
        })
      ),
      language: yup.string().required('manual-language-is-required'),
    })
  ),
  description: yup
    .array()
    .of(
      yup.object().shape({
        value: yup
          .string()
          .required('description-value-is-required')
          .max(400, 'maximum-allowed-length-is-400-characters'),
        language: yup.string().required('description-language-is-required'),
      })
    )
    .required('description-is-required'),
  playlist: yup
    .string()
    .matches(/^http(s)?:\/\/(www\.)?youtube\.com/, 'invalid-youtube-link'),
  images: yup.array().of(
    yup.object().shape({
      image: yup
        .string()
        .required('images-image-is-required')
        .matches(
          /^data:image\/png;base64,/,
          'incorrect-file-type-accepted-type-is-png'
        ),
      thumbnail: yup.bool().required('images-thumbnail-is-required'),
    })
  ),
});

export default async (ctx) => {
  const {
    model,
    codePattern,
    augmentifyId,
    name: nameJson,
    family: familyJson,
    manual: manualJson,
    description: descriptionJson,
    playlist,
    images: imagesJson,
  } = ctx.request.body;

  const name = JSON.parse(nameJson);
  const family = JSON.parse(familyJson);
  const manual = JSON.parse(manualJson);
  const description = JSON.parse(descriptionJson);
  const images = JSON.parse(imagesJson);

  await schema.validate(
    {
      model,
      codePattern,
      augmentifyId,
      name,
      family,
      manual,
      description,
      playlist,
      images,
    },
    { abortEarly: false }
  );

  const { enManualFile, ptManualFile, esManualFile } = ctx.files;

  await addModelService({
    model,
    codePattern,
    augmentifyId,
    name,
    family,
    manual,
    description,
    playlist,
    images,
    enManualFile:
      enManualFile && enManualFile.length > 0 ? enManualFile[0] : undefined,
    ptManualFile:
      ptManualFile && ptManualFile.length > 0 ? ptManualFile[0] : undefined,
    esManualFile:
      esManualFile && esManualFile.length > 0 ? esManualFile[0] : undefined,
  });

  return ctx.ok();
};
