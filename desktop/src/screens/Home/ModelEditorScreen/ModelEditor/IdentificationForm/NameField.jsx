import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  FormHelperText,
  InputLabel,
  TextField,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { styled as materialStyled } from '@material-ui/core/styles';
import styled from 'styled-components';
import { Autocomplete } from '@material-ui/lab';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import AddProductModal from './AddProductModal';
import { fetchSuggestions } from '../../../../../store/model';
import { useDynamicTranslation } from '../../../../../hooks/dynamic-translation';

const CustomButton = materialStyled(Button)({
  height: 56,
  width: 56,
  minWidth: 56,
  padding: 0,
  marginRight: 24,
});

const NameInputs = styled.div`
  display: flex;
  flex-direction: row;
`;

const CustomAutoComplete = materialStyled(Autocomplete)({
  marginRight: 24,
  width: 600,
});

const NameField = ({
  productName,
  errors,
  handleChange,
  onBlur,
  touched,
  ...props
}) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const { dt } = useDynamicTranslation();
  const [openModal, setOpenModal] = useState({ state: false, mode: 'add' });
  const [query, setQuery] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setQuery(productName ? dt(productName.name) : '');
  }, [dt, productName]);

  useEffect(() => {
    let mounted = true;
    dispatch(
      fetchSuggestions({
        language: i18n.languages[0],
        query,
      })
    )
      .then(unwrapResult)
      .then((value) => mounted && setOptions(value));

    return () => {
      mounted = false;
    };
  }, [dispatch, i18n.languages, query]);

  return (
    <div {...props}>
      <InputLabel>{t('name-of-product')}</InputLabel>
      <NameInputs>
        <CustomAutoComplete
          options={options}
          getOptionLabel={(option) => dt(option.name)}
          getOptionSelected={(option, value) =>
            option && value && option.nameKey === value.nameKey
          }
          onBlur={onBlur}
          inputValue={query}
          name="productName"
          onChange={(_, newValue) => handleChange(newValue)}
          onInputChange={(_, newInputValue) => {
            setQuery(newInputValue);
            if (!newInputValue || newInputValue.length === 0) {
              handleChange(null);
              setTimeout(() => onBlur());
            }
          }}
          renderInput={(params) => (
            <>
              <TextField
                {...params}
                name="productName"
                placeholder={t('ex-flexible-coupling')}
                variant="outlined"
              />
              <FormHelperText
                error={touched.productName && !!errors.productName}
              >
                {touched.productName && errors.productName
                  ? t(errors.productName.nameKey || errors.productName)
                  : t('tell-which-product-the-item-you-want-to-add-belongs-to')}
              </FormHelperText>
            </>
          )}
        />
        <CustomButton
          onClick={() => setOpenModal({ state: true, mode: 'add' })}
          variant="contained"
          color="primary"
        >
          <Add />
        </CustomButton>
        <AddProductModal
          open={openModal}
          productName={productName}
          setProductName={handleChange}
          handleClose={() => {
            setOpenModal({ state: false, mode: 'add' });
            setTimeout(() => onBlur());
          }}
        />
      </NameInputs>
    </div>
  );
};

NameField.propTypes = {
  productName: PropTypes.shape({
    nameKey: PropTypes.string.isRequired,
    name: PropTypes.arrayOf(
      PropTypes.shape({
        language: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      })
    ),
  }),
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(PropTypes.any).isRequired,
  onBlur: PropTypes.func.isRequired,
  touched: PropTypes.objectOf(PropTypes.any).isRequired,
};

NameField.defaultProps = {
  productName: undefined,
};

export default NameField;
