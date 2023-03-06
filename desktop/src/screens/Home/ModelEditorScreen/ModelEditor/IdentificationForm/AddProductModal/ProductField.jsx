import { FormHelperText, InputLabel, OutlinedInput } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { styled as materialStyled } from '@material-ui/core/styles';

const ProductFieldContainer = styled.div``;

const FieldInput = materialStyled(OutlinedInput)({
  width: 380,
});

const ProductField = ({
  value,
  name,
  onChange,
  label,
  placeholder,
  helperText,
  error,
  ...props
}) => {
  return (
    <ProductFieldContainer {...props}>
      <InputLabel>{label}</InputLabel>
      <FieldInput
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </ProductFieldContainer>
  );
};

ProductField.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  helperText: PropTypes.string.isRequired,
  error: PropTypes.bool,
};

ProductField.defaultProps = {
  error: false,
};

export default ProductField;
