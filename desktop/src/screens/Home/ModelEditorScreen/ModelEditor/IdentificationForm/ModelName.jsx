import { useTranslation } from 'react-i18next';
import { FormHelperText, InputLabel, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { styled as materialStyled } from '@material-ui/core/styles';

const ModelField = materialStyled(TextField)({
  width: 450,
});

const ModelName = ({
  modelName,
  handleChange,
  errors,
  onBlur,
  touched,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <div {...props}>
      <InputLabel>{t('name-of-model')}</InputLabel>
      <ModelField
        value={modelName}
        name="modelName"
        onBlur={onBlur}
        onChange={handleChange}
        placeholder={t('ex-gsnd-tb')}
        variant="outlined"
      />
      <FormHelperText error={touched.modelName && !!errors.modelName}>
        {touched.modelName && errors.modelName
          ? errors.modelName
          : t('the-model-of-the-item-you-want-to-add')}
      </FormHelperText>
    </div>
  );
};

ModelName.propTypes = {
  modelName: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(PropTypes.any).isRequired,
  onBlur: PropTypes.func.isRequired,
  touched: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ModelName;
