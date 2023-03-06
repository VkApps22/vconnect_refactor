import React, { useState, useEffect } from 'react';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Crypto from 'expo-crypto';
import { useDispatch } from 'react-redux';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { TouchableDebounce } from '../../../components';
import { env } from '../../../config';
import { signIn } from '../../../store/auth';

const StyledAppleBtn = styled(TouchableDebounce)`
  align-items: center;
  border-color: rgba(0, 0, 0, 0.54);
  border-radius: 4px;
  border-width: 1px;
  height: 48px;
  justify-content: center;
  margin-top: 16px;
  width: 100%;
`;

const StyledIcon = styled(FontAwesome)`
  left: 12px;
  position: absolute;
`;

const BtnTitle = styled(Text)`
  color: ${(props) => props.theme.text.mediumEmphasis};
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1.25px;
  line-height: 16px;
  text-transform: uppercase;
`;

const ContentContainer = styled(View)`
  align-items: center;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

const AppleSignInButton = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [available, setAvailable] = useState(false);

  const method = 'apple';

  const scopes = [
    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
    AppleAuthentication.AppleAuthenticationScope.EMAIL,
  ];

  const checkAvailabity = async () => {
    const isAvailable = await AppleAuthentication.isAvailableAsync();
    setAvailable(isAvailable);
  };

  useEffect(() => {
    checkAvailabity();
  }, [dispatch, available]);

  const getRandomString = () => {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 32; i += 1) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const onPress = async () => {
    const nonce = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      getRandomString()
    );
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: scopes,
      nonce,
    });
    const data = {
      identityToken: credential.identityToken,
      userId: credential.user,
      firstName: credential.fullName ? credential.fullName.givenName : null,
      lastName: credential.fullName ? credential.fullName.familyName : null,
    };
    dispatch(
      signIn({
        method,
        email: credential.email ?? undefined,
        authorizationCode: credential.authorizationCode,
        redirectUri: env.NATIVE_REDIRECT_URI,
        data,
      })
    );
  };

  return available ? (
    <StyledAppleBtn onPress={onPress}>
      <ContentContainer>
        <StyledIcon name="apple" size={24} color="#00A0D1" />
        <BtnTitle>{t('login-with-apple')}</BtnTitle>
      </ContentContainer>
    </StyledAppleBtn>
  ) : null;
};

export default AppleSignInButton;
