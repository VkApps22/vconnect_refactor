import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { Text, View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';
import { selector as authSelector } from '../../../store/auth';
import { TouchableDebounce } from '../../../components';
import { env } from '../../../config';

const Title = styled(Text)`
  color: #ffffff;
  font-size: 24px;
  letter-spacing: 0.18px;
  padding-top: 8px;
`;

const SubTitle = styled(Text)`
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 24px;
  margin-top: 8px;
`;

const Header = styled(View)`
  background: #00447a;
  padding: 18px 16px 0 16px;
  width: 100%;
`;

const User = styled(Text)`
  color: #00a0d1;
`;

const MenuContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 10px;
`;

const HeaderContent = ({ ...props }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { preferredName } = useSelector(authSelector);

  return (
    <Header {...props}>
      <MenuContainer>
        <TouchableDebounce onPress={() => navigation.navigate('Settings')}>
          <Icon name="menu" size={30} color="#ffffff" />
        </TouchableDebounce>
      </MenuContainer>
      {preferredName !== env.DEFAULT_USER_NAME ? (
        <Title>
          {t('hi')}
          <User>{preferredName}</User>
        </Title>
      ) : (
        <Title>{t('welcome')}</Title>
      )}
      <SubTitle>{t('what-are-you-looking-for?')}</SubTitle>
    </Header>
  );
};

export default HeaderContent;
