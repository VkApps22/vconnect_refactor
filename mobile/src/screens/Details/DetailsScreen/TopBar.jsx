import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import styled, { css } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import Icon from '@expo/vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import { BackButton, Surface, TouchableDebounce } from '../../../components';
import { useToast } from '../../../hooks/toast';
import { selector as userSelector, toggleFavorite } from '../../../store/auth';

const TopBarContainer = styled(View)`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 16px;
`;

const FavoriteSurface = styled(Surface)`
  border-radius: 30px;
  padding: 11px 10px 10.65px 10px;
  ${(props) =>
    props.$isFavorited
      ? css`
          background: #e0f2fe;
          border-width: 1px;
          border-color: transparent;
          elevation: 9;
        `
      : css`
          border-width: 1px;
          border-color: #e6e9ed;
        `}
`;

const TopBar = ({ modelId }) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [favorited, setFavorited] = useState(false);
  const { favorites } = useSelector(userSelector);

  useEffect(() => {
    const isFavorited =
      favorites &&
      favorites.find(({ _id: favoriteId }) => favoriteId === modelId);
    setFavorited(!!isFavorited);
  }, [favorites, modelId]);

  const handleAddFavorite = useCallback(() => {
    dispatch(toggleFavorite({ modelId, remove: favorited }))
      .then(unwrapResult)
      .then(() =>
        toast.success({
          title: !favorited
            ? t('item-successfully-added-to-favorites')
            : t('item-successfully-removed-from-favorites'),
        })
      )
      .catch(toast.exception);
  }, [dispatch, toast, modelId, favorited, t]);

  return (
    <TopBarContainer>
      <BackButton onPress={() => navigation.goBack()} />
      <TouchableDebounce onPress={handleAddFavorite}>
        <FavoriteSurface $isFavorited={favorited}>
          <Icon
            name={favorited ? 'favorite' : 'favorite-border'}
            size={23}
            color="#00A0D1"
          />
        </FavoriteSurface>
      </TouchableDebounce>
    </TopBarContainer>
  );
};

TopBar.propTypes = {
  modelId: PropTypes.string.isRequired,
};

export default TopBar;
