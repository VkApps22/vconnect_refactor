import mongoose from 'mongoose';
import { Model, User } from '../../../domain/entity';
import addFavoriteService from '../add-favorite';
import removeFavoriteService from '../remove-favorite';
import { mongo } from '../../../config';
import {
  NotYetInFavoritesError,
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

describe('removeFavorite', () => {
  beforeAll(() => mongo.connect());
  afterAll(() => mongo.disconnect());
  beforeEach(() => mongo.clear());

  it('happy day', async () => {
    const user = await createUser();
    const model = await createModel();

    const { favorites } = await addFavoriteService({
      id: user._id,
      modelId: model._id,
    });

    expect(favorites.length).toBe(1);
    expect(favorites[0]._id).toEqual(model._id);

    const { favorites: secondRequest } = await removeFavoriteService({
      id: user._id,
      modelId: model._id,
    });

    expect(secondRequest.length).toBe(0);
  });

  it('user not found', async () => {
    await expect(() =>
      removeFavoriteService({
        id: new mongoose.Types.ObjectId(),
        modelId: new mongoose.Types.ObjectId(),
      })
    ).rejects.toThrowError(UserNotFoundError);
  });

  it('model not found', async () => {
    const user = await createUser();
    await expect(() =>
      removeFavoriteService({
        id: user._id,
        modelId: new mongoose.Types.ObjectId(),
      })
    ).rejects.toThrowError(ModelNotFoundError);
  });

  it('do not remove if not favorited', async () => {
    const user = await createUser();
    const model = await createModel();

    await expect(() =>
      removeFavoriteService({
        id: user._id,
        modelId: model._id,
      })
    ).rejects.toThrowError(NotYetInFavoritesError);
  });
});
