import mongoose from 'mongoose';
import { Model, User } from '../../../domain/entity';
import addFavoriteService from '../add-favorite';
import { mongo } from '../../../config';
import {
  AlreadyInFavoritesError,
  ModelNotFoundError,
  UserNotFoundError,
} from '../../../domain/error';

const createUser = () =>
  User.create({
    email: 'user@email.com',
    name: 'user',
    preferredName: 'user',
    company: 'user co',
    country: 'Brazil',
    authProviderType: 'email',
    authProviderId: 'user@email.com',
    authProviderSecret: '123456',
  });

const createModel = () =>
  Model.create({
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
    manual: [],
    description: [],
    createdDate: new Date(1601893974874),
    modifiedDate: new Date(1601893974874),
  });

describe('addFavorite', () => {
  beforeAll(() => mongo.connect());
  afterAll(() => mongo.disconnect());
  beforeEach(() => mongo.clear());

  it('happy day', async () => {
    const user = await createUser();
    const model = await createModel();

    await addFavoriteService({
      id: user._id,
      modelId: model._id,
    });

    const { favorites } = await User.findOne({
      _id: user._id,
    }).lean();

    expect(favorites.length).toBe(1);
    expect(favorites).toEqual([model._id]);
  });

  it('user not found', async () => {
    await expect(() =>
      addFavoriteService({
        id: new mongoose.Types.ObjectId(),
        modelId: new mongoose.Types.ObjectId(),
      })
    ).rejects.toThrowError(UserNotFoundError);
  });

  it('model not found', async () => {
    const user = await createUser();
    await expect(() =>
      addFavoriteService({
        id: user._id,
        modelId: new mongoose.Types.ObjectId(),
      })
    ).rejects.toThrowError(ModelNotFoundError);
  });

  it('should return error when duplicate', async () => {
    const user = await createUser();
    const model = await createModel();

    const { favorites } = await addFavoriteService({
      id: user._id,
      modelId: model._id,
    });

    expect(favorites.length).toBe(1);
    expect(favorites[0]._id).toEqual(model._id);

    await expect(() =>
      addFavoriteService({
        id: user._id,
        modelId: model._id,
      })
    ).rejects.toThrowError(AlreadyInFavoritesError);
  });
});
