import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components/native';
import { Image, Text } from 'react-native';
import emptyImage from '../../../../../assets/images/empty-image-thumbnail.png';
import { TouchableDebounce } from '../../../../components';

const CardContainer = styled(TouchableDebounce)`
  align-items: center;
  background: #e0f2fe;
  border-radius: 8px;
  flex-direction: row;
  height: 100px;
  margin-right: 8px;
  padding: 8px 12px;
`;

const CardImage = styled(Image)`
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  height: 84px;
  width: 84px;
`;

const CardText = styled(Text)`
  color: ${(props) => props.theme.text.primary};
  margin-right: 8px;
  text-align: left;
  width: 84px;
`;

const ProductCarouselCard = ({ name, image, onPress, ...props }) => {
  return (
    <CardContainer onPress={onPress} {...props}>
      <CardText>{name}</CardText>
      <CardImage
        source={image ? { uri: image } : emptyImage}
        resizeMode="cover"
      />
    </CardContainer>
  );
};

ProductCarouselCard.propTypes = {
  name: PropTypes.string,
  onPress: PropTypes.func,
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ProductCarouselCard.defaultProps = {
  name: '',
  onPress: () => {},
  image: null,
};

export default ProductCarouselCard;
