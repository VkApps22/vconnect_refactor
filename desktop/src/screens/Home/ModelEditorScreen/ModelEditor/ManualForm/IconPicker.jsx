import React from 'react';
import {
  InputLabel,
  Select,
  InputAdornment,
  styled as materialStyled,
  IconButton,
  Icon,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SectionIconContainer = styled.div``;

const ListOfIcons = [
  'description',
  'settings',
  'build',
  'phone',
  'share',
  'audiotrack',
  'eco',
  'apartment',
  'brush',
  'explore',
  'attachment',
  'room',
];

const CustomSelect = materialStyled(Select)({
  width: 88,
  height: 55,
});

const CustomIconButton = materialStyled(IconButton)({
  color: '#000000',
});

const IconPicker = ({ iconSelected, handleChange }) => {
  const { t } = useTranslation();

  return (
    <SectionIconContainer>
      <InputLabel>{t('section-icon')}</InputLabel>
      <CustomSelect
        variant="outlined"
        startAdornment={
          <InputAdornment position="start">
            {iconSelected ? (
              <Icon color="secondary">{iconSelected}</Icon>
            ) : (
              <Icon color="action">apps</Icon>
            )}
          </InputAdornment>
        }
        value=""
        name="sectionIcon"
        onChange={handleChange}
      >
        {ListOfIcons.map((value) => (
          <CustomIconButton key={value} value={value}>
            <Icon>{value}</Icon>
          </CustomIconButton>
        ))}
      </CustomSelect>
    </SectionIconContainer>
  );
};

IconPicker.propTypes = {
  iconSelected: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default IconPicker;
