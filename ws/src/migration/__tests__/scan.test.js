import scan from '../scan';
import { mongo } from '../../config';
import { Migration } from '../../domain/entity';

describe('migrationScan', () => {
  beforeAll(() => mongo.connect());
  afterAll(() => mongo.disconnect());
  beforeEach(() => mongo.clear());

  it('happy day', async () => {
    await scan();

    const migrations = await Migration.find({}).lean();
    expect(migrations.length).toBe(2);

    const migration = migrations[0];
    expect(migration.name).toBe('1601893974874-initial-data');
    expect(migration.createdAt).toStrictEqual(new Date(1601893974874));
    expect(migration.detectedAt).not.toBeNull();
    expect(migration.appliedAt).toBeNull();
  });
});
