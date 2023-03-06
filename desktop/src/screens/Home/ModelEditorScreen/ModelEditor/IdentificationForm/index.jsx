import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import NameField from './NameField';
import NameFamily from './NameFamily';
import ModelCode from './ModelCode';
import ModelName from './ModelName';
import AugmentifyId from "./AugmentifyId";

const Container = styled.div`
  & > div:not(:first-child) {
    margin-top: 24px;
  }
`;

const IdentificationForm = ({
  values,
  errors,
  setFieldValue,
  handleChange,
  touched,
  setFieldTouched,
  ...props
}) => {
  const { productName, familyName, modelCode, modelName, augmentifyId } = values;

  return (
    <Container {...props}>
      <ModelName
        modelName={modelName}
        handleChange={handleChange('modelName')}
        errors={errors}
        touched={touched}
        onBlur={() => setFieldTouched('modelName')}
      />
      <ModelCode
        modelCode={modelCode}
        handleChange={handleChange('modelCode')}
        errors={errors}
        touched={touched}
        onBlur={() => setFieldTouched('modelCode')}
      />
      <NameField
        productName={productName}
        handleChange={(value) => setFieldValue('productName', value)}
        errors={errors}
        touched={touched}
        onBlur={() => setFieldTouched('productName')}
      />
      <NameFamily
        familyName={familyName}
        handleChange={(value) => setFieldValue('familyName', value)}
        errors={errors}
        touched={touched}
        onBlur={() => setFieldTouched('familyName')}
      />
      <AugmentifyId
          augmentifyId={augmentifyId}
          handleChange={handleChange('augmentifyId')}
          errors={errors}
          touched={touched}
          onBlur={() => setFieldTouched('augmentifyId')}
      />
    </Container>
  );
};

IdentificationForm.propTypes = {
  values: PropTypes.shape({
    productName: PropTypes.shape({
      nameKey: PropTypes.string.isRequired,
      name: PropTypes.arrayOf(
        PropTypes.shape({
          language: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
        })
      ),
    }),
    familyName: PropTypes.shape({
      familyKey: PropTypes.string.isRequired,
      family: PropTypes.arrayOf(
        PropTypes.shape({
          language: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
        })
      ),
    }),
    modelCode: PropTypes.string,
    modelName: PropTypes.string,
    augmentifyId: PropTypes.string,
  }).isRequired,
  errors: PropTypes.objectOf(PropTypes.any).isRequired,
  handleChange: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  touched: PropTypes.objectOf(PropTypes.any).isRequired,
  setFieldTouched: PropTypes.func.isRequired,
};

export default IdentificationForm;
