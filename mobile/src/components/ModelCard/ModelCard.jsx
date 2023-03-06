import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@expo/vector-icons/MaterialIcons';
import styled, { css } from 'styled-components/native';
import { Image, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigation } from '@react-navigation/native';

import { useToast } from '../../hooks/toast';
import { useDynamicTranslation } from '../../hooks/dynamic-translation';
import { selector as userSelector, toggleFavorite } from '../../store/auth';
import emptyImage from '../../../assets/images/empty-image-thumbnail.png';
import TouchableDebounce from '../TouchableDebounce';

const CardContainer = styled(View)`
  align-items: flex-start;
  background: #ffffff;
  flex: 1;
  flex-direction: row;
  flex-grow: 0;
  justify-content: space-between;
  padding: 16px 17.33px 24px 16px;

  ${(props) =>
    !props.$isLastMember &&
    css`
      border-bottom-color: #e6e9ed;
      border-bottom-width: 1px;
    `} ${(props) =>
    props.$disabled &&
    css`
      opacity: 0.5;
    `}
`;

const CardImage = styled(Image)`
  height: 48px;
  width: 48px;
`;

const CardTitle = styled(Text)`
  font-size: 16px;
  letter-spacing: 0.15px;
  line-height: 24px;
`;

const CardTextContainer = styled(View)`
  margin-left: 12px;
  width: 80%;
`;

const InfoContainer = styled(View)`
  align-items: center;
  flex: 1;
  flex-direction: row;
`;

const StyledIcon = styled(Icon)`
  margin-left: 13.33px;
`;

const ModelCard = ({
  item,
  isLastMember,
  hideFavoriteButton,
  disabled,
  onPress,
  ...props
}) => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigation = useNavigation();
  const { favorites } = useSelector(userSelector);
  const [favorited, setFavorited] = useState(false);
  const { thumbnail, model, family, name, _id: modelId } = item;
  const { dt } = useDynamicTranslation();

  useEffect(() => {
    const isFavorited =
      favorites &&
      favorites.find(({ _id: favoriteId }) => favoriteId === modelId);
    setFavorited(!!isFavorited);
  }, [favorites, modelId]);

  const handleAddFavorite = useCallback(() => {
    dispatch(toggleFavorite({ modelId, remove: favorited }))
      .then(unwrapResult)
      .catch(toast.exception);
  }, [dispatch, toast, modelId, favorited]);

  const CardInfo = () => (
    <InfoContainer>
      <CardImage
        source={thumbnail ? { uri: thumbnail } : emptyImage}
        resizeMode="cover"
      />
      <CardTextContainer>
        <CardTitle>{`${dt(name)} ${dt(family)} - ${model}`}</CardTitle>
      </CardTextContainer>
    </InfoContainer>
  );

  const onTouchablePress = () => {
    if (disabled) return;

    if (onPress) {
      onPress();
      return;
    }

    navigation.navigate('Details', {
      screen: 'DetailsScreen',
      params: {
        product: item,
      },
    });
  };

  return (
    <TouchableDebounce onPress={onTouchablePress}>
      <CardContainer
        $isLastMember={isLastMember}
        $disabled={disabled}
        {...props}
      >
        <CardInfo />
        {!hideFavoriteButton && (
          <TouchableDebounce
            onPress={handleAddFavorite}
            hitSlop={{ top: 13, right: 13, bottom: 13, left: 13 }}
          >
            <StyledIcon
              name={favorited ? 'favorite' : 'favorite-border'}
              size={19}
              color="#00A0D1"
            />
          </TouchableDebounce>
        )}
      </CardContainer>
    </TouchableDebounce>
  );
};

ModelCard.propTypes = {
  isLastMember: PropTypes.bool,
  hideFavoriteButton: PropTypes.bool,
  disabled: PropTypes.bool,
  item: PropTypes.shape({
    _id: PropTypes.string,
    thumbnail: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.arrayOf(
      PropTypes.shape({
        language: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      })
    ),
    name: PropTypes.arrayOf(
      PropTypes.shape({
        language: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      })
    ),
    family: PropTypes.arrayOf(
      PropTypes.shape({
        language: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      })
    ),
    model: PropTypes.string,
  }).isRequired,
  onPress: PropTypes.func,
};

ModelCard.defaultProps = {
  isLastMember: false,
  hideFavoriteButton: false,
  disabled: false,
  onPress: null,
};

export default ModelCard;
