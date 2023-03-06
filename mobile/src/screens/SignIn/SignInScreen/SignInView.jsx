import React, { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { Formik } from 'formik';
import { unwrapResult } from '@reduxjs/toolkit';

import {
  Button,
  ButtonLink,
  PasswordInput,
  TextInput,
} from '../../../components';
import { LogoImage } from '../../../components/icons';
import { signIn } from '../../../store/auth';

import { useToast } from '../../../hooks/toast';

const StyledContainer = styled(View)`
  align-items: center;
  background: #fff;
  border-color: #e6e9ed;
  border-width: 1px;
  padding: 24px 16px;
`;

const StyledSignInBtn = styled(Button)`
  border-radius: 4px;
  height: 48px;
  justify-content: center;
  margin-top: 36px;
  width: 100%;
`;

const StyledTextInput = styled(TextInput)`
  background: #fff;
  margin-bottom: 32px;
  width: 100%;
`;

const StyledLogoImage = styled(LogoImage)`
  margin-bottom: 16px;
`;

const Title = styled(Text)`
  color: ${(props) => props.theme.text.mediumEmphasis};
  font-size: 14px;
  letter-spacing: 0.25px;
  line-height: 20px;
  margin-bottom: 36px;
  text-align: center;
`;

const StyledOptionsContainer = styled(View)`
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 24px;
  width: 100%;
`;

const StyledButtonLink = styled(ButtonLink)`
  color: ${(props) => props.theme.text.secundary};
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1.25px;
  line-height: 16px;
  text-decoration: underline;
`;

const ErrorText = styled(Text)`
  color: ${(props) => props.theme.text.accentError};
  font-size: 14px;
  letter-spacing: 0.25px;
  line-height: 20px;
  margin-bottom: 16px;
  text-align: center;
`;

const SignInView = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const emailInputRef = useRef();
  const navigation = useNavigation();
  const passwordInputRef = useRef();
  const [loginError, setLoginError] = useState(false);

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email(t('email-must-be-a-valid-email'))
      .required(t('email-is-required')),
    password: yup.string().required(t('password-is-required')),
  });

  const onSignInPress = useCallback(
    (values) =>
      dispatch(
        signIn({
          method: 'email',
          email: values.email,
          password: values.password,
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
    [dispatch, toast]
  );

  return (
    <StyledContainer
      style={{
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        elevation: 3,
      }}
    >
      <StyledLogoImage height={24} width={152} />
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={loginSchema}
        onSubmit={onSignInPress}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ values, errors, handleChange, handleSubmit, setFieldTouched }) => (
          <>
            {errors.password || errors.email || loginError ? (
              <ErrorText>
                {t('the-email-and/or-password-are-invalid-try-again')}
              </ErrorText>
            ) : (
              <Title>{t('access-your-account')}</Title>
            )}
            <StyledTextInput
              onChangeText={handleChange('email')}
              value={values.email}
              label={t('email')}
              mode="outlined"
              autoCapitalize="none"
              ref={emailInputRef}
              onSubmitEditing={() => passwordInputRef.current.focus()}
              keyboardType="email-address"
              returnKeyType="next"
              onBlur={() => setFieldTouched('email')}
            />
            <PasswordInput
              ref={passwordInputRef}
              value={values.password}
              onChangeText={handleChange('password')}
              onSubmitEditing={handleSubmit}
              onBlur={() => setFieldTouched('password')}
            />
            <StyledSignInBtn
              mode="contained"
              disabled={
                !(values.password.length > 0 && values.email.length > 0)
              }
              onPress={handleSubmit}
            >
              {t('sign-in')}
            </StyledSignInBtn>
          </>
        )}
      </Formik>
      <StyledOptionsContainer>
        <StyledButtonLink
          text={t('forgot-password')}
          onPress={() => navigation.navigate('ForgotPassword')}
        />
      </StyledOptionsContainer>
    </StyledContainer>
  );
};

export default SignInView;
