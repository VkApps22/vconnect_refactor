import React, { useState } from 'react';
import Carousel, {
  Pagination,
  ParallaxImage,
} from 'react-native-snap-carousel';
import { Dimensions, Image, TouchableWithoutFeedback, View } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { VulkanLogo } from '../icons';
import emptyImage from '../../../assets/images/empty-image.png';
import arImage from '../../../assets/images/button_ar_cube_outlined.png';

const { width: screenWidth } = Dimensions.get('window');

const CarouselContainer = styled(View)`
  height: ${screenWidth - 60}px;
  width: ${screenWidth - 60}px;
  position: relative;
`;

const InactiveDot = styled(View)`
  border-color: #00a0d1;
  border-radius: 30px;
  border-width: 1px;
  height: 8px;
  margin-right: 4px;
  width: 8px;
`;

const Empty = styled(Image)`
  height: 360px;
  width: 100%;
`;

const ActiveDot = styled(View)`
  background-color: #00a0d1;
  border-radius: 30px;
  height: 8px;
  margin-right: 4px;
  width: 8px;
`;

const VulkanStyled = styled(VulkanLogo)`
  bottom: 42px;
  position: absolute;
  right: 16px;
`;

const StyledPagination = styled(Pagination)`
  height: 24px;
  margin: 0;
  position: absolute;
`;

const Container = styled(View)`
  height: 50px;
  width: 50px;
  position: absolute;
  bottom: 12px;
  left: 12px;
  background-color: ${(props) => props.theme.text.primary};
  z-index: 1000;
  border-radius: 8px;
`;

const ArPressable = styled(TouchableWithoutFeedback)`
`;

const ArImage = styled(Image)`
  height: 40px;
  width: 40px;
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 5px;
`;

const ImageCarousel = ({ images, pending, hasAr, onArPressed, ...props }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const renderItem = ({ item }, parallaxProps) => {
    if (hasAr)
    return (
      <CarouselContainer>
        <Container>
          <ArPressable onPress={onArPressed}>
            <ArImage
              source={arImage}
              style={{ resizeMode: 'contain', marginTop: 20 }}
            />
          </ArPressable>
        </Container>

        <ParallaxImage
          source={{ uri: item }}
          containerStyle={{
            flex: 1,
            maxHeight: 360,
            borderRadius: 8,
          }}
          style={{
            resizeMode: 'contain',
            backfaceVisibility: 'hidden',
          }}
          parallaxFactor={0}
          showSpinner={pending}
          {...parallaxProps}
        />
      </CarouselContainer>
    );
    return (
      <CarouselContainer>
        <ParallaxImage
          source={{ uri: item }}
          containerStyle={{
            flex: 1,
            maxHeight: 360,
            borderRadius: 8,
          }}
          style={{
            resizeMode: 'contain',
            backfaceVisibility: 'hidden',
          }}
          parallaxFactor={0}
          showSpinner={pending}
          {...parallaxProps}
        />
      </CarouselContainer>
    );
  };

  if (!images || !images.length)
    return (
      <View {...props}>
        <Empty resizeMode="contain" source={emptyImage} />
      </View>
    );
  return (
    <View {...props}>
      <Carousel
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 60}
        data={images}
        renderItem={renderItem}
        onSnapToItem={(index) => setActiveSlide(index)}
        hasParallaxImages
      />
      <VulkanStyled />
      <StyledPagination
        dotsLength={images.length}
        activeDotIndex={activeSlide}
        containerStyle={{
          maxHeight: 50,
        }}
        dotElement={<ActiveDot />}
        inactiveDotElement={<InactiveDot />}
      />
    </View>
  );
};

ImageCarousel.propTypes = {
  hasAr: PropTypes.bool,
  pending: PropTypes.bool,
  images: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
};

ImageCarousel.defaultProps = {
  hasAr: false,
  pending: false,
  images: [null],
};

export default ImageCarousel;
