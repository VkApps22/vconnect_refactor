import React from 'react';
import {
  Modal,
  styled as materialStyled,
  Typography,
  Button,
} from '@material-ui/core';
import { Warning } from '@material-ui/icons';
import { useTranslation, Trans } from 'react-i18next';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CustomModal = materialStyled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
});

const Title = materialStyled(Typography)({
  color: 'rgba(0, 0, 0, 0.87)',
  marginBottom: 40,
});

const CustomButton = materialStyled(Button)({
  fontSize: '1rem',
  fontWeight: 'bold',
  height: 56,
});

const CancelButton = materialStyled(CustomButton)({
  marginBottom: 24,
  marginTop: 40,
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
  width: 592px;

  &:focus {
    outline: none;
  }
`;

const RowContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin: 24px 0;

  svg {
    margin-right: 26px;
  }
`;

const DeleteModelModal = ({
  open,
  id,
  model,
  handleClose,
  handleDelete,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <CustomModal open={open} onClose={handleClose} {...props}>
      <ModalContainer>
        <Title variant="h6">{t('delete-a-model')}</Title>
        <Typography>
          <Trans
            i18nKey="do-you-really-want-to-exclude-the-model-model-this-action-cannot-be-undone"
            values={{ model }}
            components={{ bold: <strong /> }}
          />
        </Typography>
        <RowContainer>
          <Warning color="error" fontSize="large" />
          <Typography variant="body1" color="error">
            {t('the-model-model-will-be-deleted-from-the-system', { model })}
          </Typography>
        </RowContainer>
        <CancelButton onClick={handleClose} variant="contained" color="primary">
          {t('cancel')}
        </CancelButton>
        <CustomButton
          variant="outlined"
          onClick={() => {
            handleClose();
            handleDelete(id);
          }}
        >
          {t('i-understand-and-wish-to-delete-it')}
        </CustomButton>
      </ModalContainer>
    </CustomModal>
  );
};

DeleteModelModal.propTypes = {
  open: PropTypes.bool.isRequired,
  model: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default DeleteModelModal;
