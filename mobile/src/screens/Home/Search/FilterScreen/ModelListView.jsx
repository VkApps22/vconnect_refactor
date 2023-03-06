import React from 'react';
import styled from 'styled-components/native';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { CheckOption, List } from '../../../../components';
import { useDynamicTranslation } from '../../../../hooks/dynamic-translation';

const ListTitle = styled(Text)`
  font-size: 20px;
  line-height: 24px;
`;

const ModelListView = ({ family, setModels, modelsList, models, onLayout }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { dt } = useDynamicTranslation();

  return (
    <View onLayout={onLayout}>
      <List.Accordion
        titleStyle={{
          color: family ? 'rgba(0, 0, 0, 0.87)' : 'rgba(0, 0, 0, 0.38)',
        }}
        title={<ListTitle>{t('which-model?')}</ListTitle>}
        expanded={!!family}
      >
        {family &&
          modelsList.slice(0, 10).map((model) => (
            <CheckOption
              key={dt(family.name) + model}
              onPress={() => setModels(_.xor(models, [model]))}
              isSelected={models.includes(model)}
            >
              {model}
            </CheckOption>
          ))}
        {modelsList.length > 10 && (
          <CheckOption
            onPress={() =>
              navigation.navigate('ViewAllScreen', {
                modelsListParam: modelsList,
                modelsParam: models,
              })
            }
            isSelected={models.length > 0}
          >
            {models.length === 0
              ? t('view-all')
              : t('view-all-number-applied', {
                  count: models.length,
                })}
          </CheckOption>
        )}
      </List.Accordion>
    </View>
  );
};

ModelListView.propTypes = {
  modelsList: PropTypes.arrayOf(PropTypes.string).isRequired,
  models: PropTypes.arrayOf(PropTypes.string),
  family: PropTypes.shape({
    name: PropTypes.arrayOf(
      PropTypes.shape({
        language: PropTypes.string,
        value: PropTypes.string,
      })
    ),
    models: PropTypes.arrayOf(PropTypes.string),
  }),
  setModels: PropTypes.func.isRequired,
  onLayout: PropTypes.func,
};

ModelListView.defaultProps = {
  family: null,
  models: [],
  onLayout: () => {},
};

export default ModelListView;
