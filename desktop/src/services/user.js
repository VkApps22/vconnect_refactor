import axios from 'axios';
import { env } from '../config';

const fetch = async ({ text, companyDomain, pagination }) => {
  const response = await axios.post(`${env.HOST_ADDRESS}/v1/management/user`, {
    text,
    companyDomain,
    pagination,
  });

  return response.data;
};

const update = async ({ targetUserId, accessLevel }) => {
  const response = await axios.patch(`${env.HOST_ADDRESS}/v1/management/user`, {
    targetUserId,
    accessLevel,
  });

  return response.data;
};

export default { fetch, update };
