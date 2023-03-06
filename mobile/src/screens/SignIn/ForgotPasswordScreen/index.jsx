import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { unwrapResult } from '@reduxjs/toolkit';
import {
  checkVerificationCode,
  selector as forgotPasswordSelector,
  sendVerificationCode,
  slice,
} from '../../../store/forgot-password';
import EnterVerificationCodeView from './EnterVerificationCodeView';
import { useToast } from '../../../hooks/toast';
import EnterEmailView from './EnterEmailView';

const Container = styled(View)`
  background-color: ${(props) => props.theme.screen.backgroundColorPrimary};
  flex: 1;
  padding: 32px 16px;
`;

const ForgotPasswordScreen = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigation = useNavigation();
  const { sent, checked, email, token } = useSelector(forgotPasswordSelector);

  const handleSubmitEmail = useCallback(
    (values) => {
      dispatch(sendVerificationCode({ email: values.email }))
        .then(unwrapResult)
        .catch(toast.exception);
    },
    [dispatch, toast.exception]
  );

  const handleSubmitVerificationCode = useCallback(
    (values) => {
      dispatch(
        checkVerificationCode({
          email,
          verificationCode: values.verificationCode,
        })
      )
        .then(unwrapResult)
        .catch(toast.exception);
    },
    [email, dispatch, toast.exception]
  );

  useEffect(() => {
    dispatch(slice.actions.reset());
  }, [dispatch]);

  useEffect(() => {
    if (checked && token) {
      navigation.navigate('ChangePassword', { token });
      dispatch(slice.actions.reset());
    }
  }, [dispatch, navigation, checked, token]);

  const handleResetState = useCallback(() => dispatch(slice.actions.reset()), [
    dispatch,
  ]);

  return (
    <Container>
      {!sent ? (
        <EnterEmailView handleSubmitEmail={handleSubmitEmail} />
      ) : (
        <EnterVerificationCodeView
          handleSubmitVerificationCode={handleSubmitVerificationCode}
          handleResendCode={handleSubmitEmail}
          handleTryAnotherEmail={handleResetState}
          emailSent={email}
        />
      )}
    </Container>
  );
};

export default ForgotPasswordScreen;
