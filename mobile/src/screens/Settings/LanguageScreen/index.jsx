import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  DialogConfirmation,
  TouchableDebounce,
  Divider,
  RadioButton,
} from '../../../components';
import { useToast } from '../../../hooks/toast';
import { selector as authSelector, updateLanguage } from '../../../store/auth';

const Container = styled(SafeAreaView)`
  background: #fff;
  flex: 1;
`;

const RadioButtonContainer = styled(TouchableDebounce)`
  align-items: center;
  flex-direction: row;
  padding: 16px 18px 16px 16px;
`;

const RadioButtonTitle = styled(Text)`
  color: ${(props) =>
    props.$isSelected
      ? props.theme.text.highEmphasis
      : props.theme.text.lowEmphasis};
  flex: 1;
  font-size: 16px;
  letter-spacing: 0.15px;
  line-height: 24px;
`;

const RadioButtonDivider = styled(Divider)`
  background: #f3f3f3;
  height: 1px;
`;

const languages = [
  { title: 'Português (Brasil)', value: 'pt' },
  { title: 'English', value: 'en' },
  { title: 'Español', value: 'es' },
];

const LanguageScreen = () => {
  const dispatch = useDispatch();
  const { language: initialLanguage } = useSelector(authSelector);
  const [language, setLanguage] = useState('');
  const [languageTitle, setLanguageTitle] = useState('');
  const [dialog, setDialog] = useState(false);
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const { toast } = useToast();

  useEffect(() => {
    setLanguage(initialLanguage || i18n.languages[0]);
  }, [initialLanguage, i18n.languages]);

  function openDialog(value) {
    setLanguage(value);
    setLanguageTitle(languages.find((l) => l.value === value).title);
    setDialog(true);
  }

  const onCancel = () => {
    setLanguage(i18n.languages[0]);
    setDialog(false);
  };

  const onConfirm = () => {
    dispatch(updateLanguage({ language }))
      .then(unwrapResult)
      .then(() => {
        setDialog(false);
        toast.success({
          title: t('your-new-language-has-been-successfully-saved'),
        });
        navigation.navigate('Settings');
      })
      .catch(toast.exception);
  };

  return (
    <Container edges={['right', 'bottom', 'left']}>
      <RadioButton.Group
        onValueChange={(value) => openDialog(value)}
        value={language}
      >
        {languages.map(({ title, value }) => (
          <View key={value}>
            <RadioButtonContainer onPress={() => openDialog(value)}>
              <RadioButtonTitle $isSelected={value === language}>
                {title}
              </RadioButtonTitle>
              <RadioButton value={value} color="#00a0d1" />
            </RadioButtonContainer>
            <RadioButtonDivider />
          </View>
        ))}
      </RadioButton.Group>
      <DialogConfirmation
        visible={dialog}
        dismissable={false}
        confirmText={t('yes-change-to-language', { language: languageTitle })}
        content={t('do-you-want-to-change-the-language-to', {
          language: languageTitle,
        })}
        title={t('language')}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    </Container>
  );
};

export default LanguageScreen;
