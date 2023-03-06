import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dimensions, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';

import { unwrapResult } from '@reduxjs/toolkit';
import { LogoImage } from '../../components/icons';
import WelcomeImage from '../../../assets/images/vconnect-welcome.png';
import { Button } from '../../components';
import { signIn } from '../../store/auth';

import { useToast } from '../../hooks/toast';

import { env } from '../../config';

const SafeAreaContainer = styled(SafeAreaView)`
  flex: 1;
`;

const Container = styled(LinearGradient)`
  align-items: center;
  flex: 1;
  justify-content: center;
`;

const StyledLogo = styled(LogoImage)`
  margin-bottom: 24px;
`;

const StyledImage = styled(Image)`
  height: 248px;
  margin: 42px 0;
  width: ${Dimensions.get('screen').width}px;
`;

const Title = styled(Text)`
  font-size: 20px;
  letter-spacing: 0.15px;
  line-height: 24px;
  text-align: center;
`;

const ButtonsContainer = styled(View)`
  padding: 0 16px;
  width: 100%;
`;

const StyledButton = styled(Button)`
  border-radius: 4px;
  border-width: 1px;
  height: 48px;
  justify-content: center;
  margin-bottom: 16px;
  width: 100%;
`;

const ErrorText = styled(Text)`
  color: ${(props) => props.theme.text.accentError};
  font-size: 14px;
  letter-spacing: 0.25px;
  line-height: 20px;
  margin-bottom: 16px;
  text-align: center;
`;

const WelcomeScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState(false);
  const { toast } = useToast();

  const onSignInPressDefault = useCallback(
    () =>
      dispatch(
        signIn({
          method: 'email',
          email: env.DEFAULT_USER_EMAIL,
          password: env.DEFAULT_USER_PASSWORD,
        })
      )
        .then((result) => {
          setLoginError(false);
          unwrapResult(result);
        })
        .catch((err) => {
          if (err && err.message === 'incorrect-email-or-password') {
            setLoginError(true);
          } else {
            toast.exception(err);
          }
        }),
    [dispatch, setLoginError, toast]
  );

  return (
    <SafeAreaContainer>
      <Container
        colors={['#ffffff', '#f3f3f3']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0, 1]}
      >
        <StyledLogo />
        <Title>{t('vulkan-connected-with-you')}</Title>
        <StyledImage resizeMode="contain" source={WelcomeImage} />
        <ButtonsContainer>
          <StyledButton
            mode="contained"
            onPress={() => navigation.navigate('SignIn', { screen: 'SignUp' })}
          >
            {t('create-account')}
          </StyledButton>
          <StyledButton
            mode="outlined"
            theme={{
              colors: {
                primary: 'rgba(0, 0, 0, 0.6)',
              },
            }}
            onPress={() => navigation.navigate('SignIn')}
          >
            {t('access-your-account')}
          </StyledButton>
          <StyledButton
            mode="outlined"
            theme={{
              colors: {
                primary: 'rgba(0, 0, 0, 0.6)',
              },
            }}
            onPress={() => onSignInPressDefault()}
          >
            {t('access-without-account')}
          </StyledButton>
        </ButtonsContainer>
        {loginError ? (
          <ErrorText>
            {t('the-email-and/or-password-are-invalid-try-again')}
          </ErrorText>
        ) : null}
      </Container>
    </SafeAreaContainer>
  );
};

export default WelcomeScreen;
