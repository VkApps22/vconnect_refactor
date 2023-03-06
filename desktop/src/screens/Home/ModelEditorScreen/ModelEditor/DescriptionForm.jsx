import React, { useState } from 'react';
import {
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div``;

const MessagesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const maxDescriptionLength = 400;

const DescriptionComponent = ({
  language,
  value,
  handleOnBlur,
  errors,
  index,
  touched,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const { t } = useTranslation();

  return (
    <Container>
      <InputLabel>
        {t('model-description-in-language', { language: t(language) })}
      </InputLabel>
      <OutlinedInput
        multiline
        rows={4}
        fullWidth
        value={inputValue}
        onChange={(e) =>
          setInputValue(e.target.value.slice(0, maxDescriptionLength))
        }
        onBlur={handleOnBlur}
      />
      <MessagesContainer>
        <FormHelperText
          error={
            !!(
              touched &&
              touched.descriptions &&
              errors.descriptions &&
              errors.descriptions[index] &&
              errors.descriptions[index].value
            )
          }
        >
          {touched &&
            touched.descriptions &&
            errors.descriptions &&
            errors.descriptions[index] &&
            errors.descriptions[index].value}
        </FormHelperText>
        <Typography variant="caption">
          {inputValue.length}/{maxDescriptionLength}
        </Typography>
      </MessagesContainer>
    </Container>
  );
};

DescriptionComponent.propTypes = {
  language: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  errors: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
  handleOnBlur: PropTypes.func.isRequired,
  touched: PropTypes.objectOf(PropTypes.any).isRequired,
};

const DescriptionForm = ({
  descriptions,
  setFieldValue,
  errors,
  touched,
  setFieldTouched,
  ...props
}) => {
  const handleFieldOnBlur = (value, language) => {
    const updatedDescriptions = descriptions.map((element) =>
      element.language === language ? { ...element, value } : element
    );

    setFieldValue('descriptions', updatedDescriptions, true);
    setTimeout(() => setFieldTouched('descriptions', true));
  };

  return (
    <div {...props}>
      {descriptions.map(({ language, value }, index) => (
        <DescriptionComponent
          value={value}
          key={language}
          language={language}
          errors={errors}
          index={index}
          touched={touched}
          handleOnBlur={(e) => handleFieldOnBlur(e.target.value, language)}
        />
      ))}
    </div>
  );
};

DescriptionForm.propTypes = {
  descriptions: PropTypes.arrayOf(
    PropTypes.shape({
      language: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
  setFieldValue: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(PropTypes.any).isRequired,
  touched: PropTypes.objectOf(PropTypes.any).isRequired,
  setFieldTouched: PropTypes.func.isRequired,
};

export default DescriptionForm;
