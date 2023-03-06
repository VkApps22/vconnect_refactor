import * as yup from 'yup';
import React from 'react';
import IdentificationForm from '../IdentificationForm';
import ManualForm from '../ManualForm';
import DescriptionForm from '../DescriptionForm';
import ImagesForm from '../ImagesForm';

const buildIdentificationSchema = (t) => ({
  productName: yup
    .object()
    .shape({
      nameKey: yup.string().required(t('required-field')),
      name: yup.array().of(
        yup.object().shape({
          language: yup.string().required(),
          value: yup.string().required(),
        })
      ),
    })
    .nullable()
    .required(t('required-field')),
  familyName: yup
    .object()
    .shape({
      familyKey: yup.string().required(t('required-field')),
      family: yup.array().of(
        yup.object().shape({
          language: yup.string().required(),
          value: yup.string().required(),
        })
      ),
    })
    .nullable()
    .required(t('required-field')),
  modelCode: yup
    .string()
    .required(t('required-field'))
    .matches(/^(\d{4,5})(\|(\d{4,5}))*$/, t('invalid-model-code')),

    augmentifyId: yup
                      .string(),
                      //invalid message -> t('invalid-augmentify-id')
  modelName: yup
    .string()
    .required(t('required-field'))
    .max(15, t('maximum-allowed-length-is-n-characters', { n: 15 })),
});

const buildManualsSchema = (t) =>
  yup.array().of(
    yup.object().shape({
      hasManual: yup.bool(),
      manual: yup.object().when('hasManual', {
        is: true,
        then: yup
          .object()
          .shape({
            file: yup
              .mixed()
              .required(t('required-field'))
              .test(
                'fileFormat',
                t('incorrect-file-type-accepted-types', { types: '.pdf' }),
                (value) =>
                  value && (value.type === 'application/pdf' || value.link)
              ),
            language: yup.string(),
            sections: yup
              .array()
              .of(
                yup.object().shape({
                  icon: yup.string(),
                  title: yup.string(),
                  page: yup
                    .number()
                    .typeError(t('must-be-a-number'))
                    .min(0, t('must-be-greater-then-or-equal-to-0')),
                })
              )
              .notRequired(),
          })
          .required(t('required-field')),
      }),
    })
  );

const buildDescriptionsSchema = (t) =>
  yup.array().of(
    yup.object().shape({
      language: yup.string(),
      value: yup.string().required(t('required-field')),
    })
  );

const buildVideosAndImagesSchema = (t) => ({
  videoLink: yup.object().shape({
    hasVideo: yup.bool(),
    link: yup
      .string()
      .nullable()
      .when('hasVideo', {
        is: true,
        then: yup
          .string()
          .required(t('required-field'))
          .matches(
            /^http(s)?:\/\/(www\.)?youtube\.com/,
            t('invalid-youtube-link')
          ),
      }),
  }),
  images: yup.object().shape({
    hasImages: yup.bool(),
    files: yup.array().when('hasImages', {
      is: true,
      then: yup
        .array()
        .test('ArrayNotEmpty', t('required-field'), (value) => value.length > 0)
        .of(
          yup
            .mixed()
            .test(
              'fileFormat',
              t('incorrect-file-type-accepted-types', { types: '.png' }),
              (value) => value && value.type === 'image/png'
            )
        ),
    }),
  }),
});

const buildSchema = ({
  identificationSchema,
  manualsSchema,
  descriptionsSchema,
  videosAndImagesSchema,
}) =>
  yup.object().shape({
    ...identificationSchema,
    manuals: manualsSchema,
    descriptions: descriptionsSchema,
    ...videosAndImagesSchema,
  });

const getIsErrored = (testsList) => !!testsList.find((y) => y === true);
const buildStepper = (
  t,
  {
    identificationSchema,
    manualsSchema,
    descriptionsSchema,
    videosAndImagesSchema,
  }
) => (
  values,
  errors,
  handleChange,
  handleUpdateActiveStep,
  setFieldValue,
  touched,
  setFieldTouched
) => [
  {
    label: t('identification'),
    content: (
      <IdentificationForm
        values={values}
        errors={errors}
        handleChange={handleChange}
        setFieldValue={setFieldValue}
        onFocus={() => handleUpdateActiveStep(0)}
        touched={touched}
        setFieldTouched={setFieldTouched}
      />
    ),
    isErrored: getIsErrored([
      !!(touched.productName && errors.productName),
      !!(touched.familyName && errors.familyName),
      !!(touched.modelCode && errors.modelCode),
      !!(touched.augmentifyId && errors.augmentifyId),
      !!(touched.modelName && errors.modelName),
    ]),
    isCompleted: yup.object().shape(identificationSchema).isValidSync({
      productName: values.productName,
      familyName: values.familyName,
      modelCode: values.modelCode,
      augmentifyId: values.augmentifyId,
      modelName: values.modelName,
    }),
  },
  {
    label: t('manuals'),
    content: (
      <ManualForm
        manuals={values.manuals}
        errors={errors}
        setFieldValue={setFieldValue}
        onFocus={() => handleUpdateActiveStep(1)}
        touched={touched}
        setFieldTouched={setFieldTouched}
      />
    ),
    isErrored: touched.manuals && errors.manuals,
    isCompleted: manualsSchema.isValidSync(values.manuals),
  },
  {
    label: t('description'),
    content: (
      <DescriptionForm
        descriptions={values.descriptions}
        errors={errors}
        setFieldValue={setFieldValue}
        onFocus={() => handleUpdateActiveStep(2)}
        touched={touched}
        setFieldTouched={setFieldTouched}
      />
    ),
    isErrored: touched.descriptions && errors.descriptions,
    isCompleted: descriptionsSchema.isValidSync(values.descriptions),
  },
  {
    label: t('video-and-images'),
    content: (
      <ImagesForm
        videoLink={values.videoLink}
        images={values.images}
        errors={errors}
        setFieldValue={setFieldValue}
        handleChange={handleChange}
        onFocus={() => handleUpdateActiveStep(3)}
        touched={touched}
        setFieldTouched={setFieldTouched}
      />
    ),
    isErrored:
      !!(touched.videoLink && errors.videoLink) ||
      !!(touched.images && errors.images),
    isCompleted: yup.object().shape(videosAndImagesSchema).isValidSync({
      videoLink: values.videoLink,
      images: values.images,
    }),
  },
];

export default (t) => {
  const identificationSchema = buildIdentificationSchema(t);
  const manualsSchema = buildManualsSchema(t);
  const descriptionsSchema = buildDescriptionsSchema(t);
  const videosAndImagesSchema = buildVideosAndImagesSchema(t);
  const schema = buildSchema({
    identificationSchema,
    manualsSchema,
    descriptionsSchema,
    videosAndImagesSchema,
  });
  const steps = buildStepper(t, {
    identificationSchema,
    manualsSchema,
    descriptionsSchema,
    videosAndImagesSchema,
  });

  return {
    schema,
    steps,
  };
};
