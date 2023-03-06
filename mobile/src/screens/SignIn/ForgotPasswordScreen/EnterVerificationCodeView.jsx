import React from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { Text, View } from 'react-native';
import { Formik } from 'formik';
import styled, { css } from 'styled-components/native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import PropTypes from 'prop-types';

import { EmailIllustration } from '../../../components/icons';
import {
  Button,
  ButtonLink,
  TouchableDebounce,
  HelperText,
} from '../../../components';

const Container = styled(View)`
  align-items: center;
`;

const Title = styled(Text)`
  color: ${(props) => props.theme.text.highEmphasis};
  font-size: 34px;
  line-height: 36px;
  margin-bottom: 30px;
  text-align: center;
`;

const SubTitle = styled(Text)`
  color: ${(props) => props.theme.text.mediumEmphasis};
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 24px;
  margin-bottom: 32px;
  text-align: center;
`;

const StyledButton = styled(Button)`
  border-radius: 4px;
  height: 48px;
  justify-content: center;
  margin-top: 10px;
  width: 100%;
`;

const StyledImage = styled(EmailIllustration)`
  margin-bottom: 32px;
`;

const StyledCell = styled(Text)`
  border-color: #e6e9ed;
  border-width: 1px;
  font-size: 24px;
  height: 52px;
  letter-spacing: 0.18px;
  line-height: 48px;
  text-align: center;
  width: 52px;

  ${(props) =>
    props.$isFocused &&
    css`
      border-color: #00a0d1;
    `}

  ${(props) =>
    props.$isFirst &&
    css`
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
    `}

    ${(props) =>
    props.$isLast &&
    css`
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
    `}
`;

const StyledOutlinedButton = styled(TouchableDebounce)`
  align-items: center;
  border-color: rgba(0, 0, 0, 0.54);
  border-radius: 4px;
  border-width: 1px;
  height: 48px;
  justify-content: center;
  margin-top: 16px;
  width: 100%;
`;

const BtnTitle = styled(Text)`
  color: ${(props) => props.theme.text.mediumEmphasis};
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1.25px;
  line-height: 16px;
  text-transform: uppercase;
`;

const StyledButtonLink = styled(ButtonLink)`
  color: ${(props) => props.theme.text.secundary};
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1.25px;
  line-height: 16px;
  margin-top: 8px;
  text-decoration: underline;
`;

const FooterText = styled(Text)`
  color: ${(props) => props.theme.text.highEmphasis};
  font-size: 12px;
  letter-spacing: 0.4px;
  line-height: 16px;
  margin-top: 32px;
`;

const EnterVerificationCodeView = ({
  handleSubmitVerificationCode,
  handleResendCode,
  handleTryAnotherEmail,
  emailSent,
}) => {
  const { t } = useTranslation();

  const codeSchema = yup.object().shape({
    verificationCode: yup.string().required(t('verification-code-is-required')),
  });

  return (
    <Container>
      <StyledImage />
      <Title>{t('verification-code')}</Title>
      <SubTitle>
        {t('check-your-inbox-and-enter-the-6-digit-code-sent-by-email')}
      </SubTitle>
      <Formik
        initialValues={{ verificationCode: '' }}
        validationSchema={codeSchema}
        onSubmit={handleSubmitVerificationCode}
      >
        {({ values, errors, handleChange, handleSubmit, touched, isValid }) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const ref = useBlurOnFulfill({
            value: values.verificationCode,
            cellCount: 6,
          });
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const [props, getCellOnLayoutHandler] = useClearByFocusCell({
            value: values.verificationCode,
            setValue: handleChange('verificationCode'),
          });

          return (
            <>
              <CodeField
                ref={ref}
                {...props}
                cellCount={6}
                keyboardType="number-pad"
                value={values.verificationCode}
                onChangeText={handleChange('verificationCode')}
                textContentType="oneTimeCode"
                returnKeyType="send"
                onSubmitEditing={handleSubmit}
                renderCell={({ index, symbol, isFocused }) => (
                  <StyledCell
                    key={index}
                    $isFocused={isFocused}
                    $isFirst={index === 0}
                    $isLast={index === 5}
                    onLayout={getCellOnLayoutHandler(index)}
                  >
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </StyledCell>
                )}
              />
              <HelperText
                type="error"
                visible={
                  !!(touched.verificationCode && errors.verificationCode)
                }
              >
                {errors.verificationCode}
              </HelperText>
              <StyledButton
                mode="contained"
                disabled={!isValid}
                onPress={handleSubmit}
              >
                {t('confirm')}
              </StyledButton>
              <StyledOutlinedButton
                onPress={() => handleResendCode({ email: emailSent })}
              >
                <BtnTitle>{t('resend-code')}</BtnTitle>
              </StyledOutlinedButton>
            </>
          );
        }}
      </Formik>
      <FooterText>{t('didnt-receive-our-email?')}</FooterText>
      <StyledButtonLink
        text={t('try-with-another-email')}
        onPress={() => handleTryAnotherEmail()}
      />
    </Container>
  );
};

EnterVerificationCodeView.propTypes = {
  handleSubmitVerificationCode: PropTypes.func.isRequired,
  handleResendCode: PropTypes.func.isRequired,
  handleTryAnotherEmail: PropTypes.func.isRequired,
  emailSent: PropTypes.string.isRequired,
};

export default EnterVerificationCodeView;
