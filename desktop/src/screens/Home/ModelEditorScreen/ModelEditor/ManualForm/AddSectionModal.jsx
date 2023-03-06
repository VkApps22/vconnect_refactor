import React from 'react';
import {
  Modal,
  styled as materialStyled,
  Typography,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Button,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as yup from 'yup';

import IconPicker from './IconPicker';

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
  width: 630px;

  &:focus {
    outline: none;
  }
`;

const FieldsContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  margin: 40px 0;

  > div:first-child {
    margin-right: 25px;
  }
`;

const SectionNameContainer = styled.div``;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  button:first-child {
    margin-right: 24px;
  }
`;

const CustomButton = materialStyled(Button)({
  width: 212,
  height: 56,
  fontWeight: 'bold',
});

const SectionNameField = materialStyled(OutlinedInput)({
  width: 380,
});

const SectionName = ({ value, handleChange, language, errors }) => {
  const { t } = useTranslation();
  return (
    <SectionNameContainer>
      <InputLabel>
        {t('section-name-in-language', { language: t(language) })}
      </InputLabel>
      <SectionNameField
        name="sectionName"
        value={value}
        onChange={handleChange}
        placeholder={t('ex-maintenance')}
      />
      <FormHelperText error={!!errors.sectionName}>
        {errors.sectionName
          ? errors.sectionName
          : t('section-name-in-language-manual', { language: t(language) })}
      </FormHelperText>
    </SectionNameContainer>
  );
};

SectionName.propTypes = {
  value: PropTypes.string.isRequired,
  errors: PropTypes.objectOf(PropTypes.any).isRequired,
  handleChange: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
};

const AddSectionModal = ({ open, handleClose, handleUpdate, ...props }) => {
  const { t } = useTranslation();

  const sectionSchema = yup.object().shape({
    sectionName: yup
      .string()
      .required(t('required-field'))
      .max(25, t('maximum-allowed-length-is-n-characters', { n: 25 })),
    sectionIcon: yup.string().required(t('required-field')),
  });

  return (
    <CustomModal open={open.state} onClose={handleClose} {...props}>
      <ModalContainer>
        <Typography variant="h6">{t('create-new-section')}</Typography>
        <Formik
          initialValues={{
            sectionName: '',
            sectionIcon: '',
          }}
          validationSchema={sectionSchema}
          onSubmit={(value) => {
            handleUpdate({
              icon: value.sectionIcon,
              title: value.sectionName,
            });
            handleClose();
          }}
        >
          {({ values, handleChange, isValid, handleSubmit, errors }) => (
            <>
              <FieldsContainer>
                <SectionName
                  value={values.sectionName}
                  handleChange={handleChange}
                  language={open.language}
                  errors={errors}
                />
                <IconPicker
                  iconSelected={values.sectionIcon}
                  handleChange={handleChange}
                />
              </FieldsContainer>
              <ButtonsContainer>
                <CustomButton variant="outlined" onClick={handleClose}>
                  {t('cancel')}
                </CustomButton>
                <CustomButton
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={!isValid}
                >
                  {t('create')}
                </CustomButton>
              </ButtonsContainer>
            </>
          )}
        </Formik>
      </ModalContainer>
    </CustomModal>
  );
};

AddSectionModal.propTypes = {
  open: PropTypes.shape({
    state: PropTypes.bool.isRequired,
    language: PropTypes.string,
  }).isRequired,
  handleClose: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
};

export default AddSectionModal;
