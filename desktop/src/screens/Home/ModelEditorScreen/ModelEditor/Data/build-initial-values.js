export default () => ({
  productName: undefined,
  familyName: undefined,
  modelCode: '',
  augmentifyId: '',
  modelName: '',
  manuals: [
    {
      hasManual: true,
      manual: {
        file: undefined,
        language: 'pt',
        sections: [],
      },
    },
    {
      hasManual: true,
      manual: {
        file: undefined,
        language: 'en',
        sections: [],
      },
    },
    {
      hasManual: true,
      manual: {
        file: undefined,
        language: 'es',
        sections: [],
      },
    },
  ],
  descriptions: [
    { language: 'pt', value: '' },
    { language: 'en', value: '' },
    { language: 'es', value: '' },
  ],
  videoLink: { hasVideo: true, link: '' },
  images: { hasImages: true, files: [], mainImage: '' },
});
