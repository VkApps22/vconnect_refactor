import { useTranslation } from 'react-i18next';
import { FormHelperText, InputLabel, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { styled as materialStyled } from '@material-ui/core/styles';

const ModelCodeField = materialStyled(TextField)({
  width: 450,
});

const ModelCode = ({
  modelCode,
  handleChange,
  errors,
  onBlur,
  touched,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <div {...props}>
      <InputLabel>{t('model-code')}</InputLabel>
      <ModelCodeField
        value={modelCode}
        name="modelCode"
        onBlur={onBlur}
        onChange={handleChange}
        placeholder={t('ex-model-code')}
        variant="outlined"
      />
      <FormHelperText error={touched.modelCode && !!errors.modelCode}>
        {touched.modelCode && errors.modelCode
          ? errors.modelCode
          : t('item-code-pattern-you-want-to-add')}
      </FormHelperText>
    </div>
  );
};

ModelCode.propTypes = {
  modelCode: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(PropTypes.any).isRequired,
  onBlur: PropTypes.func.isRequired,
  touched: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ModelCode;
