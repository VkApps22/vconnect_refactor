import React from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import ProductCard from './ProductCard';

const StyledProductCard = styled(ProductCard)`
  margin-top: 16px;
`;

const Container = styled(FlatList)`
  background: #e5eef4;
`;

const ProductGalleryView = ({ items }) => {
  const navigation = useNavigation();
  const onPress = (filter) =>
    navigation.navigate('Search', {
      screen: 'SearchScreen',
      params: {
        query: '',
        filter,
        queryDate: new Date().getTime(),
      },
    });
  return (
    <Container
      data={items}
      useInteraction={false}
      bounces={false}
      keyExtractor={(item) => item.items[0].id}
      renderItem={({ item }) => (
        <StyledProductCard
          nameKey={item.nameKey}
          name={item.name}
          items={item.items}
          onPress={onPress}
        />
      )}
      contentContainerStyle={{ paddingBottom: 65 }}
    />
  );
};

ProductGalleryView.propTypes = {
  items: PropTypes.arrayOf(
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

export default ProductGalleryView;
