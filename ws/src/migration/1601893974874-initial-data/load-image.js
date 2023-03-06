import sharp from 'sharp';
import path from 'path';

const convertToBase64 = (buffer) => {
  const base64 = buffer.toString('base64');
  return `data:image/png;base64,${base64}`;
};

export default async ({ file, width, height, background }) => {
  const fileUri = path.resolve(__dirname, 'assets', 'images', file);
  let image = sharp(fileUri);
  if (width && height) image = image.resize(width, height);

  if (background) image = image.flatten({ background });

  const buffer = await image.toBuffer();
  return convertToBase64(buffer);
};
