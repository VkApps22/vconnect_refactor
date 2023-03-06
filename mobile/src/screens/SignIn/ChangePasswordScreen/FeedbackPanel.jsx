import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';

import { LogoImage, CheckIllustration } from '../../../components/icons';
import { Button, Portal } from '../../../components';

const Container = styled(View)`
  align-items: center;
  background: #fff;
  flex: 1;
  height: 100%;
  justify-content: center;
  padding: 16px;
  position: absolute;
  width: ${Dimensions.get('window').width}px;
`;

const StyledButton = styled(Button)`
  border-radius: 4px;
  height: 48px;
  justify-content: center;
  margin-top: 42px;
  width: 100%;
`;

const StyledIcon = styled(CheckIllustration)`
  margin: 52px 0;
`;

const Title = styled(Text)`
  color: ${(props) => props.theme.text.highEmphasis};
  font-size: 34px;
  line-height: 36px;
  text-align: center;
`;

const SubTitle = styled(Text)`
  color: ${(props) => props.theme.text.mediumEmphasis};
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 24px;
  margin-top: 16px;
  text-align: center;
`;

const FeedbackPanel = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <Portal>
      <Container>
        <LogoImage height={38} width={240} />
        <StyledIcon />
        <Title>{t('new-password-was-created-successfully')}</Title>
        <SubTitle>{t('to-continue-click-on-access-account')}</SubTitle>
        <StyledButton
          mode="contained"
          onPress={() => navigation.navigate('SignIn')}
        >
          {t('access-account')}
        </StyledButton>
      </Container>
    </Portal>
  );
};

export default FeedbackPanel;
