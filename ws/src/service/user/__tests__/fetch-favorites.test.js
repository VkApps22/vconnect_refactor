import mongoose from 'mongoose';
import fetchFavoritesService from '../fetch-favorites';
import { Model, User } from '../../../domain/entity';
import { mongo } from '../../../config';
import { UserNotFoundError } from '../../../domain/error';

const userArgs = {
  email: 'user@email.com',
  name: 'user',
  preferredName: 'user',
  company: 'user co',
  country: 'Brazil',
  authProviderType: 'email',
  authProviderId: 'user@email.com',
  authProviderSecret: '123456',
};

const createUser = () => User.create(userArgs);

const modelArgs = {
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
};

const createModel = () => Model.create(modelArgs);

const createUserWithFavorites = async () => {
  const model = await createModel();

  const user = await User.create({
    ...userArgs,
    favorites: [model],
  });

  return { user, model };
};

describe('fetchFavorites', () => {
  beforeAll(() => mongo.connect());
  afterAll(() => mongo.disconnect());
  beforeEach(() => mongo.clear());

  it('happy day', async () => {
    const { user, model } = await createUserWithFavorites();

    const { favorites } = await fetchFavoritesService({
      id: user._id,
    });

    expect(favorites.length).toBe(1);
    expect(favorites[0]._id).toEqual(model._id);
  });

  it('should return empty array when no favorites in user', async () => {
    const user = await createUser();

    const { favorites } = await fetchFavoritesService({
      id: user._id,
    });

    expect(favorites).toStrictEqual([]);
  });

  it('user not found', async () => {
    await expect(() =>
      fetchFavoritesService({
        id: new mongoose.Types.ObjectId(),
      })
    ).rejects.toThrowError(UserNotFoundError);
  });
});
