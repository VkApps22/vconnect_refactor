import React, { useState } from 'react';
import {
  TextField,
  InputLabel,
  Button,
  FormHelperText,
  styled as materialStyled,
  Typography,
  Icon,
  InputAdornment,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Add } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Formik } from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types';

import SectionsList from './SectionsList';
import AddSectionModal from './AddSectionModal';

const AddSectionButton = materialStyled(Button)({
  fontWeight: 'bold',
  fontSize: 16,
  textTransform: 'none',
  letterSpacing: 1.25,
  height: 48,
  marginTop: 24,
});

const SectionContainer = styled.div`
  margin: 24px 24px 0 0;
`;

const PageContainer = styled.div`
  margin-right: 8px;
  margin-top: 24px;
`;

const FieldsContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`;

const SectionsBox = styled.div`
  border: 1px solid #e6e9ed;
  border-radius: 8px;
  padding: 32px 79px;
`;

const SectionDescription = materialStyled(FormHelperText)({
  paddingLeft: 0,
});

const CustomAutoComplete = materialStyled(Autocomplete)({
  width: 369,
});

const SectionTitle = materialStyled(Typography)({
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: 22,
});

const PageField = materialStyled(TextField)({
  width: 133,
});

const CreateSectionButton = styled.button`
  align-items: center;
  background: none;
  border: none;
  display: flex;
  font-size: 16px;
  height: 100%;
  justify-content: flex-start;
  padding: 0;
  width: 100%;

  span {
    margin-right: 13px;
  }
`;

const CustomOption = styled.div`
  align-items: center;
  display: flex;
  span {
    margin-right: 13px;
  }
`;

const sectionsTempArray = {
  en: [
    { title: 'Installation', icon: 'description' },
    { title: 'Maintenance', icon: 'build' },
    { title: 'Operation', icon: 'settings' },
    { title: '', type: 'button' },
  ],
  pt: [
    { title: 'Instalação', icon: 'description' },
    { title: 'Manutenção', icon: 'build' },
    { title: 'Operação', icon: 'settings' },
    { title: '', type: 'button' },
  ],
  es: [
    { title: 'Instalación', icon: 'description' },
    { title: 'Mantenimiento', icon: 'build' },
    { title: 'Operación', icon: 'settings' },
    { title: '', type: 'button' },
  ],
};

const SectionField = ({
  disabled,
  language,
  sections,
  addSection,
  updateSection,
  removeSection,
  // eslint-disable-next-line sonarjs/cognitive-complexity
}) => {
  const { t } = useTranslation();
  const [openCreateSectionModal, setOpenCreateSectionModal] = useState({
    state: false,
    language,
  });

  const sectionSchema = yup.object().shape({
    page: yup
      .number()
      .typeError(t('must-be-a-number'))
      .min(0, t('must-be-greater-then-or-equal-to-0'))
      .required(t('required-field')),
    section: yup
      .object()
      .shape({
        title: yup.string().required(t('required-field')),
        icon: yup.string().required(t('required-field')),
      })
      .required(t('required-field'))
      .test(
        'duplicatedSection',
        t('section-already-added'),
        (value) => !sections.find((section) => section.title === value.title)
      ),
  });

  return (
    <SectionsBox disabled={disabled}>
      <SectionTitle color={disabled ? 'textSecondary' : 'textPrimary'}>
        {t('add-bookmarks-in-the-language-manual', { language: t(language) })}
      </SectionTitle>
      <SectionDescription>
        {t(
          'add-a-specific-section-and-the-respective-manual-page-where-it-starts'
        )}
      </SectionDescription>
      <Formik
        initialValues={{ section: {}, page: '' }}
        onSubmit={(values, { resetForm }) => {
          addSection(
            values.section.title,
            values.section.icon,
            parseInt(values.page, 10)
          );
          resetForm();
        }}
        validationSchema={sectionSchema}
      >
        {({ values, errors, handleChange, setFieldValue, handleSubmit }) => (
          <>
            <FieldsContainer>
              <SectionContainer>
                <InputLabel disabled={disabled}>{t('section')}</InputLabel>
                <CustomAutoComplete
                  options={sectionsTempArray[language]}
                  disabled={disabled}
                  freeSolo
                  disableClearable
                  filterOptions={() => sectionsTempArray[language]}
                  filterSelectedOptions={false}
                  forcePopupIcon
                  getOptionLabel={(option) => option.title}
                  getOptionSelected={(option, value) =>
                    option &&
                    option.type !== 'button' &&
                    value &&
                    option.title === value.title
                  }
                  inputValue={
                    values.section && values.section.title
                      ? values.section.title
                      : ''
                  }
                  onChange={(_, newValue) => {
                    if (newValue && newValue.type === 'button') {
                      setFieldValue('section', '', true);
                      return setOpenCreateSectionModal({
                        state: true,
                        language,
                      });
                    }
                    return !newValue
                      ? setFieldValue('section', {}, true)
                      : setFieldValue('section', newValue, true);
                  }}
                  renderOption={(option) =>
                    option.type === 'button' ? (
                      <CreateSectionButton
                        type="button"
                        onClick={() =>
                          setOpenCreateSectionModal({
                            state: true,
                            language,
                          })
                        }
                      >
                        <Icon color="action">add</Icon>
                        {t('create-new-section')}
                      </CreateSectionButton>
                    ) : (
                      <CustomOption>
                        <Icon color="action">{option.icon}</Icon>
                        {option.title}
                      </CustomOption>
                    )
                  }
                  renderInput={(params) => (
                    <>
                      <TextField
                        {...params}
                        placeholder={t('ex-maintenance')}
                        variant="outlined"
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <InputAdornment position="start">
                              {values.section && values.section.icon ? (
                                <Icon color="secondary">
                                  {values.section.icon}
                                </Icon>
                              ) : (
                                <Icon color="action">build</Icon>
                              )}
                            </InputAdornment>
                          ),
                        }}
                      />
                      <FormHelperText error={!!errors.section}>
                        {errors.section &&
                        (errors.section ||
                          errors.section.title ||
                          errors.section.icon)
                          ? errors.section.title ||
                            errors.section.icon ||
                            errors.section
                          : t('insert-the-desired-manual-section')}
                      </FormHelperText>
                    </>
                  )}
                />
              </SectionContainer>
              <PageContainer>
                <InputLabel disabled={disabled}>{t('page')}</InputLabel>
                <PageField
                  variant="outlined"
                  disabled={disabled}
                  value={values.page}
                  onChange={handleChange('page')}
                  placeholder={t('ex-68')}
                />
                <FormHelperText error={!!errors.page}>
                  {errors.page ? errors.page : t('initial-page')}
                </FormHelperText>
              </PageContainer>
            </FieldsContainer>
            <AddSectionButton
              variant="contained"
              onClick={handleSubmit}
              disabled={disabled}
              color="secondary"
            >
              <Add /> {t('add-section')}
            </AddSectionButton>
            <AddSectionModal
              open={openCreateSectionModal}
              handleClose={() =>
                setOpenCreateSectionModal({ state: false, language })
              }
              handleUpdate={(newValue) =>
                setFieldValue('section', newValue, true)
              }
            />
          </>
        )}
      </Formik>
      <SectionsList
        disabled={disabled}
        sections={sections}
        updateSection={updateSection}
        removeSection={removeSection}
      />
    </SectionsBox>
  );
};

SectionField.propTypes = {
  disabled: PropTypes.bool.isRequired,
  language: PropTypes.string.isRequired,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      title: PropTypes.string,
      page: PropTypes.number,
    })
  ),
  addSection: PropTypes.func.isRequired,
  updateSection: PropTypes.func.isRequired,
  removeSection: PropTypes.func.isRequired,
};

SectionField.defaultProps = {
  sections: [],
};

export default SectionField;
