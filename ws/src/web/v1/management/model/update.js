import * as yup from 'yup';
import { updateModelService } from '../../../../service/management/model';

const schema = yup.object().shape({
  id: yup.string().required('id-is-required'),
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
  enManualFileChanged: yup
    .bool()
    .required('en-manual-file-changed-is-required'),
  ptManualFileChanged: yup
    .bool()
    .required('pt-manual-file-changed-is-required'),
  esManualFileChanged: yup
    .bool()
    .required('es-manual-file-changed-is-required'),
});

export default async (ctx) => {
  const {
    id,
    model,
    codePattern,
    augmentifyId,
    name: nameJson,
    family: familyJson,
    manual: manualJson,
    description: descriptionJson,
    playlist,
    images: imagesJson,
    enManualFileChanged,
    esManualFileChanged,
    ptManualFileChanged,
  } = ctx.request.body;

  const name = JSON.parse(nameJson);
  const family = JSON.parse(familyJson);
  const manual = JSON.parse(manualJson);
  const description = JSON.parse(descriptionJson);
  const images = JSON.parse(imagesJson);

  await schema.validate(
    {
      id,
      model,
      codePattern,
      augmentifyId,
      name,
      family,
      manual,
      description,
      playlist,
      images,
      enManualFileChanged,
      esManualFileChanged,
      ptManualFileChanged,
    },
    { abortEarly: false }
  );

  const { enManualFile, ptManualFile, esManualFile } = ctx.files;

  await updateModelService({
    id,
    model,
    codePattern,
    augmentifyId,
    name,
    family,
    manual,
    description,
    playlist,
    images,
    enManualFileChanged: enManualFileChanged === 'true',
    esManualFileChanged: esManualFileChanged === 'true',
    ptManualFileChanged: ptManualFileChanged === 'true',
    enManualFile:
      enManualFile && enManualFile.length > 0 ? enManualFile[0] : undefined,
    ptManualFile:
      ptManualFile && ptManualFile.length > 0 ? ptManualFile[0] : undefined,
    esManualFile:
      esManualFile && esManualFile.length > 0 ? esManualFile[0] : undefined,
  });

  return ctx.ok();
};
