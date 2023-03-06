import axios from 'axios';
import { env } from '../config';

const add = async ({
  model,
  codePattern,
  augmentifyId,
  name,
  family,
  manual,
  description,
  playlist,
  images,
  enManualFile,
  ptManualFile,
  esManualFile,
}) => {
  const formData = new FormData();
  formData.append('model', model);
  formData.append('codePattern', codePattern);
  formData.append('augmentifyId', augmentifyId);
  formData.append('name', JSON.stringify(name));
  formData.append('family', JSON.stringify(family));
  formData.append('manual', JSON.stringify(manual));
  formData.append('description', JSON.stringify(description));
  if (playlist) formData.append('playlist', playlist);
  formData.append('images', JSON.stringify(images));

  formData.append('enManualFile', enManualFile);
  formData.append('ptManualFile', ptManualFile);
  formData.append('esManualFile', esManualFile);

  const response = await axios.post(
    `${env.HOST_ADDRESS}/v1/management/model`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data;
};

const update = async ({
  id,
  model,
  codePattern,
  augmentifyId,
  name,
  family,
  manual,
  description,
  playlist,
  images,
  enManualFileChanged,
  ptManualFileChanged,
  esManualFileChanged,
  enManualFile,
  ptManualFile,
  esManualFile,
}) => {
  const formData = new FormData();
  formData.append('id', id);
  formData.append('model', model);
  formData.append('codePattern', codePattern);
  formData.append('augmentifyId', augmentifyId);
  formData.append('name', JSON.stringify(name));
  formData.append('family', JSON.stringify(family));
  formData.append('manual', JSON.stringify(manual));
  formData.append('description', JSON.stringify(description));
  if (playlist) formData.append('playlist', playlist);
  formData.append('images', JSON.stringify(images));

  formData.append('enManualFileChanged', enManualFileChanged);
  formData.append('ptManualFileChanged', ptManualFileChanged);
  formData.append('esManualFileChanged', esManualFileChanged);
  formData.append('enManualFile', enManualFile);
  formData.append('ptManualFile', ptManualFile);
  formData.append('esManualFile', esManualFile);

  const response = await axios.patch(
    `${env.HOST_ADDRESS}/v1/management/model`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data;
};

const fetch = async ({ language, text, filter, pagination }) => {
  const response = await axios.post(
    `${env.HOST_ADDRESS}/v1/management/models`,
    {
      language,
      text,
      filter,
      pagination,
    }
  );

  return response.data;
};

const fetchOverview = async () => {
  const response = await axios.get(`${env.HOST_ADDRESS}/v1/management/models`);

  return response.data;
};

const fetchSuggestions = async ({ language, query }) => {
  const response = await axios.get(
    `${env.HOST_ADDRESS}/v1/management/models/suggestions`,
    {
      params: {
        language,
        query,
      },
    }
  );

  return response.data;
};

const fetchFamilySuggestions = async ({ language, query }) => {
  const response = await axios.get(
    `${env.HOST_ADDRESS}/v1/management/models/families/suggestions`,
    {
      params: {
        language,
        query,
      },
    }
  );

  return response.data;
};

const fetchDetails = async ({ id }) => {
  const response = await axios.get(`${env.HOST_ADDRESS}/v1/management/model`, {
    params: {
      id,
    },
  });

  return response.data;
};

const fetchImages = async ({ id }) => {
  const response = await axios.get(
    `${env.HOST_ADDRESS}/v1/management/model/images`,
    {
      params: {
        id,
      },
    }
  );

  return response.data;
};

const fetchManuals = async ({ id }) => {
  const response = await axios.get(
    `${env.HOST_ADDRESS}/v1/management/model/manuals`,
    {
      params: {
        id,
      },
    }
  );

  return response.data;
};

const fetchComments = async ({ modelId, language, pagination }) => {
  const response = await axios.post(
    `${env.HOST_ADDRESS}/v1/management/model/comment`,
    {
      modelId,
      language,
      pagination,
    }
  );

  return response.data;
};

const fetchCommentsOverview = async ({ modelId, language }) => {
  const response = await axios.get(
    `${env.HOST_ADDRESS}/v1/management/model/comments`,
    {
      params: {
        modelId,
        language,
      },
    }
  );

  return response.data;
};

const remove = async ({ id }) => {
  const response = await axios.delete(
    `${env.HOST_ADDRESS}/v1/management/model`,
    {
      data: {
        id,
      },
    }
  );

  return response.data;
};

export default {
  add,
  update,
  fetch,
  fetchOverview,
  fetchSuggestions,
  fetchFamilySuggestions,
  fetchDetails,
  fetchImages,
  fetchManuals,
  fetchComments,
  fetchCommentsOverview,
  remove,
};
