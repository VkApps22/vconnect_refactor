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
import styled from 'styled-components';
import { styled as materialStyled } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import AddFamilyModal from './AddFamilyModal';
import { fetchFamilySuggestions } from '../../../../../store/model';
import { useDynamicTranslation } from '../../../../../hooks/dynamic-translation';

const CustomAutoComplete = materialStyled(Autocomplete)({
  marginRight: 24,
  width: 600,
});

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

const NameFamily = ({
  familyName,
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
    setQuery(familyName ? dt(familyName.family) : '');
  }, [dt, familyName]);

  useEffect(() => {
    let mounted = true;
    dispatch(
      fetchFamilySuggestions({
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
      <InputLabel>{t('name-of-family')}</InputLabel>
      <NameInputs>
        <CustomAutoComplete
          options={options}
          getOptionLabel={(option) => dt(option.family)}
          getOptionSelected={(option, value) =>
            option && value && option.familyKey === value.familyKey
          }
          onBlur={onBlur}
          inputValue={query}
          name="familyName"
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
                name="familyName"
                placeholder={t('ex-flexomax-gbn')}
                variant="outlined"
              />
              <FormHelperText error={touched.familyName && !!errors.familyName}>
                {touched.familyName && errors.familyName
                  ? t(errors.familyName.familyKey || errors.familyName)
                  : t('tell-which-family-the-item-you-want-to-add-belongs-to')}
              </FormHelperText>
            </>
          )}
        />
        <CustomButton
          variant="contained"
          color="primary"
          onClick={() => setOpenModal({ state: true, mode: 'add' })}
        >
          <Add />
        </CustomButton>
        <AddFamilyModal
          open={openModal}
          familyName={familyName}
          setFamilyName={handleChange}
          handleClose={() => {
            setOpenModal({ state: false, mode: 'add' });
            setTimeout(() => onBlur());
          }}
        />
      </NameInputs>
    </div>
  );
};

NameFamily.propTypes = {
  familyName: PropTypes.shape({
    familyKey: PropTypes.string.isRequired,
    family: PropTypes.arrayOf(
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

NameFamily.defaultProps = {
  familyName: undefined,
};

export default NameFamily;
