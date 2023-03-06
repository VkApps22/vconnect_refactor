import React from 'react';
import styled, { css } from 'styled-components/native';
import { FlatList, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { useDynamicTranslation } from '../../../../hooks/dynamic-translation';
import ProductCarouselCard from './ProductCarouselCard';

const MainText = styled(Text)`
  color: ${(props) => props.theme.text.primary};
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0.15px;
  line-height: 24px;
  margin-bottom: 16px;
  text-transform: uppercase;
  ${(props) =>
    props.$padding &&
    css`
      margin-left: 17px;
    `}
`;

const Container = styled(View)`
  background: #ffffff;
  margin-bottom: 16px;
  padding: 16px 0 16px 16px;
`;

const ProductList = styled(FlatList)``;

const ProductCarousel = ({ products }) => {
  const { t } = useTranslation();
  const { dt } = useDynamicTranslation();
  const navigation = useNavigation();

  const onPress = (productKey) =>
    navigation.navigate('Search', {
      screen: 'SearchScreen',
      params: {
        query: '',
        filter: {
          product: productKey,
        },
        queryDate: new Date().getTime(),
      },
    });

  return (
    <Container>
      <MainText>{t('search-by-products')}</MainText>
      <ProductList
        bounces={false}
        data={products}
        keyExtractor={(product) => product.nameKey}
        renderItem={({ item }) => (
          <ProductCarouselCard
            onPress={() => onPress(item.nameKey)}
            name={dt(item.name)}
            image={item.items[0].thumbnail}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </Container>
  );
};

ProductCarousel.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string,
          language: PropTypes.string,
        })
      ),
      items: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.arrayOf(
            PropTypes.shape({
              value: PropTypes.string,
              language: PropTypes.string,
            })
          ),
          description: PropTypes.string,
          thumbnail: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          id: PropTypes.string,
        })
      ),
    })
  ).isRequired,
};

export default ProductCarousel;
