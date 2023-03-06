import { Model } from '../../../domain/entity';
import { fetchModelService } from '../index';
import { mongo } from '../../../config';

const model1Data = {
  codePattern: 'MOI740-0005',
  nameKey: 'rigid-coupling',
  name: [
    {
      value: 'ACOPLAMENTO RÍGIDO',
      language: 'pt',
    },
    {
      value: 'RIGID COUPLING',
      language: 'en',
    },
    {
      value: 'ACOPLAMIENTOS RÍGIDO',
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
  description: [],
  createdDate: new Date(1601893974874),
  modifiedDate: new Date(1601893974874),
};

const model2Data = {
  ...model1Data,
  codePattern: 'MOI740-0003-PT',
  model: 'DSC',
  name: [model1Data.name[0], model1Data.name[2]],
};

const model3Data = {
  ...model1Data,
  codePattern: 'MOI740-0006-PT',
  name: [model1Data.name[2]],
};

const query = {
  language: 'pt',
  text: 'ACOPLAMENTO RIGIDO',
  filter: {},
  pagination: {
    page: 0,
    limit: 15,
  },
};

const createModels = async () => {
  await Model.create(model1Data);
  await Model.create(model2Data);
  await Model.create(model3Data);
};

describe('fetchModel', () => {
  beforeAll(() => mongo.connect());
  afterAll(() => mongo.disconnect());
  beforeEach(() => mongo.clear());

  it('happy day', async () => {
    await createModels();

    const models = await fetchModelService(query);
    expect(models.items.length).toBe(2);
    expect(models.count).toBe(2);
  });

  it('empty text', async () => {
    await createModels();

    const models = await fetchModelService({
      ...query,
      text: '',
    });
    expect(models.items.length).toBe(3);
    expect(models.count).toBe(3);
  });

  it('pagination', async () => {
    await createModels();

    const models = await fetchModelService({
      ...query,
      text: '',
      pagination: {
        page: 1,
        limit: 1,
      },
    });
    expect(models.items.length).toBe(1);
    expect(models.count).toBe(3);
  });

  it('match text', async () => {
    await createModels();

    const models = await fetchModelService({
      ...query,
      language: 'en',
      text: 'RIGID COUPLING',
    });
    expect(models.items.length).toBe(1);
    expect(models.count).toBe(1);
  });

  it('match text but name filter excludes', async () => {
    await createModels();

    const models = await fetchModelService({
      ...query,
      filter: { product: 'ACOPLAMENTO RIGIDO DESCONHECIDO' },
    });
    expect(models.items.length).toBe(0);
    expect(models.count).toBe(0);
  });

  it('match text but model filter excludes', async () => {
    await createModels();

    const models = await fetchModelService({
      ...query,
      filter: { models: ['DESCONHECIDO'] },
    });
    expect(models.items.length).toBe(0);
    expect(models.count).toBe(0);
  });

  it('match text but family filter excludes', async () => {
    await createModels();

    const models = await fetchModelService({
      ...query,
      filter: { family: 'DENFLEX NVD DESCONHECIDO' },
    });
    expect(models.items.length).toBe(0);
    expect(models.count).toBe(0);
  });

  it('happy day but model filter excludes one', async () => {
    await createModels();

    const models = await fetchModelService({
      ...query,
      filter: {
        models: ['DSC'],
      },
    });
    expect(models.items.length).toBe(1);
    expect(models.count).toBe(1);
  });

  it('match text in family field', async () => {
    await createModels();

    const models = await fetchModelService({
      ...query,
      language: 'en',
      text: 'DENFLEX NVD',
    });
    expect(models.items.length).toBe(3);
    expect(models.count).toBe(3);
  });

  it('match text in model field', async () => {
    await createModels();

    const models = await fetchModelService({
      ...query,
      language: 'en',
      text: 'DSC',
    });
    expect(models.items.length).toBe(1);
    expect(models.count).toBe(1);
  });

  it('match different case text', async () => {
    await createModels();

    const models = await fetchModelService({
      ...query,
      language: 'en',
      text: 'rigid coupling',
    });
    expect(models.items.length).toBe(1);
    expect(models.count).toBe(1);
  });
});
