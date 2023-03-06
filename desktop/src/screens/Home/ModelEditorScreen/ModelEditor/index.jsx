import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Step, StepContent, StepLabel, Stepper } from '@material-ui/core';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { buildSchema } from './Data';

const Container = styled.div`
  background: #fff;
  border-radius: 8px;
  margin-bottom: 24px;
  min-width: 800px;
  padding: 32px 79px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ModelEditor = ({ onSubmit, renderSubmitButton, initialValues }) => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const { schema, steps } = useMemo(() => buildSchema(t), [t]);

  const handleUpdateActiveStep = (value) => setActiveStep(value);

  return (
    <Container>
      {initialValues && (
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={schema}
          validateOnBlur
          validateOnChange={false}
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            handleChange,
            setFieldValue,
            handleSubmit,
            touched,
            setFieldTouched,
            isValid,
          }) => (
            <FormContainer>
              <Stepper nonLinear orientation="vertical" activeStep={activeStep}>
                {steps(
                  values,
                  errors,
                  handleChange,
                  handleUpdateActiveStep,
                  setFieldValue,
                  touched,
                  setFieldTouched
                ).map(({ label, content, isErrored, isCompleted }) => (
                  <Step key={label} expanded completed={isCompleted}>
                    <StepLabel error={isErrored}>{label}</StepLabel>
                    <StepContent>{content}</StepContent>
                  </Step>
                ))}
              </Stepper>
              {renderSubmitButton({ handleSubmit, isValid })}
            </FormContainer>
          )}
        </Formik>
      )}
    </Container>
  );
};

ModelEditor.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  renderSubmitButton: PropTypes.func.isRequired,
  initialValues: PropTypes.objectOf(PropTypes.any),
};

ModelEditor.defaultProps = {
  initialValues: undefined,
};

export default ModelEditor;
