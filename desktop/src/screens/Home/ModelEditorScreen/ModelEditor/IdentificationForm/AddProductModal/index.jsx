import React from 'react';
import {
  Button,
  Modal,
  styled as materialStyled,
  Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Formik } from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import ProductField from './ProductField';

const CustomModal = materialStyled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
});

const ModalContainer = styled.div`
  background: #f3f3f3;
  border: 1px solid #f3f3f3;
  border-radius: 8px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 40px;

  &:focus {
    outline: none;
  }
`;

const FieldsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 24px;
  margin-top: 40px;

  div:first-child {
    margin-right: 84px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 40px;

  button:first-child {
    margin-right: 24px;
  }
`;

const CustomButton = materialStyled(Button)({
  width: 212,
  height: 56,
  fontWeight: 'bold',
  letterSpacing: 1.25,
});

const AddProductModal = ({
  open,
  handleClose,
  productName,
  setProductName,
  ...props
}) => {
  const { t } = useTranslation();

  const productSchema = yup.object().shape({
    namePortuguese: yup
      .string()
      .required(t('required-field'))
      .max(25, t('maximum-allowed-length-is-n-characters', { n: 25 })),
    nameEnglish: yup
      .string()
      .required(t('required-field'))
      .max(25, t('maximum-allowed-length-is-n-characters', { n: 25 })),
    nameSpanish: yup
      .string()
      .required(t('required-field'))
      .max(25, t('maximum-allowed-length-is-n-characters', { n: 25 })),
  });

  const initialPortugueseValue = productName
    ? productName.name.find((m) => m.language === 'pt')
    : undefined;
  const initialEnglishValue = productName
    ? productName.name.find((m) => m.language === 'en')
    : undefined;
  const initialSpanishValue = productName
    ? productName.name.find((m) => m.language === 'es')
    : undefined;

  return (
    <CustomModal open={open.state} onClose={handleClose} {...props}>
      <ModalContainer>
        <Typography variant="h6">{t('enter-the-product-name')}</Typography>
        <Formik
          initialValues={{
            namePortuguese: initialPortugueseValue
              ? initialPortugueseValue.value
              : '',
            nameEnglish: initialEnglishValue ? initialEnglishValue.value : '',
            nameSpanish: initialSpanishValue ? initialSpanishValue.value : '',
          }}
          validationSchema={productSchema}
          onSubmit={(values) => {
            setProductName({
              nameKey: values.nameEnglish
                .toLowerCase()
                .trim()
                .replace(/\s+/, '_'),
              name: [
                {
                  language: 'pt',
                  value: values.namePortuguese,
                },
                {
                  language: 'en',
                  value: values.nameEnglish,
                },
                {
                  language: 'es',
                  value: values.nameSpanish,
                },
              ],
            });
            handleClose();
          }}
        >
          {({ values, errors, handleChange, handleSubmit, isValid }) => (
            <>
              <FieldsContainer>
                <ProductField
                  label={t('name-of-product-in-portuguese')}
                  placeholder={t('ex-flexible-coupling')}
                  helperText={
                    errors.namePortuguese
                      ? errors.namePortuguese
                      : t(
                          'which-product-does-the-item-you-want-to-add-belong-to'
                        )
                  }
                  value={values.namePortuguese}
                  error={!!errors.namePortuguese}
                  name="namePortuguese"
                  onChange={handleChange}
                />
                <ProductField
                  label={t('name-of-product-in-english')}
                  placeholder={t('ex-flexible-coupling')}
                  helperText={
                    errors.nameEnglish
                      ? errors.nameEnglish
                      : t(
                          'which-product-does-the-item-you-want-to-add-belong-to'
                        )
                  }
                  value={values.nameEnglish}
                  error={!!errors.nameEnglish}
                  name="nameEnglish"
                  onChange={handleChange}
                />
              </FieldsContainer>
              <ProductField
                label={t('name-of-product-in-spanish')}
                placeholder={t('ex-flexible-coupling')}
                helperText={
                  errors.nameSpanish
                    ? errors.nameSpanish
                    : t('which-product-does-the-item-you-want-to-add-belong-to')
                }
                value={values.nameSpanish}
                error={!!errors.nameSpanish}
                name="nameSpanish"
                onChange={handleChange}
              />
              <ButtonContainer>
                <CustomButton variant="outlined" onClick={handleClose}>
                  {t('cancel')}
                </CustomButton>
                <CustomButton
                  variant="contained"
                  color="primary"
                  disabled={!isValid}
                  onClick={handleSubmit}
                >
                  {t('apply')}
                </CustomButton>
              </ButtonContainer>
            </>
          )}
        </Formik>
      </ModalContainer>
    </CustomModal>
  );
};

AddProductModal.propTypes = {
  productName: PropTypes.shape({
    nameKey: PropTypes.string.isRequired,
    name: PropTypes.arrayOf(
      PropTypes.shape({
        language: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      })
    ),
  }),
  setProductName: PropTypes.func.isRequired,
  open: PropTypes.shape({
    state: PropTypes.bool,
  }).isRequired,
  handleClose: PropTypes.func.isRequired,
};

AddProductModal.defaultProps = {
  productName: undefined,
};

export default AddProductModal;
