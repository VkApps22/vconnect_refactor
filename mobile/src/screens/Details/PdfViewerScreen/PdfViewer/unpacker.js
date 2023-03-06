import * as FileSystem from 'expo-file-system';

import files from './generated';

const { cacheDirectory, writeAsStringAsync, deleteAsync } = FileSystem;

const getWebviewSource = ({ uri, initialPage }) => {
  return {
    uri: `${cacheDirectory}viewer.html?file=${encodeURIComponent(
      uri
    )}#page=${initialPage}`,
  };
};

const dirname = (path) => path.match(/.*\//)[0];

async function ensureDirExists(fileUri) {
  const dir = dirname(fileUri);
  const dirInfo = await FileSystem.getInfoAsync(dir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
  }
}

async function writeWebViewComponentFile(container) {
  const fileUri = `${cacheDirectory}${container.getFileName()}`;
  await ensureDirExists(fileUri);
  await writeAsStringAsync(fileUri, container.getBundle(), {
    encoding: FileSystem.EncodingType.Base64,
  });
}

async function writeWebViewComponentFiles() {
  const promises = files.map((file) => writeWebViewComponentFile(file));

  await Promise.all(promises);
}

async function removeFilesAsync() {
  const promises = files.map((file) => {
    return deleteAsync(`${cacheDirectory}${file.getFileName()}`, {
      idempotent: true,
    });
  });
  await Promise.all(promises);
}

export { getWebviewSource, writeWebViewComponentFiles, removeFilesAsync };
