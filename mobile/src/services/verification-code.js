import axios from 'axios';
import { env } from '../config';

const send = async ({ email }) => {
  const response = await axios.post(
    `${env.HOST_ADDRESS}/v1/public/verification-code`,
    {
      email,
    }
  );
  return response.data;
};

const check = async ({ email, verificationCode }) => {
  const response = await axios.put(
    `${env.HOST_ADDRESS}/v1/public/verification-code`,
    {
      email,
      verificationCode,
    }
  );
  return response.data;
};

export default { send, check };
