import React from 'react';
import { Button, Typography, CircularProgress } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { styled as materialStyled } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

import ModelEditor from './ModelEditor';
import { add, selector } from '../../../store/model';
import {
  buildInitialValues,
  convertFormValuesToPayload,
} from './ModelEditor/Data';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 40px;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  height: 48px;
  margin-bottom: 24px;
  width: 100%;
`;

const HeaderTitle = materialStyled(Typography)({
  flex: 1,
});

const CreateButton = materialStyled(Button)({
  width: 290,
  height: 56,
  marginLeft: 'auto',
});

const Overlay = styled.div`
  background-color: #47444455;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 10;
`;

const ButtonSpinner = materialStyled(CircularProgress)({
  marginLeft: 20,
});

const ModelEditorScreen = () => {
  const { t } = useTranslation();
  const { submitting } = useSelector(selector);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const renderSubmitButton = ({ handleSubmit, isValid }) => (
    <CreateButton
      onClick={handleSubmit}
      variant="contained"
      color="primary"
      disabled={!isValid}
    >
      {t('create-model')}
      {submitting && <ButtonSpinner color="secondary" size={20} />}
    </CreateButton>
  );

  const onSubmit = (values) =>
    dispatch(add(convertFormValuesToPayload({ values })))
      .then(unwrapResult)
      .then(() => {
        history.push('/models');
        enqueueSnackbar(t('model-was-created-successfully'), {
          variant: 'success',
        });
      })
      .catch((err) => enqueueSnackbar(t(err.message), { variant: 'error' }));

  return (
    <Container>
      <Header>
        <HeaderTitle variant="h6">{t('insert-new-model')}</HeaderTitle>
      </Header>
      {submitting && <Overlay />}
      <ModelEditor
        onSubmit={onSubmit}
        initialValues={buildInitialValues()}
        renderSubmitButton={renderSubmitButton}
      />
    </Container>
  );
};

export default ModelEditorScreen;
