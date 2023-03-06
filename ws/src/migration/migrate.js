import { Migration } from '../domain/entity';

export default async () => {
  const migrations = await Migration.find({ appliedAt: null })
    .sort({ createdAt: 1 })
    .lean();

  const promises = migrations.map((migration) => import(`./${migration.name}`));
  const imports = await Promise.all(promises);

  const execute = async (migration, index) => {
    try {
      const func = imports[index].default;
      await func();

      await Migration.updateOne(
        { name: migration.name },
        {
          appliedAt: new Date(),
          error: undefined,
        }
      );
    } catch (err) {
      await Migration.updateOne(
        { name: migration.name },
        {
          error: err.message ? err.message.toString() : err.toString(),
        }
      );
    }
  };

  for (let i = 0; i < migrations.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await execute(migrations[i], i);
  }
};
