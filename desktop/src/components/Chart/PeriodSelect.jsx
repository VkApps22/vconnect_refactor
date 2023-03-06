import { useTranslation } from 'react-i18next';
import { MenuItem, Select } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { styled as materialStyled } from '@material-ui/core/styles';

const Container = materialStyled(Select)({
  height: 55,
});

const PeriodSelect = ({ period, setPeriod }) => {
  const { t } = useTranslation();

  return (
    <Container
      variant="outlined"
      value={period}
      onChange={(e) => setPeriod(e.target.value)}
    >
      <MenuItem value="all">{t('all')}</MenuItem>
      <MenuItem value="daily">{t('daily')}</MenuItem>
      <MenuItem value="monthly">{t('monthly')}</MenuItem>
      <MenuItem value="yearly">{t('yearly')}</MenuItem>
    </Container>
  );
};

PeriodSelect.propTypes = {
  period: PropTypes.string.isRequired,
  setPeriod: PropTypes.func.isRequired,
};

export default PeriodSelect;
