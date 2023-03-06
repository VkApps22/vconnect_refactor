import { mongo } from '../../config';
import scan from '../scan';
import migrate from '../migrate';
import { Migration, Model } from '../../domain/entity';

describe('migrationMigrate', () => {
  beforeAll(() => mongo.connect());
  afterAll(() => mongo.disconnect());
  beforeEach(() => mongo.clear());

  it('happy day', async () => {
    await scan();
    await migrate();

    const migrations = await Migration.find({}).lean();
    expect(migrations.length).toBe(2);

    const migration = migrations[0];
    expect(migration.name).toBe('1601893974874-initial-data');
    expect(migration.createdAt).toStrictEqual(new Date(1601893974874));
    expect(migration.detectedAt).not.toBeNull();
    expect(migration.error).toBeNull();
    expect(migration.appliedAt).not.toBeNull();

    const models = await Model.find({}).lean();
    expect(models.length).toBe(216);
  });

  it('twice', async () => {
    await scan();
    await migrate();
    await scan();
    await migrate();

    const migrations = await Migration.find({}).lean();
    expect(migrations.length).toBe(2);

    const migration = migrations[0];
    expect(migration.name).toBe('1601893974874-initial-data');
    expect(migration.createdAt).toStrictEqual(new Date(1601893974874));
    expect(migration.detectedAt).not.toBeNull();
    expect(migration.error).toBeNull();
    expect(migration.appliedAt).not.toBeNull();

    const models = await Model.find({}).lean();
    expect(models.length).toBe(216);
  });
});
