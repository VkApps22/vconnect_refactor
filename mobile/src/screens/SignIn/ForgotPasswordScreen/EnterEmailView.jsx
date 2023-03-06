import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Button, HelperText, TextInput } from '../../../components';

const StyledButton = styled(Button)`
  border-radius: 4px;
  height: 48px;
  justify-content: center;
  margin-top: 20px;
`;

const StyledTextInput = styled(TextInput)`
  background: #fff;
`;

const Title = styled(Text)`
  color: ${(props) => props.theme.text.highEmphasis};
  font-size: 34px;
  line-height: 36px;
  margin-bottom: 16px;
`;

const SubTitle = styled(Text)`
  color: ${(props) => props.theme.text.mediumEmphasis};
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 24px;
  margin-bottom: 32px;
`;

const EnterEmailView = ({ handleSubmitEmail }) => {
  const { t } = useTranslation();

  const forgotPasswordSchema = yup.object().shape({
    email: yup
      .string()
      .email(t('email-must-be-a-valid-email'))
      .required(t('email-is-required')),
  });

  return (
    <>
      <Title>{t('change-password')}</Title>
      <SubTitle>{t('forgot-password-text')}</SubTitle>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={forgotPasswordSchema}
        onSubmit={handleSubmitEmail}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          touched,
          isValid,
          setFieldTouched,
        }) => (
          <>
            <StyledTextInput
              value={values.email}
              onChangeText={handleChange('email')}
              keyboardType="email-address"
              returnKeyType="send"
              autoCapitalize="none"
              isErrored={touched.email && errors.email}
              errorMessage={errors.email}
              onSubmitEditing={handleSubmit}
              label={t('email')}
              mode="outlined"
              error={touched.email && errors.email}
              onBlur={() => setFieldTouched('email')}
            />
            <HelperText
              type="error"
              visible={!!(touched.email && errors.email)}
            >
              {errors.email}
            </HelperText>
            <StyledButton
              mode="contained"
              disabled={!isValid}
              onPress={handleSubmit}
            >
              {t('send-email')}
            </StyledButton>
          </>
        )}
      </Formik>
    </>
  );
};

EnterEmailView.propTypes = {
  handleSubmitEmail: PropTypes.func.isRequired,
};

export default EnterEmailView;
