import { Manual, Model, ModelImage } from '../../../domain/entity';
import { ModelNotFoundError } from '../../../domain/error';
import { buildThumbnail, getKey } from './add';

export const mergeManualEntity = async ({
  manual,
  language,
  file,
  fileChanged,
  oldManual,
}) => {
  const payload = manual.find((m) => m.language === language);
  if (!payload && !file && fileChanged) {
    // Delete file
    // Delete manual
    return null;
  }
  if (!payload && file) {
    return {
      language,
      value: await Manual.create({ language, file: file.id }),
    };
  }
  if (payload && file) {
    payload.file = file.id;
    return { language, value: await Manual.create(payload) };
  }
  if (payload && !file && !fileChanged) {
    const oldManualRef = oldManual.find((m) => m.language === language);
    const oldManualEntity = await Manual.findOneAndUpdate(
      { _id: oldManualRef.value },
      payload
    );
    return { language, value: oldManualEntity };
  }

  return null;
};

const mergeManualArray = async ({
  manual,
  oldManual,
  enManualFileChanged,
  ptManualFileChanged,
  esManualFileChanged,
  enManualFile,
  ptManualFile,
  esManualFile,
}) => {
  const enManual = await mergeManualEntity({
    language: 'en',
    manual,
    file: enManualFile,
    fileChanged: enManualFileChanged,
    oldManual,
  });
  const ptManual = await mergeManualEntity({
    language: 'pt',
    manual,
    file: ptManualFile,
    fileChanged: ptManualFileChanged,
    oldManual,
  });
  const esManual = await mergeManualEntity({
    language: 'es',
    manual,
    file: esManualFile,
    fileChanged: esManualFileChanged,
    oldManual,
  });
  return [enManual, ptManual, esManual].filter((i) => i);
};

export default async ({
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
  enManualFile,
  ptManualFile,
  esManualFile,
}) => {
  const oldEntity = await Model.findOne({ _id: id });
  if (!oldEntity) throw new ModelNotFoundError();

  const thumbnail = await buildThumbnail({ images });

  const manualArray = await mergeManualArray({
    manual,
    oldManual: oldEntity.manual,
    enManualFileChanged,
    esManualFileChanged,
    ptManualFileChanged,
    enManualFile,
    ptManualFile,
    esManualFile,
  });

  const nameKey = getKey(name);
  const familyKey = `${nameKey}-${getKey(family)}`;

  const entity = await Model.findOneAndUpdate(
    {
      _id: id,
    },
    {
      codePattern,
      augmentifyId,
      nameKey,
      name,
      familyKey,
      family,
      manual: manualArray,
      model,
      description,
      playlist,
      thumbnail,
      modifiedDate: new Date(),
    }
  );

  if (images) {
    const deletePromises = images.map(() =>
      ModelImage.deleteMany({ model: entity })
    );
    await Promise.all(deletePromises);

    const addPromises = images.map((image) =>
      ModelImage.create({
        model: entity,
        image: image.image,
        thumbnail: image.thumbnail,
      })
    );
    await Promise.all(addPromises);
  }
};
