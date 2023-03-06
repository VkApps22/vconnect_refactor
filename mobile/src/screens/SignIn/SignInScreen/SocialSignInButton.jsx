import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import Constants from 'expo-constants';
import PropTypes from 'prop-types';
import * as Linking from 'expo-linking';

import { env } from '../../../config';
import { signIn } from '../../../store/auth';

const useProxy = Constants.appOwnership === 'expo';

const redirectUri = makeRedirectUri({
  native: env.NATIVE_REDIRECT_URI,
  useProxy,
});

const parseUrl = (url) => {
  const regex = /[?&]([^=#]+)=([^&#]*)/g;
  const params = {};
  let match = regex.exec(url);
  while (match !== null) {
    Object.assign(params, { [match[1]]: match[2] });
    match = regex.exec(url);
  }

  return params;
};

const SocialSignInButton = ({
  renderButton,
  method,
  clientId,
  scopes,
  discovery,
}) => {
  const dispatch = useDispatch();
  const [code, setCode] = useState();

  const [, response, promptAsync] = useAuthRequest(
    {
      clientId,
      scopes,
      redirectUri,
    },
    discovery
  );

  const handleAuthorize = ({ url }) => {
    const { code: newCode } = parseUrl(url);
    setCode(newCode);
  };

  const handlePromptAsync = async () => {
    Linking.addEventListener('url', handleAuthorize);
    await promptAsync({ useProxy });
    Linking.removeEventListener('url', handleAuthorize);
  };

  useEffect(() => {
    if (response && response.params && response.params.code)
      setCode(response.params.code);
  }, [dispatch, method, response]);

  useEffect(() => {
    if (code)
      dispatch(signIn({ method, authorizationCode: code, redirectUri }));
  }, [dispatch, method, code]);

  return <>{renderButton({ onPress: handlePromptAsync })}</>;
};

SocialSignInButton.propTypes = {
  renderButton: PropTypes.func.isRequired,
  method: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired,
  scopes: PropTypes.arrayOf(PropTypes.string).isRequired,
  discovery: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default SocialSignInButton;
