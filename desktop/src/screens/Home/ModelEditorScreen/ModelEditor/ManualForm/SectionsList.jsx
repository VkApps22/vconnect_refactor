import React from 'react';
import {
  TextField,
  InputLabel,
  FormHelperText,
  styled as materialStyled,
  Icon,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import { DeleteOutline } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Autocomplete } from '@material-ui/lab';

const DeleteIconButton = materialStyled(IconButton)({
  marginTop: 22,
});

const FieldsContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`;

const SectionContainer = styled.div`
  margin: 24px 24px 0 0;
`;

const CustomAutoComplete = materialStyled(Autocomplete)({
  width: 369,
});

const CustomOption = styled.div`
  align-items: center;
  display: flex;
  span {
    margin-right: 13px;
  }
`;

const PageContainer = styled.div`
  margin-right: 8px;
  margin-top: 24px;
`;

const PageField = materialStyled(TextField)({
  width: 133,
});

const sectionsTempArray = [
  { title: 'Instalação', icon: 'description' },
  { title: 'Manutenção', icon: 'build' },
  { title: 'Operação', icon: 'settings' },
];

const SectionsList = ({ sections, disabled, updateSection, removeSection }) => {
  const { t } = useTranslation();

  return sections.map((section) => (
    <FieldsContainer disabled={disabled} key={section.title + section.icon}>
      <SectionContainer>
        <InputLabel disabled={disabled}>{t('section')}</InputLabel>
        <CustomAutoComplete
          disabled={disabled}
          freeSolo
          options={sectionsTempArray}
          getOptionSelected={(option, value) => option.title === value.title}
          getOptionLabel={(option) => option.title}
          value={{ title: section.title, icon: section.icon }}
          inputValue={section.title}
          disableClearable
          filterOptions={() => sectionsTempArray}
          filterSelectedOptions={false}
          onChange={(_, newValue) =>
            updateSection(section, { ...newValue, page: section.page })
          }
          renderOption={(option) => (
            <CustomOption>
              <Icon color="action">{option.icon}</Icon>
              {option.title}
            </CustomOption>
          )}
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
                      {section ? (
                        <Icon color="secondary">{section.icon}</Icon>
                      ) : (
                        <Icon color="action">build</Icon>
                      )}
                    </InputAdornment>
                  ),
                }}
              />
              <FormHelperText>
                {t('insert-the-desired-manual-section')}
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
          value={section.page}
          onChange={(e) =>
            updateSection(section, { ...section, page: e.target.value })
          }
          placeholder={t('ex-68')}
        />
        <FormHelperText>{t('initial-page')}</FormHelperText>
      </PageContainer>
      <DeleteIconButton
        disabled={disabled}
        onClick={() => removeSection(section)}
      >
        <DeleteOutline />
      </DeleteIconButton>
    </FieldsContainer>
  ));
};

export default SectionsList;
