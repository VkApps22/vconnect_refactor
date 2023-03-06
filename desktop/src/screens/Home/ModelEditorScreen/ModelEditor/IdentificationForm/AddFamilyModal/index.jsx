import React from 'react';
import {
  Button,
  Modal,
  styled as materialStyled,
  Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import FamilyField from './FamilyField';

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

const AddFamilyModal = ({
  open,
  handleClose,
  familyName,
  setFamilyName,
  ...props
}) => {
  const { t } = useTranslation();

  const familySchema = yup.object().shape({
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

  const initialPortugueseValue = familyName
    ? familyName.family.find((m) => m.language === 'pt')
    : undefined;
  const initialEnglishValue = familyName
    ? familyName.family.find((m) => m.language === 'en')
    : undefined;
  const initialSpanishValue = familyName
    ? familyName.family.find((m) => m.language === 'es')
    : undefined;

  return (
    <CustomModal open={open.state} onClose={handleClose} {...props}>
      <ModalContainer>
        <Typography variant="h6">{t('enter-the-family-name')}</Typography>
        <Formik
          initialValues={{
            namePortuguese: initialPortugueseValue
              ? initialPortugueseValue.value
              : '',
            nameEnglish: initialEnglishValue ? initialEnglishValue.value : '',
            nameSpanish: initialSpanishValue ? initialSpanishValue.value : '',
          }}
          validationSchema={familySchema}
          onSubmit={(values) => {
            setFamilyName({
              familyKey: values.nameEnglish
                .toLowerCase()
                .trim()
                .replace(/\s+/, '_'),
              family: [
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
                <FamilyField
                  label={t('name-of-family-in-portuguese')}
                  placeholder={t('ex-flexomax-gbn')}
                  helperText={
                    errors.namePortuguese
                      ? errors.namePortuguese
                      : t(
                          'which-family-does-the-item-you-want-to-add-belong-to'
                        )
                  }
                  error={!!errors.namePortuguese}
                  value={values.namePortuguese}
                  name="namePortuguese"
                  onChange={handleChange}
                />
                <FamilyField
                  label={t('name-of-family-in-english')}
                  placeholder={t('ex-flexomax-gbn')}
                  helperText={
                    errors.nameEnglish
                      ? errors.nameEnglish
                      : t(
                          'which-family-does-the-item-you-want-to-add-belong-to'
                        )
                  }
                  value={values.nameEnglish}
                  error={!!errors.nameEnglish}
                  name="nameEnglish"
                  onChange={handleChange}
                />
              </FieldsContainer>
              <FieldsContainer>
                <FamilyField
                  label={t('name-of-family-in-spanish')}
                  placeholder={t('ex-flexomax-gbn')}
                  helperText={
                    errors.nameSpanish
                      ? errors.nameSpanish
                      : t(
                          'which-family-does-the-item-you-want-to-add-belong-to'
                        )
                  }
                  error={!!errors.nameSpanish}
                  value={values.nameSpanish}
                  name="nameSpanish"
                  onChange={handleChange}
                />
              </FieldsContainer>
              <ButtonContainer>
                <CustomButton variant="outlined" onClick={handleClose}>
                  {t('cancel')}
                </CustomButton>
                <CustomButton
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={!isValid}
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

AddFamilyModal.propTypes = {
  open: PropTypes.shape({
    state: PropTypes.bool,
  }).isRequired,
  handleClose: PropTypes.func.isRequired,
  familyName: PropTypes.shape({
    familyKey: PropTypes.string.isRequired,
    family: PropTypes.arrayOf(
      PropTypes.shape({
        language: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      })
    ),
  }),
  setFamilyName: PropTypes.func.isRequired,
};

AddFamilyModal.defaultProps = {
  familyName: undefined,
};

export default AddFamilyModal;
