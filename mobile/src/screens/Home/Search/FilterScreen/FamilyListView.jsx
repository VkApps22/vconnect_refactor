import React from 'react';
import styled from 'styled-components/native';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import { RadioOption, List, RadioButton } from '../../../../components';
import { useDynamicTranslation } from '../../../../hooks/dynamic-translation';

const ListTitle = styled(Text)`
  font-size: 20px;
  line-height: 24px;
`;

const FamilyListView = ({
  product,
  familyList,
  family,
  setFamily,
  onLayout,
}) => {
  const { t } = useTranslation();
  const { dt } = useDynamicTranslation();

  return (
    <View onLayout={onLayout}>
      <List.Accordion
        titleStyle={{
          color: product ? 'rgba(0, 0, 0, 0.87)' : 'rgba(0, 0, 0, 0.38)',
        }}
        title={<ListTitle>{t('which-family?')}</ListTitle>}
        expanded={!!product}
      >
        <RadioButton.Group
          onValueChange={(value) => setFamily(value)}
          value={family}
        >
          {product &&
            familyList.map((item) => (
              <RadioOption
                key={dt(product.name) + dt(item.name)}
                value={item}
                onPress={() => setFamily(item)}
                isSelected={family === item}
              >
                {dt(item.name)}
              </RadioOption>
            ))}
        </RadioButton.Group>
      </List.Accordion>
    </View>
  );
};

FamilyListView.propTypes = {
  familyList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.arrayOf(
        PropTypes.shape({
          language: PropTypes.string,
          value: PropTypes.string,
        })
      ),
      models: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
  family: PropTypes.shape({
    name: PropTypes.arrayOf(
      PropTypes.shape({
        language: PropTypes.string,
        value: PropTypes.string,
      })
    ),
    models: PropTypes.arrayOf(PropTypes.string),
  }),
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
  setFamily: PropTypes.func.isRequired,
  onLayout: PropTypes.func,
};

FamilyListView.defaultProps = {
  family: null,
  product: null,
  onLayout: () => {},
};

export default FamilyListView;
