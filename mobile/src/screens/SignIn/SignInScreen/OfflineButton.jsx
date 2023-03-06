import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

import { TouchableDebounce } from '../../../components';

const StyledOfflineBtn = styled(TouchableDebounce)`
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

const ContentContainer = styled(View)`
  align-items: center;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

const OfflineButton = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  return (
    <StyledOfflineBtn onPress={() => navigation.navigate('FavoritesOffline')}>
      <ContentContainer>
        <BtnTitle>{t('login-without-connection')}</BtnTitle>
      </ContentContainer>
    </StyledOfflineBtn>
  );
};

export default OfflineButton;
