export default ({ response }) => ({
  productName: {
    nameKey: response.nameKey,
    name: response.name,
  },
  familyName: {
    familyKey: response.familyKey,
    family: response.family,
  },
  modelName: response.model,
  augmentifyId: response.augmentifyId ?? '',
  modelCode: response.codePattern.match(/\((.*)\)/).pop(),
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
  descriptions: response.description,
  videoLink: { hasVideo: !!response.playlist, link: response.playlist },
  images: { hasImages: true, files: [], mainImage: '' },
});
