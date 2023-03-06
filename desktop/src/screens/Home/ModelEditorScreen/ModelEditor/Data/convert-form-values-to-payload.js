const getImages = (images) => {
  const files = images.hasImages ? images.files : [];
  return files.map((image) => ({
    image: image.src,
    thumbnail: images.mainImage === image._id,
  }));
};

export default ({ values }) => ({
  model: values.modelName,
  codePattern: `^(${values.modelCode})\\d{3}`,
  augmentifyId: values.augmentifyId,
  name: values.productName.name,
  family: values.familyName.family,
  manual: values.manuals
    .filter((m) => m.hasManual)
    .map((m) => ({
      language: m.manual.language,
      sections: m.manual.sections,
    })),
  description: values.descriptions,
  playlist: values.videoLink.hasVideo ? values.videoLink.link : undefined,
  images: getImages(values.images),
  enManualFileChanged: !values.manuals.find(
    (m) => m.hasManual && m.manual.language === 'en'
  )?.manual.file.link,
  ptManualFileChanged: !values.manuals.find(
    (m) => m.hasManual && m.manual.language === 'pt'
  )?.manual.file.link,
  esManualFileChanged: !values.manuals.find(
    (m) => m.hasManual && m.manual.language === 'es'
  )?.manual.file.link,
  enManualFile: values.manuals.find(
    (m) => m.hasManual && m.manual.language === 'en'
  )?.manual.file,
  ptManualFile: values.manuals.find(
    (m) => m.hasManual && m.manual.language === 'pt'
  )?.manual.file,
  esManualFile: values.manuals.find(
    (m) => m.hasManual && m.manual.language === 'es'
  )?.manual.file,
});
