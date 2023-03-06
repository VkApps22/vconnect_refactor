import React, { useRef } from 'react';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as yup from 'yup';
import { Formik } from 'formik';

import LinkedInButton from '../SignInScreen/LinkedinButton';
import FacebookButton from '../SignInScreen/FacebookButton';
import {
  Button,
  ButtonLink,
  PasswordInput,
  TextInput,
  HelperText,
} from '../../../components';
import AppleSignInButton from '../SignInScreen/AppleSignInButton';

const Container = styled(ScrollView)`
  background: #fff;
  flex: 1;
  padding: 16px;
`;

const Title = styled(Text)`
  color: ${(props) => props.theme.text.highEmphasis};
  font-size: 34px;
  line-height: 36px;
  margin-top: 32px;
`;

const SubTitle = styled(Text)`
  color: ${(props) => props.theme.text.highEmphasis};
  font-size: 20px;
  letter-spacing: 0.15px;
  line-height: 24px;
  margin-bottom: 24px;
  margin-top: 32px;
`;

const Description = styled(Text)`
  color: ${(props) => props.theme.text.mediumEmphasis};
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 24px;
  margin-top: 16px;
`;

const LoginLink = styled(ButtonLink)`
  color: ${(props) => props.theme.text.secundary};
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1.25px;
  line-height: 16px;
  margin-left: 8px;
  text-decoration: underline;
`;

const LoginContainer = styled(View)`
  align-items: baseline;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  margin-top: 32px;
`;

const LoginText = styled(Text)`
  color: ${(props) => props.theme.text.highEmphasis};
  font-size: 12px;
  letter-spacing: 0.4px;
  line-height: 16px;
`;

const StyledTextInput = styled(TextInput)`
  background: #fff;
  width: 100%;
`;

const StyledSignInBtn = styled(Button)`
  border-radius: 4px;
  height: 48px;
  justify-content: center;
  margin-top: 23.2px;
  width: 100%;
`;

const StyledTextOr = styled(Text)`
  font-size: 20px;
  letter-spacing: 0.15px;
  line-height: 24px;
  margin-top: 32px;
`;

const SignUpScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const passwordInputRef = useRef();

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email(t('email-must-be-a-valid-email'))
      .required(t('email-is-required')),
    password: yup
      .string()
      .min(6, t('your-password-must-be-at-least-6-digits'))
      .required(t('password-is-required')),
  });

  const onSignUpPress = (values) => {
    navigation.navigate('AccountData', {
      email: values.email,
      password: values.password,
    });
  };

  return (
    <Container bounces={false} contentContainerStyle={{ paddingBottom: 32 }}>
      <Title>{t('welcome')}</Title>
      <Description>
        {t('get-access-to-vulkan-products-whenever-you-need!')}
      </Description>
      <SubTitle>{t('create-account-with-email-and-password')}</SubTitle>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={loginSchema}
        onSubmit={onSignUpPress}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          setFieldTouched,
        }) => (
          <>
            <StyledTextInput
              onChangeText={handleChange('email')}
              value={values.email}
              label={t('email')}
              mode="outlined"
              error={touched.email && errors.email}
              autoCapitalize="none"
              onSubmitEditing={() => passwordInputRef.current.focus()}
              keyboardType="email-address"
              returnKeyType="next"
              onBlur={() => setFieldTouched('email')}
            />
            <HelperText type="error" visible={touched.email && errors.email}>
              {errors.email}
            </HelperText>
            <PasswordInput
              ref={passwordInputRef}
              value={values.password}
              error={touched.password && errors.password}
              onChangeText={handleChange('password')}
              onSubmitEditing={handleSubmit}
              initialBlockContent={false}
              onBlur={() => setFieldTouched('password')}
            />
            <HelperText
              type={touched.password && errors.password ? 'error' : 'info'}
            >
              {t('your-password-must-be-at-least-6-digits')}
            </HelperText>
            <StyledSignInBtn
              mode="contained"
              disabled={
                !(values.password.length > 0 && values.email.length > 0)
              }
              onPress={handleSubmit}
            >
              {t('create-account')}
            </StyledSignInBtn>
          </>
        )}
      </Formik>
      <StyledTextOr>{t('or')}</StyledTextOr>
      <FacebookButton />
      <LinkedInButton />
      <AppleSignInButton />
      <LoginContainer>
        <LoginText>{t('already-have-an-account?')}</LoginText>
        <LoginLink
          text={t('access-your-account')}
          onPress={() => navigation.navigate('SignIn')}
        />
      </LoginContainer>
    </Container>
  );
};

export default SignUpScreen;
