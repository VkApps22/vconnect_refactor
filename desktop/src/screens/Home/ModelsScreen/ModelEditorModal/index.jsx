import React, { useEffect, useState } from 'react';
import {
  Button,
  CircularProgress,
  IconButton,
  Modal,
  styled as materialStyled,
  Typography,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

import ModelEditor from '../../ModelEditorScreen/ModelEditor';
import {
  fetchDetails,
  fetchImages,
  fetchManuals,
  selector,
  update,
} from '../../../../store/model';
import {
  convertFormValuesToPayload,
  convertImagesPayloadToFormValues,
  convertManualsPayloadToFormValues,
  convertPayloadToFormValues,
} from '../../ModelEditorScreen/ModelEditor/Data';

const ProgressContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

const ModalContainer = styled.div`
  background: #f3f3f3;
  border: 1px solid #f3f3f3;
  border-radius: 8px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 95vh;
  overflow: hidden;
  position: relative;
  width: 80%;

  &:focus {
    outline: none;
  }
`;

const Contents = styled.div`
  overflow-y: auto;
`;

const Header = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  padding-bottom: 32px;
  padding-top: 40px;
  position: relative;
`;

const CustomModal = materialStyled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
});

const HeaderTitle = materialStyled(Typography)({
  color: '#00447a',
});

const CloseButton = materialStyled(IconButton)({
  position: 'absolute',
  top: 45,
  right: 45,
});

const CloseIcon = materialStyled(Close)({
  color: 'rgba(0, 0, 0, 0.87)',
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

const ModelEditorModal = ({ id, open, handleClose, ...props }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { pending, submitting } = useSelector(selector);
  const { enqueueSnackbar } = useSnackbar();
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    if (id)
      dispatch(fetchDetails({ id }))
        .then(unwrapResult)
        .then((response) => convertPayloadToFormValues({ response }))
        .then((values) => {
          setInitialValues(values);

          dispatch(fetchManuals({ id }))
            .then(unwrapResult)
            .then((manualsResponse) => {
              setInitialValues((oldInitialValues) => ({
                ...oldInitialValues,
                ...convertManualsPayloadToFormValues({
                  response: manualsResponse,
                  t,
                }),
              }));

              dispatch(fetchImages({ id }))
                .then(unwrapResult)
                .then((imagesResponse) =>
                  setInitialValues((oldInitialValues) => ({
                    ...oldInitialValues,
                    ...convertImagesPayloadToFormValues({
                      response: imagesResponse,
                    }),
                  }))
                );
            });
        });
  }, [dispatch, id, t]);

  const renderSubmitButton = ({ handleSubmit, isValid }) => (
    <CreateButton
      onClick={handleSubmit}
      variant="contained"
      color="primary"
      disabled={!isValid}
    >
      {t('edit-model')}
      {submitting && <ButtonSpinner color="secondary" size={20} />}
    </CreateButton>
  );

  const onSubmit = (values) =>
    dispatch(update({ ...convertFormValuesToPayload({ values }), id }))
      .then(unwrapResult)
      .then(() => {
        handleClose();
        enqueueSnackbar(t('model-was-updated-successfully'), {
          variant: 'success',
        });
      })
      .catch((err) => enqueueSnackbar(t(err.message), { variant: 'error' }));

  const ModalHeader = () => (
    <Header>
      <HeaderTitle variant="h6">{t('edit-model')}</HeaderTitle>
      <CloseButton onClick={handleClose}>
        <CloseIcon />
      </CloseButton>
    </Header>
  );

  return (
    <CustomModal open={open} onClose={handleClose} {...props}>
      <ModalContainer>
        <ModalHeader />
        {pending && (
          <ProgressContainer>
            <CircularProgress size={80} />
          </ProgressContainer>
        )}
        {!pending && (
          <>
            {submitting && <Overlay />}
            <Contents>
              <ModelEditor
                id={id}
                initialValues={initialValues}
                onSubmit={onSubmit}
                renderSubmitButton={renderSubmitButton}
              />
            </Contents>
          </>
        )}
      </ModalContainer>
    </CustomModal>
  );
};

ModelEditorModal.propTypes = {
  id: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ModelEditorModal;
