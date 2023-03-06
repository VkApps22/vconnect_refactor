import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {
  Button,
  CheckOption,
  FocusAwareStatusBar,
  Divider,
} from '../../../../components';

const Container = styled(SafeAreaView)`
  background: #fff;
  flex: 1;
`;

const ScrollContainer = styled(ScrollView)`
  flex: 1;
`;

const ButtonContainer = styled(View)`
  margin-bottom: 65px;
  width: 100%;
`;

const ButtonsRow = styled(View)`
  flex-direction: row;
  justify-content: space-evenly;
  padding: 16px;
`;

const StyledButton = styled(Button)`
  align-items: center;
  height: 48px;
  justify-content: center;
  width: 156px;

  ${(props) =>
    props.mode === 'outlined' &&
    !props.disabled &&
    css`
      border-color: #00a0d1;
      border-width: 1px;
    `}
`;

const ViewAllScreen = ({ route }) => {
  const [modelsList] = useState(route.params.modelsListParam);
  const [models, setModels] = useState(route.params.modelsParam);
  const [changed, setChanged] = useState(false);
  const { t } = useTranslation();
  const navigation = useNavigation();

  useEffect(() => {
    setChanged(_.xor(route.params.modelsParam, models).length !== 0);
  }, [route.params, models]);

  const onApply = () =>
    navigation.navigate('FilterScreen', {
      modelsListParam: models,
    });

  return (
    <>
      <FocusAwareStatusBar height={0} />
      <Container edges={['right', 'bottom', 'left']}>
        <ScrollContainer bounces={false}>
          {modelsList.map((model) => (
            <CheckOption
              key={model}
              onPress={() => setModels(_.xor(models, [model]))}
              isSelected={models.includes(model)}
            >
              {model}
            </CheckOption>
          ))}
        </ScrollContainer>
        <ButtonContainer>
          <Divider />
          <ButtonsRow>
            <StyledButton
              mode="outlined"
              disabled={models.length === 0}
              onPress={() => setModels([])}
              color="#00A0D1"
            >
              {t('clear')}
            </StyledButton>
            <StyledButton
              mode="contained"
              color="#00447a"
              disabled={!changed}
              onPress={onApply}
            >
              {t('apply')}
            </StyledButton>
          </ButtonsRow>
        </ButtonContainer>
      </Container>
    </>
  );
};

ViewAllScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      modelsListParam: PropTypes.arrayOf(PropTypes.string).isRequired,
      modelsParam: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
  }).isRequired,
};

export default ViewAllScreen;
