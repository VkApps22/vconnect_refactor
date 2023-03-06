import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import { RadioOption, RadioButton } from '../../../../components';
import { useDynamicTranslation } from '../../../../hooks/dynamic-translation';

const ProductListView = ({ productList, product, setProduct, onLayout }) => {
  const { dt } = useDynamicTranslation();

  return (
    <View onLayout={onLayout}>
      <RadioButton.Group
        onValueChange={(value) => setProduct(value)}
        value={product}
      >
        {productList &&
          productList.map((item) => (
            <RadioOption
              key={dt(item.name)}
              value={item}
              onPress={() => setProduct(item)}
              isSelected={item === product}
            >
              {dt(item.name)}
            </RadioOption>
          ))}
      </RadioButton.Group>
    </View>
  );
};

ProductListView.propTypes = {
  productList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.arrayOf(
        PropTypes.shape({
          language: PropTypes.string,
          value: PropTypes.string,
        })
      ),
      families: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.arrayOf(
            PropTypes.shape({
              language: PropTypes.string,
              value: PropTypes.string,
            })
          ),
          models: PropTypes.arrayOf(PropTypes.string),
        })
      ),
    })
  ).isRequired,
  product: PropTypes.shape({
    name: PropTypes.arrayOf(
      PropTypes.shape({
        language: PropTypes.string,
        value: PropTypes.string,
      })
    ),
    families: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.arrayOf(
          PropTypes.shape({
            language: PropTypes.string,
            value: PropTypes.string,
          })
        ),
        models: PropTypes.arrayOf(PropTypes.string),
      })
    ),
  }),
  setProduct: PropTypes.func.isRequired,
  onLayout: PropTypes.func,
};

ProductListView.defaultProps = {
  product: null,
  onLayout: () => {},
};

export default ProductListView;
