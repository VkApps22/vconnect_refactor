import React from 'react';
import styled, { css } from 'styled-components/native';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import { Button, Divider } from '../../../../components';

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
  width: 40%;

  ${(props) =>
    props.mode === 'outlined' &&
    !props.disabled &&
    css`
      border-color: #00a0d1;
      border-width: 1px;
    `}
`;

const FooterView = ({ disabled, onPressClear, onPressFilter }) => {
  const { t } = useTranslation();

  return (
    <ButtonContainer>
      <Divider />
      <ButtonsRow>
        <StyledButton
          mode="outlined"
          disabled={disabled}
          onPress={onPressClear}
          color="#00A0D1"
        >
          {t('clear')}
        </StyledButton>
        <StyledButton
          mode="contained"
          disabled={disabled}
          onPress={onPressFilter}
          color="#00447a"
        >
          {t('search')}
        </StyledButton>
      </ButtonsRow>
    </ButtonContainer>
  );
};

FooterView.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onPressClear: PropTypes.func.isRequired,
  onPressFilter: PropTypes.func.isRequired,
};

export default FooterView;
