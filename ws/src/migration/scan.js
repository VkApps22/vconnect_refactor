import fs from 'fs';
import { Migration } from '../domain/entity';

const getDirectories = async (source) => {
  const directories = await fs.promises.readdir(source, {
    withFileTypes: true,
  });
  return directories
    .filter((entry) => entry.isDirectory())
    .filter((entry) => entry.name.match(/\d+-.+/gm) !== null);
};

export default async () => {
  const available = await getDirectories(__dirname);
  const existing = await Migration.find({}).lean();

  const newMigrations = available.filter(
    (directory) =>
      !existing.some((migration) => migration.name === directory.name)
  );

  const getTimestamp = (name) => parseInt(name.split('-')[0], 10);

  const promises = newMigrations.map((migration) =>
    Migration.create({
      name: migration.name,
      createdAt: new Date(getTimestamp(migration.name)),
      detectedAt: new Date(),
      appliedAt: null,
    })
  );

  await Promise.all(promises);
};
