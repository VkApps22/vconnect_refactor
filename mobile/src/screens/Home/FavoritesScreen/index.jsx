import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { selector as userSelector } from '../../../store/auth';
import {
  Button,
  FocusAwareStatusBar,
  Loading,
  ModelCard,
} from '../../../components';
import { FavoriteIllustration } from '../../../components/icons';

const Container = styled(SafeAreaView)`
  background: #e5eef4;
  flex: 1;
`;

const Header = styled(View)`
  background: #fff;
  border-bottom-color: #e6e9ed;
  border-bottom-width: 1px;
  padding: 16px;
`;

const HeaderTitle = styled(Text)`
  color: ${(props) => props.theme.text.primary};
  font-size: 20px;
  letter-spacing: 0.15px;
  line-height: 24px;
`;

const EmptyContent = styled(View)`
  align-items: center;
  background: #fff;
  flex: 1;
  justify-content: center;
  padding: 16px;
`;

const EmptyTitle = styled(Text)`
  font-size: 20px;
  letter-spacing: 0.15px;
  line-height: 24px;
  margin-top: 24px;
`;

const EmptyText = styled(Text)`
  color: ${(props) => props.theme.text.lowEmphasis};
  font-size: 14px;
  letter-spacing: 0.25px;
  line-height: 20px;
  margin-top: 8px;
  text-align: center;
`;

const StyledButton = styled(Button)`
  align-items: center;
  height: 48px;
  justify-content: center;
  margin-top: 24px;
  width: 280px;
`;

const Content = styled(View)`
  flex: 1;
`;

const FavoriteListContainer = styled(FlatList)`
  background: #e5eef4;
`;

const FavoritesScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { favorites, pending } = useSelector(userSelector);

  return (
    <>
      <FocusAwareStatusBar barStyle="dark" backgroundColor="#fff" />
      <Container edges={['right', 'bottom', 'left']}>
        <Header>
          <HeaderTitle>{t('favorites')}</HeaderTitle>
        </Header>
        {pending && <Loading />}
        {!pending && favorites.length > 0 && (
          <Content>
            <FavoriteListContainer
              data={favorites}
              useInteraction={false}
              bounces={false}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => <ModelCard item={item} />}
              contentContainerStyle={{ paddingBottom: 80 }}
            />
          </Content>
        )}
        {!pending && favorites.length === 0 && (
          <EmptyContent>
            <FavoriteIllustration />
            <EmptyTitle>{t('you-have-no-favorites-yet')}</EmptyTitle>
            <EmptyText>
              {t('to-save-your-items-as-favorites-click-on-the-heart-icon')}
            </EmptyText>
            <StyledButton
              mode="contained"
              onPress={() => navigation.navigate('Search')}
              color="#00447A"
            >
              {t('search-vulkan-products')}
            </StyledButton>
          </EmptyContent>
        )}
      </Container>
    </>
  );
};

export default FavoritesScreen;
