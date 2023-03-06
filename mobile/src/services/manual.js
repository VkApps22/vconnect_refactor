import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as WebBrowser from 'expo-web-browser';
import { env } from '../config';

const fetch = async ({ manualId }) => {
  const response = await axios.get(`${env.HOST_ADDRESS}/v1/manual`, {
    params: {
      manualId,
    },
  });

  return response.data;
};

const download = async ({ manualId }) => {
  await WebBrowser.openBrowserAsync(
    `${env.HOST_ADDRESS}/v1/public/manual-file?manualId=${manualId}`
  );
};

const downloadDirect = async ({ manualId }) => {
  const fileUri = `${FileSystem.cacheDirectory}/${manualId}.pdf`;
  await FileSystem.downloadAsync(
    `${env.HOST_ADDRESS}/v1/public/manual-file?manualId=${manualId}`,
    fileUri
  );
  return fileUri;
};

const addReview = async ({ manualId, rating, comment }) => {
  const response = await axios.post(`${env.HOST_ADDRESS}/v1/manual/review`, {
    manualId,
    rating,
    comment,
  });

  return response.data;
};

export default { fetch, download, downloadDirect, addReview };
