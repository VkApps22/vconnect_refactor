import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import {
  Button,
  Grid,
  styled as materialStyled,
  TextField,
  Typography,
} from '@material-ui/core';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';

import { PasswordInput } from '../../../components';
import logoImg from '../../../assets/svg/logo.svg';
import logoVulkan from '../../../assets/svg/logoVulkan.svg';
import { signIn } from '../../../store/auth';

const GridContainer = styled(Grid)`
  align-items: stretch;
  display: flex;
  height: 100vh;
`;

const Content = styled(Grid)`
  display: flex;
  flex-direction: column;
  max-width: 551px;
  padding-left: 103px;
  padding-right: 79px;
  place-content: center;
  width: 100%;
`;

const Background = styled(Grid)`
  background: linear-gradient(315deg, #000000 0.1%, #00447a 100%);
  display: flex;
  place-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

const FieldLabel = styled.h2`
  color: rgba(0, 0, 0, 0.87);
  font-size: 1.375rem;
  font-weight: normal;
  letter-spacing: 1px;
  line-height: 32px;
  margin-bottom: 8px;
  margin-top: 24px;
`;

const HeaderText = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  letter-spacing: 1px;
  line-height: 32px;
  text-align: center;
`;

const LoginButton = materialStyled(Button)({
  marginTop: '40px',
  fontWeight: 'bold',
  height: 56,
});

const ErrorText = materialStyled(Typography)({
  marginTop: '24px',
});

const SignInScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
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
            enqueueSnackbar(t(err.message), { variant: 'error' });
          }
        }),
    [t, dispatch, enqueueSnackbar]
  );

  return (
    <GridContainer container direction="row" spacing={0}>
      <Content item lg={5} sm={12}>
        <img src={logoImg} alt="VConnect" />
        <HeaderText>{t('administrative-panel')}</HeaderText>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={loginSchema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={onSignInPress}
        >
          {({ values, errors, handleChange, handleSubmit }) => (
            <Form
              onKeyDown={(event) => {
                if (
                  event.key === 'Enter' &&
                  event.target.nodeName === 'INPUT'
                ) {
                  event.preventDefault();
                  handleSubmit();
                }
              }}
            >
              <FieldLabel>{t('email')}</FieldLabel>
              <TextField
                variant="outlined"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                placeholder={`${t('ex-user-vulkan-com')}`}
              />
              <FieldLabel>{t('password')}</FieldLabel>
              <PasswordInput
                name="password"
                value={values.password}
                onChange={handleChange}
              />
              <LoginButton
                variant="contained"
                onClick={handleSubmit}
                disabled={
                  !(values.email.length > 0 && values.password.length > 0)
                }
                color="primary"
              >
                {t('login')}
              </LoginButton>
              {(!!errors.password || !!errors.email || loginError) && (
                <ErrorText variant="subtitle1" color="error" align="center">
                  {t('the-email-and/or-password-are-invalid-please-try-again')}
                </ErrorText>
              )}
            </Form>
          )}
        </Formik>
      </Content>
      <Background item lg={7} sm xs>
        <img src={logoVulkan} alt="Vulkan" />
      </Background>
    </GridContainer>
  );
};

export default SignInScreen;
