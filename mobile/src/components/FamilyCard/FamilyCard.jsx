import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components/native';
import { Image, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDynamicTranslation } from '../../hooks/dynamic-translation';
import emptyImage from '../../../assets/images/empty-image-thumbnail.png';
import TouchableDebounce from '../TouchableDebounce';

const FamilyCardContainer = styled(TouchableDebounce)`
  align-items: flex-start;
  background: #ffffff;
  flex: 1;
  flex-direction: row;
  flex-grow: 0;
  justify-content: space-between;
  padding: 12px 16px;

  ${(props) =>
    !props.$isLastMember &&
    css`
      border-bottom-color: #e6e9ed;
      border-bottom-width: 1px;
    `}
`;

const FamilyImg = styled(Image)`
  height: 48px;
  width: 48px;
`;

const CardTitle = styled(Text)`
  color: rgba(0, 0, 0, 0.8);
  font-size: 16px;
  font-weight: normal;
  letter-spacing: 0.15px;
  line-height: 24px;
  margin-bottom: 4px;
`;
const CardDescription = styled(Text)`
  color: rgba(0, 0, 0, 0.6);
  font-size: 12px;
  letter-spacing: 0.4px;
  line-height: 16px;
`;

const CardTextContainer = styled(View)`
  padding: 7px 0 9px 12px;
`;

const FamilyCardInfo = styled(View)`
  align-items: center;
  flex-direction: row;
  margin-right: 14px;
`;

const FamilyCard = ({
  nameKey,
  name,
  image,
  isLastMember,
  onPress,
  ...props
}) => {
  const { t } = useTranslation();
  const { dt } = useDynamicTranslation();
  const translatedName = dt(name);
  return (
    <FamilyCardContainer
      $isLastMember={isLastMember}
      onPress={() => onPress(nameKey)}
      {...props}
    >
      <FamilyCardInfo>
        <FamilyImg
          source={image ? { uri: image } : emptyImage}
          style={{ width: 48, height: 48 }}
          resizeMode="cover"
        />
        <CardTextContainer>
          <CardTitle>{translatedName}</CardTitle>
          <CardDescription>{t('see-all-models')}</CardDescription>
        </CardTextContainer>
      </FamilyCardInfo>
    </FamilyCardContainer>
  );
};

FamilyCard.propTypes = {
  nameKey: PropTypes.string.isRequired,
  name: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      language: PropTypes.string,
    })
  ).isRequired,
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isLastMember: PropTypes.bool,
  onPress: PropTypes.func,
};

FamilyCard.defaultProps = {
  image: null,
  isLastMember: false,
  onPress: () => {},
};

export default FamilyCard;
