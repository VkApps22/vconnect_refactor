import React, { useState } from 'react';
import { Linking, Text, View } from 'react-native';
import MaterialIcon from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcon from '@expo/vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { selector as authSelector, signOut } from '../../../store/auth';
import { DialogConfirmation, TouchableDebounce } from '../../../components';
import { LogoutIcon } from '../../../components/icons';
import { env } from '../../../config';

const Container = styled(SafeAreaView)`
  background: #f3f3f3;
  flex: 1;
`;

const ProfileButtonContainer = styled(TouchableDebounce)`
  align-items: center;
  background: #fff;
  flex-direction: row;
  margin-bottom: 16px;
  padding: 18px 16px 18px 18px;
`;

const ProfileTextContainer = styled(View)`
  flex: 1;
  margin-left: 30px;
`;

const Username = styled(Text)`
  font-size: 20px;
  letter-spacing: 0.15px;
  line-height: 24px;
`;

const SubTitle = styled(Text)`
  color: ${(props) => props.theme.text.tertiary};
  font-size: 12px;
  letter-spacing: 0.4px;
  line-height: 16px;
  margin-top: 8px;
`;

const RightArrow = styled(MaterialIcon)`
  color: ${(props) => props.theme.text.tertiary};
`;

const ButtonTitle = styled(Text)`
  color: ${(props) => props.theme.text.mediumEmphasis};
  flex: 1;
  font-size: 20px;
  letter-spacing: 0.15px;
  line-height: 24px;
  margin-left: 24px;
`;

const OptionButton = styled(TouchableDebounce)`
  background: #fff;
  flex-direction: row;
  margin-top: 1px;
  padding: 18px 16px 18px 18px;
`;

const ProfileButton = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { preferredName } = useSelector(authSelector);

  return (
    <ProfileButtonContainer onPress={() => navigation.navigate('Profile')}>
      <>
        <MaterialIcon name="account-circle" size={50} color="#00a0d1" />
        <ProfileTextContainer>
          <Username>{preferredName}</Username>
          <SubTitle>{t('my-profile')}</SubTitle>
        </ProfileTextContainer>
        <RightArrow name="keyboard-arrow-right" size={24} />
      </>
    </ProfileButtonContainer>
  );
};

const LanguageButton = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <OptionButton onPress={() => navigation.navigate('Language')}>
      <>
        <MaterialIcon name="language" size={25} color="#00a0d1" />
        <ButtonTitle>{t('language')}</ButtonTitle>
        <RightArrow name="keyboard-arrow-right" size={24} />
      </>
    </OptionButton>
  );
};

const PrivacyPolicyButton = () => {
  const { t } = useTranslation();

  return (
    <OptionButton onPress={() => Linking.openURL(t('privacy-policy-url'))}>
      <>
        <MaterialCommunityIcon name="file-document" size={25} color="#00a0d1" />
        <ButtonTitle>{t('privacy-policy')}</ButtonTitle>
        <RightArrow name="keyboard-arrow-right" size={24} />
      </>
    </OptionButton>
  );
};

const LogoutButton = ({ setDialog }) => {
  const { t } = useTranslation();
  const { preferredName } = useSelector(authSelector);
  const dispatch = useDispatch();

  return (
    <OptionButton
      onPress={() =>
        preferredName !== env.DEFAULT_USER_NAME
          ? setDialog(true)
          : (setDialog(false), dispatch(signOut({})))
      }
    >
      <>
        <LogoutIcon />
        <ButtonTitle>{t('logout')}</ButtonTitle>
        <RightArrow name="keyboard-arrow-right" size={24} />
      </>
    </OptionButton>
  );
};
LogoutButton.propTypes = {
  setDialog: PropTypes.func.isRequired,
};

const SettingsScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [dialog, setDialog] = useState(false);
  const { preferredName } = useSelector(authSelector);

  return (
    <Container edges={['right', 'bottom', 'left']}>
      {preferredName !== env.DEFAULT_USER_NAME && <ProfileButton />}
      <LanguageButton />
      <PrivacyPolicyButton />
      <LogoutButton setDialog={setDialog} />
      <DialogConfirmation
        visible={dialog}
        dismissable={false}
        confirmText={t('yes-i-want-to-logout')}
        content={t('are-you-sure-you-want-to-leave-the-application?')}
        title={t('logout')}
        onCancel={() => {
          setDialog(false);
        }}
        onConfirm={() => {
          setDialog(false);
          dispatch(signOut({}));
        }}
      />
    </Container>
  );
};

export default SettingsScreen;
