import React, { useCallback, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { useToast } from '../../../hooks/toast';
import ProfileEditor from '../../Settings/ProfileScreen/ProfileEditor';
import {
  selector as authSelector,
  signIn,
  signUp,
  updateProfile,
} from '../../../store/auth';
import { Button } from '../../../components';

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

const Description = styled(Text)`
  color: ${(props) => props.theme.text.mediumEmphasis};
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 24px;
  margin-bottom: 32px;
  margin-top: 16px;
`;

const PrivacyText = styled(Text)`
  color: ${(props) => props.theme.text.mediumEmphasis};
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 24px;
  margin-top: 44px;
`;

const MyProfile = styled(Text)`
  color: ${(props) => props.theme.text.highEmphasis};
  font-size: 20px;
  letter-spacing: 0.15px;
  line-height: 24px;
  margin-bottom: 24px;
`;

const ContinueButton = styled(Button)`
  height: 48px;
  justify-content: center;
  margin-top: 24px;
`;

const AccountData = ({ route }) => {
  const { t, i18n } = useTranslation();
  const [scrollView, setScrollView] = useState();
  const [enableScroll, setEnableScroll] = useState(true);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const storeData = useSelector(authSelector);
  const { email, password } = route.params || storeData;
  const { name, preferredName, company, phone, country, state } = route.params
    ? {
        name: '',
        preferredName: '',
        company: '',
        phone: '',
        country: '',
        state: '',
      }
    : storeData;

  const doSignIn = useCallback(
    (values) =>
      dispatch(
        signIn({
          method: 'email',
          email: values.email,
          password: values.password,
        })
      )
        .then(unwrapResult)
        .catch(toast.exception),
    [dispatch, toast]
  );

  const onSignUpPress = (values) => {
    dispatch(
      signUp({
        email: values.email,
        name: values.name,
        preferredName: values.preferredName,
        company: values.company,
        phone: values.phone,
        country: values.country,
        state: values.state,
        password,
        language: i18n.languages[0],
      })
    )
      .then(unwrapResult)
      .then(() => {
        toast.success({
          title: t('account-successfully-created'),
        });
        doSignIn({ email, password });
      })
      .catch(toast.exception);
  };

  const onUpdatePress = (values) => {
    dispatch(
      updateProfile({
        name: values.name,
        preferredName: values.preferredName,
        email: values.email,
        company: values.company,
        phone: values.phone,
        country: values.country,
        state: values.state,
        language: i18n.languages[0],
      })
    )
      .then(unwrapResult)
      .then(() => {
        toast.success({
          title: t('profile-updated-successfully'),
        });
      })
      .catch(toast.exception);
  };

  return (
    <Container
      bounces={false}
      scrollEnabled={enableScroll}
      ref={(ref) => setScrollView(ref)}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <Title>{t('registration-data')}</Title>
      <Description>
        {t('enter-your-details-below-to-complete-your-profile-setup')}
      </Description>
      <MyProfile>{t('my-profile')}</MyProfile>
      <ProfileEditor
        scrollContainer={scrollView}
        enableContainerScroll={setEnableScroll}
        isScrollInContainerEnabled={enableScroll}
        emailInputEnabled={!route.params}
        showPasswordInput={false}
        showEmailInput={!route.params}
        initialValues={{
          name,
          preferredName,
          email,
          company,
          phone,
          country,
          state,
        }}
        onUpdateDataPress={route.params ? onSignUpPress : onUpdatePress}
        renderSubmit={({ handleSubmit, isValid }) => (
          <>
            <PrivacyText>{t('privacy-info')}</PrivacyText>
            <ContinueButton
              mode="contained"
              onPress={handleSubmit}
              disabled={!isValid}
            >
              {t('continue-to-home-screen')}
            </ContinueButton>
          </>
        )}
      />
    </Container>
  );
};

AccountData.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      email: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default AccountData;
