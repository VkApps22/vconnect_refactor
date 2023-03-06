import * as React from 'react';
import { useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { unwrapResult } from '@reduxjs/toolkit';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import SignInView from './SignInView';
import { ButtonLink } from '../../../components';
import LinkedInButton from './LinkedinButton';
import FacebookButton from './FacebookButton';
import OfflineButton from './OfflineButton';
import { fetchHasSession, restore } from '../../../store/auth';
import AppleSignInButton from './AppleSignInButton';

const StyledContainer = styled(SafeAreaView)`
  background-color: #fff;
  flex: 1;
`;

const StyledScrollView = styled(ScrollView)`
  padding: 0 16px;
`;

const CreateAccountContainer = styled(View)`
  align-items: baseline;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  margin-top: 32px;
`;

const CreateAccountText = styled(Text)`
  color: ${(props) => props.theme.text.highEmphasis};
  flex: 1;
  flex-wrap: wrap;
  font-size: 12px;
  letter-spacing: 0.4px;
  line-height: 16px;
`;

const CreateAccountLink = styled(ButtonLink)`
  color: ${(props) => props.theme.text.secundary};
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1.25px;
  line-height: 16px;
  margin-left: 8px;
  text-decoration: underline;
`;

const SignInScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHasSession())
      .then(unwrapResult)
      .then((result) => {
        if (!result) return;
        dispatch(restore());
      });
  }, [dispatch]);

  return (
    <StyledContainer edges={['right', 'bottom', 'left']}>
      <StyledScrollView
        bounces={false}
        contentContainerStyle={{ paddingVertical: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <SignInView />
        <FacebookButton />
        <LinkedInButton />
        <AppleSignInButton />
        <OfflineButton />
        <CreateAccountContainer>
          <CreateAccountText>{t('dont-have-an-account')}</CreateAccountText>
          <CreateAccountLink
            text={t('create-your-account')}
            onPress={() => navigation.navigate('SignUp')}
          />
        </CreateAccountContainer>
      </StyledScrollView>
    </StyledContainer>
  );
};

export default SignInScreen;
