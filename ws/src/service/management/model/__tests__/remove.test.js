import { Model } from '../../../../domain/entity';
import { removeModelService } from '..';
import { mongo } from '../../../../config';
import { ModelNotFoundError } from '../../../../domain/error';

describe('removeModel', () => {
  beforeAll(() => mongo.connect());
  afterAll(() => mongo.disconnect());
  beforeEach(() => mongo.clear());

  it('happy day', async () => {
    const model = await Model.create({
      codePattern: 'MOI740-0005',
      nameKey: 'rigid-coupling',
      name: [
        {
          value: 'ACOPLAMENTO RIGIDO',
          language: 'pt',
        },
        {
          value: 'RIGID COUPLING',
          language: 'en',
        },
        {
          value: 'ACOPLAMIENTOS RIGIDO',
          language: 'es',
        },
      ],
      familyKey: 'denflex-nvd',
      family: [
        {
          value: 'DENFLEX NVD',
          language: 'en',
        },
      ],
      model: 'FLF',
      thumbnail: 'image',
      createdDate: new Date(1601893974874),
      modifiedDate: new Date(1601893974874),
    });

    await removeModelService({ id: model._id });

    const result = await Model.findOne({ codePattern: 'MOI740-0005' }).lean();
    expect(result).toBeNull();
  });

  it('not found', async () => {
    await expect(() =>
      removeModelService({ id: '5f5f3327a2ccead4c3e62c93' })
    ).rejects.toThrowError(ModelNotFoundError);
  });
});
