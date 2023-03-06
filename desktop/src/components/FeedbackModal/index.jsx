import React from 'react';
import {
  IconButton,
  Modal,
  styled as materialStyled,
  Typography,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import ModalBody from './ModalBody';

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
  width: 880px;

  &:focus {
    outline: none;
  }
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

const FeedbackModal = ({
  modelId,
  open,
  handleClose,
  headerTitle,
  ...props
}) => {
  const ModalHeader = () => (
    <Header>
      <HeaderTitle variant="h6">{headerTitle}</HeaderTitle>
      <CloseButton onClick={handleClose}>
        <CloseIcon />
      </CloseButton>
    </Header>
  );

  return (
    <CustomModal open={open} onClose={handleClose} {...props}>
      <ModalContainer>
        <ModalHeader />
        <ModalBody modelId={modelId} />
      </ModalContainer>
    </CustomModal>
  );
};

FeedbackModal.propTypes = {
  modelId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  headerTitle: PropTypes.string.isRequired,
};

export default FeedbackModal;
