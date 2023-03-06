import { addModelService } from '..';
import { mongo } from '../../../../config';
import { Model } from '../../../../domain/entity';

describe('addModel', () => {
  beforeAll(() => mongo.connect());
  afterAll(() => mongo.disconnect());
  beforeEach(() => mongo.clear());

  it('happy day', async () => {
    const data = {
      codePattern: 'MOI740-0005',
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
      family: [
        {
          value: 'DENFLEX NVD',
          language: 'en',
        },
      ],
      model: 'FLF',
      description: [],
      manual: [],
    };
    await addModelService(data);

    const model = await Model.findOne({
      codePattern: 'MOI740-0005',
    }).lean();

    expect({
      ...model,
      _id: undefined,
      createdDate: undefined,
      modifiedDate: undefined,
    }).toStrictEqual({
      __v: 0,
      _id: undefined,
      createdDate: undefined,
      modifiedDate: undefined,
      familyKey: 'rigid_coupling-denflex_nvd',
      nameKey: 'rigid_coupling',
      ...data,
    });
  });
});
