import sharp from 'sharp';
import { Manual, Model, ModelImage } from '../../../domain/entity';
import { ModelNameAlreadyExists } from '../../../domain/error';

export const getKey = (field) =>
  field
    .find((f) => f.language === 'en')
    .value.toLowerCase()
    .trim()
    .replace(/\s+/, '_');

const createManualEntity = async ({ manual, language, file }) => {
  const payload = manual.find((m) => m.language === language);
  if (!payload) return null;

  payload.file = file.id;

  return { language, value: await Manual.create(payload) };
};

const createManualArray = async ({
  manual,
  enManualFile,
  ptManualFile,
  esManualFile,
}) => {
  const enManual = enManualFile
    ? await createManualEntity({
        language: 'en',
        manual,
        file: enManualFile,
      })
    : undefined;
  const ptManual = ptManualFile
    ? await createManualEntity({
        language: 'pt',
        manual,
        file: ptManualFile,
      })
    : undefined;
  const esManual = esManualFile
    ? await createManualEntity({
        language: 'es',
        manual,
        file: esManualFile,
      })
    : undefined;

  return [enManual, ptManual, esManual].filter((i) => i);
};

const convertToBase64 = (buffer) => {
  const base64 = buffer.toString('base64');
  return `data:image/png;base64,${base64}`;
};

const convertImageToThumbnail = async ({
  base64,
  width,
  height,
  background,
}) => {
  const uri = base64.split(';base64,').pop();
  const inputBuffer = Buffer.from(uri, 'base64');
  let image = sharp(inputBuffer);
  if (width && height) image = image.resize(width, height);

  if (background) image = image.flatten({ background });

  const outputBuffer = await image.toBuffer();
  return convertToBase64(outputBuffer);
};

export const buildThumbnail = async ({ images }) => {
  if (!images || !images.length) return undefined;

  const thumbnail = images.find((i) => i.thumbnail) || images[0];
  return convertImageToThumbnail({
    base64: thumbnail.image,
    width: 252,
    height: 252,
    background: '#fff',
  });
};

export default async ({
  model,
  codePattern,
  augmentifyId,
  name,
  family,
  manual,
  description,
  playlist,
  images,
  enManualFile,
  ptManualFile,
  esManualFile,
}) => {
  const exists = await Model.exists({ model });
  if (exists) throw new ModelNameAlreadyExists();

  const thumbnail = await buildThumbnail({ images });

  const manualArray = await createManualArray({
    manual,
    enManualFile,
    ptManualFile,
    esManualFile,
  });

  const nameKey = getKey(name);
  const familyKey = `${nameKey}-${getKey(family)}`;

  const entity = await Model.create({
    codePattern,
    augmentifyId,
    model,
    nameKey,
    name,
    familyKey,
    family,
    manual: manualArray,
    description,
    playlist,
    thumbnail,
    createdDate: new Date(),
    modifiedDate: new Date(),
  });
  if (images) {
    const promises = images.map((image) =>
      ModelImage.create({
        model: entity,
        image: image.image,
        thumbnail: image.thumbnail,
      })
    );
    await Promise.all(promises);
  }
};
