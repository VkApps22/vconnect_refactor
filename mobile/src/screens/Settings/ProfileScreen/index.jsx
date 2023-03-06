import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigation } from '@react-navigation/native';
import {
  purgeProfile,
  selector as authSelector,
  updateProfile,
} from '../../../store/auth';
import { Button, DialogConfirmation } from '../../../components';
import { useToast } from '../../../hooks/toast';
import ProfileEditor from './ProfileEditor';

const Container = styled(ScrollView)`
  background: #fff;
  flex: 1;
  padding: 16px;
`;

const DeleteAccount = styled(Button)`
  margin-top: 24px;
  width: 100%;
`;

const UpdateDataButton = styled(Button)`
  margin-top: 24px;
  width: 100%;
`;

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigation = useNavigation();
  const { t, i18n } = useTranslation(['common', 'countries']);
  const initialValues = useSelector(authSelector);
  const [scrollView, setScrollView] = useState();
  const [enableScroll, setEnableScroll] = useState(true);

  const [dialog, setDialog] = useState(false);

  const onUpdateDataPress = (values) => {
    dispatch(
      updateProfile({
        name: values.name,
        preferredName: values.preferredName,
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
        navigation.navigate('Settings');
      })
      .catch(toast.exception);
  };

  const onDeleteAccountPress = () => {
    dispatch(purgeProfile())
      .then(unwrapResult)
      .then(() => {
        toast.success({
          title: t('profile-deleted-successfully'),
        });
      })
      .catch(toast.exception);
  };

  const renderSubmit = ({ handleSubmit, isValid }) => (
    <UpdateDataButton
      mode="contained"
      disabled={!isValid}
      onPress={handleSubmit}
    >
      {t('update-data')}
    </UpdateDataButton>
  );

  return (
    <>
      <Container
        bounces={false}
        scrollEnabled={enableScroll}
        ref={(ref) => setScrollView(ref)}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <ProfileEditor
          scrollContainer={scrollView}
          enableContainerScroll={setEnableScroll}
          isScrollInContainerEnabled={enableScroll}
          initialValues={initialValues}
          emailInputEnabled={false}
          showPasswordInput={false}
          onUpdateDataPress={onUpdateDataPress}
          renderSubmit={renderSubmit}
        />
        <DeleteAccount
          color="#00a0d1"
          mode="text"
          onPress={() => setDialog(true)}
          uppercase={false}
        >
          {t('delete-account')}
        </DeleteAccount>
      </Container>
      <DialogConfirmation
        visible={dialog}
        dismissable={false}
        confirmText={t('yes-i-want-to-delete-my-account')}
        content={t('are-you-sure-you-want-to-delete-your-account?')}
        title={t('delete-account')}
        onCancel={() => setDialog(false)}
        onConfirm={() => {
          setDialog(false);
          onDeleteAccountPress();
        }}
      />
    </>
  );
};

export default ProfileScreen;
