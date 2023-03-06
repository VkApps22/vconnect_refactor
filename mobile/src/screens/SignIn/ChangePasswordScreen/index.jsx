import React, { useCallback, useState } from 'react';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';

import { Button, PasswordInput, HelperText } from '../../../components';
import { useToast } from '../../../hooks/toast';
import { changePassword } from '../../../store/forgot-password';
import FeedbackPanel from './FeedbackPanel';

const Container = styled(View)`
  background-color: ${(props) => props.theme.screen.backgroundColorPrimary};
  flex: 1;
  padding: 16px;
`;

const StyledButton = styled(Button)`
  border-radius: 4px;
  height: 48px;
  justify-content: center;
  margin-top: 23.2px;
`;

const Title = styled(Text)`
  color: ${(props) => props.theme.text.highEmphasis};
  font-size: 34px;
  line-height: 36px;
  margin-top: 16px;
`;

const SubTitle = styled(Text)`
  color: ${(props) => props.theme.text.mediumEmphasis};
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 24px;
  margin-bottom: 22px;
  margin-top: 16px;
`;

const ChangePasswordScreen = ({ route }) => {
  const { token } = route.params;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { toast } = useToast();
  const [showFeedbackPanel, setShowFeedbackPanel] = useState(false);

  const passwordSchema = yup.object().shape({
    newPassword: yup
      .string()
      .min(6, t('your-password-must-be-at-least-6-digits'))
      .required(t('password-is-required')),
  });

  const onSubmit = useCallback(
    (values) =>
      dispatch(changePassword({ token, password: values.newPassword }))
        .then(unwrapResult)
        .then(() => setShowFeedbackPanel(true))
        .catch(toast.exception),
    [dispatch, toast, token]
  );

  return (
    <Container>
      <Title>{t('new-password')}</Title>
      <SubTitle>{t('create-your-new-password')}</SubTitle>
      <Formik
        initialValues={{ newPassword: '' }}
        validationSchema={passwordSchema}
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          touched,
          setFieldTouched,
          isValid,
        }) => (
          <>
            <PasswordInput
              value={values.newPassword}
              error={touched.newPassword && errors.newPassword}
              onChangeText={handleChange('newPassword')}
              onSubmitEditing={handleSubmit}
              initialBlockContent={false}
              onBlur={() => setFieldTouched('newPassword')}
            />
            <HelperText
              type={
                touched.newPassword && errors.newPassword ? 'error' : 'info'
              }
            >
              {t('your-password-must-be-at-least-6-digits')}
            </HelperText>
            <StyledButton
              disabled={!isValid}
              mode="contained"
              onPress={handleSubmit}
            >
              {t('create-new-password')}
            </StyledButton>
          </>
        )}
      </Formik>
      {showFeedbackPanel && <FeedbackPanel />}
    </Container>
  );
};

ChangePasswordScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ChangePasswordScreen;
