import React, { useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

import {
  fetchAvailablePacks,
  fetchFavorites,
  selector as offlineSelector,
} from '../../../store/offline';
import { Button, ButtonLink, Loading, ModelCard } from '../../../components';
import { FavoriteIllustration } from '../../../components/icons';

const Container = styled(View)`
  background: #e5eef4;
  flex: 1;
`;

const EmptyContent = styled(View)`
  align-items: center;
  background: #fff;
  flex: 1;
  justify-content: center;
  padding: 0 16px;
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

const ListFooterContainer = styled(View)`
  padding: 32px 16px;
`;

const ListFooterCard = styled(View)`
  background: #e0f2fe;
  border-color: ${(props) => props.theme.text.primary};
  border-radius: 8px;
  border-width: 1px;
  flex-direction: row;
  padding: 12px 16px 12px 18px;
`;

const ListFooterCardText = styled(Text)`
  flex: 1;
  flex-wrap: wrap;
  font-size: 12px;
  letter-spacing: 0.4px;
  line-height: 16px;
  margin-left: 18px;
`;

const FooterText = styled(Text)`
  font-size: 12px;
  letter-spacing: 0.4px;
  line-height: 16px;
  margin-top: 32px;
  text-align: center;
`;

const FooterLink = styled(ButtonLink)`
  color: ${(props) => props.theme.text.secundary};
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1.25px;
  line-height: 16px;
  margin-top: 8px;
  text-align: center;
  text-decoration: underline;
`;

const FavoritesOfflineScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { favorites, availablePacks, pending } = useSelector(offlineSelector);

  useEffect(() => {
    dispatch(fetchFavorites());
    dispatch(fetchAvailablePacks());
  }, [dispatch]);

  return (
    <Container>
      {pending && <Loading />}
      {!pending && favorites.length > 0 && (
        <Content>
          <FavoriteListContainer
            data={favorites}
            useInteraction={false}
            bounces={false}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <ModelCard
                item={item}
                hideFavoriteButton
                disabled={!availablePacks.includes(item._id)}
                onPress={() =>
                  navigation.navigate('DetailsOfflineScreen', {
                    product: item,
                  })
                }
              />
            )}
            ListFooterComponent={() => (
              <ListFooterContainer>
                <ListFooterCard>
                  <MaterialIcons name="info" size={24} color="#00447A" />
                  <ListFooterCardText>
                    {t(
                      'you-are-using-a-limited-version-with-no-internet-connection'
                    )}
                  </ListFooterCardText>
                </ListFooterCard>
                <FooterText>
                  {t('to-have-access-to-the-complete-application')}
                </FooterText>
                <FooterLink
                  text={t('access-your-account')}
                  onPress={() => navigation.navigate('SignIn')}
                />
              </ListFooterContainer>
            )}
          />
        </Content>
      )}
      {!pending && favorites.length === 0 && (
        <EmptyContent>
          <FavoriteIllustration />
          <EmptyTitle>{t('you-have-no-favorites-yet')}</EmptyTitle>
          <EmptyText>{t('favorites-offline-empty-text')}</EmptyText>
          <StyledButton
            mode="contained"
            onPress={() => navigation.navigate('SignIn')}
            color="#00447A"
          >
            {t('access-my-account')}
          </StyledButton>
        </EmptyContent>
      )}
    </Container>
  );
};

export default FavoritesOfflineScreen;
