import React, { useCallback } from 'react';
import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { env } from '../../../config';
import SocialSignInButton from './SocialSignInButton';
import { TouchableDebounce } from '../../../components';

const StyledFacebookBtn = styled(TouchableDebounce)`
  align-items: center;
  border-color: rgba(0, 0, 0, 0.54);
  border-radius: 4px;
  border-width: 1px;
  height: 48px;
  justify-content: center;
  margin-top: 32px;
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

const discovery = {
  authorizationEndpoint: 'https://www.facebook.com/v8.0/dialog/oauth',
};

const FacebookButton = () => {
  const { t } = useTranslation();

  const renderButton = useCallback(
    ({ onPress }) => (
      <StyledFacebookBtn onPress={onPress}>
        <ContentContainer>
          <StyledIcon name="facebook-square" size={24} color="#00A0D1" />
          <BtnTitle>{t('login-with-facebook')}</BtnTitle>
        </ContentContainer>
      </StyledFacebookBtn>
    ),
    [t]
  );

  return (
    <SocialSignInButton
      clientId={env.FB_APP_ID}
      scopes={['public_profile', 'email']}
      discovery={discovery}
      method="facebook"
      renderButton={renderButton}
    />
  );
};

export default FacebookButton;
