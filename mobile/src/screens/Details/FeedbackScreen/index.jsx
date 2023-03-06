import React from 'react';
import { Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import Icon from '@expo/vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useDynamicTranslation } from '../../../hooks/dynamic-translation';
import { FocusAwareStatusBar, TouchableDebounce } from '../../../components';
import FeedbackForm from './FeedbackForm';

const GradientContainer = styled(LinearGradient)`
  align-items: center;
  background: transparent;
  flex: 1;
  height: 100%;
  justify-content: flex-start;
`;

const CloseIcon = styled(Icon)`
  color: #fff;
`;

const StyledTouchableDebounce = styled(TouchableDebounce)`
  left: 21px;
  position: absolute;
  top: 45px;
  z-index: 2;
`;

const HeaderTitle = styled(Text)`
  color: ${(props) => props.theme.text.whiteMediumEmphasis};
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 24px;
  margin-bottom: 8px;
  margin-top: 80px;
  text-align: center;
`;

const ModelName = styled(Text)`
  color: ${(props) => props.theme.text.white};
  font-size: 16px;
  letter-spacing: 0.15px;
  line-height: 24px;
  margin-bottom: 41px;
  text-align: center;
`;

const FeedBackScreen = ({ navigation, route }) => {
  const { dt } = useDynamicTranslation();
  const { t } = useTranslation();

  const { model, family, manual } = route.params.model;

  return (
    <>
      <FocusAwareStatusBar height={0} backgroundColor="transparent" />
      <StyledTouchableDebounce
        hitSlop={{ top: 16, right: 16, bottom: 16, left: 16 }}
        onPress={() => navigation.goBack()}
      >
        <CloseIcon name="close" size={25} />
      </StyledTouchableDebounce>
      <GradientContainer
        start={{ x: 2, y: 0.2 }}
        end={{ x: 0, y: 0 }}
        colors={['#000000', '#00447A']}
      >
        <KeyboardAwareScrollView
          enableOnAndroid
          extraScrollHeight={70}
          bounces={false}
        >
          <HeaderTitle>{t('last-viewed-model')}</HeaderTitle>
          <ModelName>{`${dt(family)} - ${t('model')} ${dt(model)}`}</ModelName>
          <FeedbackForm manual={manual} navigation={navigation} />
        </KeyboardAwareScrollView>
      </GradientContainer>
    </>
  );
};

FeedBackScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      model: PropTypes.shape({
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
        manual: PropTypes.arrayOf(
          PropTypes.shape({
            language: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
          })
        ),
        model: PropTypes.string,
      }),
    }).isRequired,
    name: PropTypes.string,
  }).isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
};

export default FeedBackScreen;
