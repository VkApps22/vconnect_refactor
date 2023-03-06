import React from 'react';
import {
  OutlinedInput,
  InputLabel,
  Button,
  FormHelperText,
  styled as materialStyled,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputAdornment,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { CheckCircleRounded, Error } from '@material-ui/icons';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import SectionField from './SectionField';

const ManualContainer = styled.div`
  margin-bottom: 32px;
`;

const CustomFormControl = materialStyled(FormControl)({
  alignItems: 'flex-start',
  display: 'flex',
  flexDirection: 'row',
});

const CustomButton = materialStyled(Button)({
  height: 56,
  width: 369,
  fontWeight: 'bold',
});

const ManualField = materialStyled(OutlinedInput)({
  width: 450,
  marginRight: 24,
});

const ManualForm = ({
  manuals,
  setFieldValue,
  errors,
  touched,
  setFieldTouched,
  ...props
}) => {
  const { t } = useTranslation();

  const handleChangeFile = (language, file) => {
    const updatedManuals = manuals.map((element) =>
      element.manual.language === language
        ? { ...element, manual: { ...element.manual, file } }
        : element
    );
    setFieldValue('manuals', updatedManuals, true);
    setTimeout(() => setFieldTouched('manuals', true));
  };

  const handleAddSection = (language, section) => {
    const updatedManuals = manuals.map((element) =>
      element.manual.language === language
        ? {
            ...element,
            manual: {
              ...element.manual,
              sections: [...element.manual.sections, section],
            },
          }
        : element
    );

    setFieldValue('manuals', updatedManuals);
  };

  const handleUpdateSection = (language, section, updatedSection) => {
    const updatedManuals = manuals.map((element) =>
      element.manual.language === language
        ? {
            ...element,
            manual: {
              ...element.manual,
              sections: [
                ...element.manual.sections.map((item) =>
                  item.title === section.title ? updatedSection : item
                ),
              ],
            },
          }
        : element
    );

    setFieldValue('manuals', updatedManuals);
  };

  const handleRemoveSection = (language, section) => {
    const updatedManuals = manuals.map((element) =>
      element.manual.language === language
        ? {
            ...element,
            manual: {
              ...element.manual,
              sections: [
                ...element.manual.sections.filter(
                  (item) => item.title !== section.title
                ),
              ],
            },
          }
        : element
    );

    setFieldValue('manuals', updatedManuals);
  };

  const handleChangeFileClick = (language) => {
    document.getElementById(`form-manual-file-input-${language}`).click();
  };

  const handleFileFieldEndAdornment = (file, error) => {
    if (file) {
      return (
        <InputAdornment>
          {error ? (
            <Error htmlColor="#B00020" />
          ) : (
            <CheckCircleRounded htmlColor="#1FA83D" />
          )}
        </InputAdornment>
      );
    }
    return <></>;
  };

  return (
    <div {...props}>
      {manuals.map(({ manual, hasManual }, index) => (
        <ManualContainer key={manual.language}>
          <InputLabel disabled={!hasManual}>
            {t('manual-in-language', { language: t(manual.language) })}
          </InputLabel>
          <CustomFormControl id="file-form-control">
            <div>
              <input
                id={`form-manual-file-input-${manual.language}`}
                disabled={!hasManual}
                hidden
                onChange={(e) => {
                  if (e.target.files.length > 0) {
                    return handleChangeFile(manual.language, e.target.files[0]);
                  }
                  return handleChangeFile(manual.language, undefined);
                }}
                multiple={false}
                accept=".pdf"
                type="file"
              />
              <ManualField
                variant="outlined"
                value={manual.file ? manual.file.name : ''}
                disabled={!hasManual}
                onDrop={(e) => {
                  e.preventDefault();
                  handleChangeFile(manual.language, e.dataTransfer.files[0]);
                }}
                endAdornment={handleFileFieldEndAdornment(
                  manual.file,
                  !!(
                    touched &&
                    touched.manuals &&
                    errors.manuals &&
                    errors.manuals[index] &&
                    errors.manuals[index].manual
                  )
                )}
                contentEditable={false}
                inputProps={
                  manual.file && manual.file.link
                    ? {
                        style: {
                          fontSize: 16,
                          textDecoration: 'underline',
                          color: '#00447a',
                        },
                      }
                    : {}
                }
                onClick={() =>
                  manual.file && manual.file.link
                    ? window.open(manual.file.link, '_blank')
                    : handleChangeFileClick(manual.language)
                }
              />
              <FormHelperText
                error={
                  !!(
                    touched &&
                    touched.manuals &&
                    errors.manuals &&
                    errors.manuals[index] &&
                    errors.manuals[index].manual
                  )
                }
                disabled={!hasManual}
              >
                {touched &&
                touched.manuals &&
                errors.manuals &&
                errors.manuals[index] &&
                errors.manuals[index].manual
                  ? errors.manuals[index].manual.file
                  : t('insert-a-file-in-pdf-format')}
              </FormHelperText>
            </div>
            <CustomButton
              onClick={() => handleChangeFileClick(manual.language)}
              disabled={!hasManual}
              variant="contained"
              color="primary"
            >
              {t('choose-file')}
            </CustomButton>
          </CustomFormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={!hasManual}
                onClick={() => {
                  const updatedManuals = manuals.map((x) =>
                    x.manual.language === manual.language
                      ? { ...x, hasManual: !hasManual }
                      : x
                  );

                  setFieldValue('manuals', updatedManuals);
                  setTimeout(() => setFieldTouched('manuals', true));
                }}
              />
            }
            label={t('this-model-does-not-have-a-manual-in-language', {
              language: t(manual.language),
            })}
          />
          <SectionField
            disabled={!hasManual}
            sections={manual.sections}
            addSection={(title, icon, page) =>
              handleAddSection(manual.language, { title, icon, page })
            }
            updateSection={(section, updatedSection) =>
              handleUpdateSection(manual.language, section, updatedSection)
            }
            removeSection={(section) =>
              handleRemoveSection(manual.language, section)
            }
            language={manual.language}
          />
        </ManualContainer>
      ))}
    </div>
  );
};

ManualForm.propTypes = {
  manuals: PropTypes.arrayOf(
    PropTypes.shape({
      hasManual: PropTypes.bool,
      manual: PropTypes.shape({
        file: PropTypes.objectOf(PropTypes.any),
        language: PropTypes.string,
        sections: PropTypes.arrayOf(
          PropTypes.shape({
            icon: PropTypes.string,
            title: PropTypes.string,
            page: PropTypes.number,
          })
        ),
      }),
    })
  ).isRequired,
  setFieldValue: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(PropTypes.any).isRequired,
  touched: PropTypes.objectOf(PropTypes.any).isRequired,
  setFieldTouched: PropTypes.func.isRequired,
};

export default ManualForm;
