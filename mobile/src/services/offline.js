import AsyncStorage from '@react-native-async-storage/async-storage';

const addPack = ({ model, images, manual, manualUri }) => {
  return AsyncStorage.setItem(
    `pack_${model._id}`,
    JSON.stringify({
      model,
      images,
      manual,
      manualUri,
    })
  );
};

const removePack = ({ modelId }) => {
  return AsyncStorage.removeItem(`pack_${modelId}`);
};

const fetchPack = async ({ modelId }) => {
  return JSON.parse(await AsyncStorage.getItem(`pack_${modelId}`));
};

const validatePack = async ({ modelId }) => {
  try {
    JSON.parse(await AsyncStorage.getItem(modelId));
    return true;
  } catch (err) {
    return false;
  }
};

const fetchAvailablePacks = async () => {
  const modelIds = (await AsyncStorage.getAllKeys())
    .filter((key) => key.startsWith('pack_'))
    .map((key) => key.replace('pack_', ''));
  const promises = modelIds.map((modelId) => validatePack({ modelId }));
  const promisesResults = await Promise.all(promises);

  return modelIds.filter((_, index) => promisesResults[index]);
};

const fetchFavorites = async () => {
  return JSON.parse(await AsyncStorage.getItem(`favorites`)) || [];
};

const setFavorites = ({ favorites }) => {
  return AsyncStorage.setItem(`favorites`, JSON.stringify(favorites));
};

export default {
  addPack,
  removePack,
  fetchPack,
  fetchAvailablePacks,
  fetchFavorites,
  setFavorites,
};
