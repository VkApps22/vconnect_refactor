/* eslint-disable no-await-in-loop, no-restricted-syntax */
import _ from 'lodash';
import loadImage from './load-image';
import uploadFile from './upload-file';
import models from './assets/models.json';
import contacts from './assets/contacts.json';
import manuals from './assets/manuals.json';
import { Contact, Manual, Model, ModelImage } from '../../domain/entity';

const insertManuals = async () => {
  const items = JSON.parse(JSON.stringify(manuals));
  for (const item of items) {
    item.file = uploadFile(`${item.name}.pdf`);
  }

  await Manual.insertMany(items);
};

const insertModels = async () => {
  const loadImageFromCache = _.memoize(
    loadImage,
    ({ file, width, height, background }) => file + width + height + background
  );

  const loadManualRef = async (model) => {
    if (!model.manual) return [];

    const items = JSON.parse(JSON.stringify(model.manual));
    for (const entry of items) {
      const manual =
        (await Manual.findOne({ name: entry.value }).lean()) ||
        (await Manual.findOne({ language: entry.language }).lean());
      entry.value = await Manual.create({ ...manual, _id: undefined });
    }

    return items;
  };

  const items = JSON.parse(JSON.stringify(models));
  for (const item of items) {
    item.thumbnail = await loadImageFromCache({
      file: `${item.image}.png`,
      width: 252,
      height: 252,
      background: '#fff',
    });
    item.manual = await loadManualRef(item);
    item.createdDate = new Date();
    item.modifiedDate = new Date();
  }

  await Model.insertMany(items);
};

const insertModelImages = async () => {
  const loadImageFromCache = _.memoize(
    loadImage,
    ({ file, width, height, background }) => file + width + height + background
  );

  const items = JSON.parse(JSON.stringify(models));
  for (const item of items) {
    await ModelImage.create({
      image: await loadImageFromCache({
        file: `${item.image}.png`,
      }),
      model: await Model.findOne({
        nameKey: item.nameKey,
        familyKey: item.familyKey,
        model: item.model,
      }),
      thumbnail: true,
    });
  }
};

const insertContacts = async () => {
  await Contact.insertMany(contacts);
};

export default async () => {
  await insertManuals();
  await insertModels();
  await insertModelImages();
  await insertContacts();
};
