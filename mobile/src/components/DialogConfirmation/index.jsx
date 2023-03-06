import React from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import Icon from '@expo/vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { Dialog } from '../third-party-components';
import Button from '../Button';
import TouchableDebounce from '../TouchableDebounce';

const DialogContainer = styled(Dialog)`
  bottom: 0;
  left: 0;
  margin: 0;
  padding: 16px;
  position: absolute;
  right: 0;
`;

const DialogTitle = styled(Dialog.Title)`
  color: ${(props) => props.theme.text.lowEmphasis};
  flex: 0;
  font-size: 16px;
  letter-spacing: 0.15px;
  line-height: 24px;
  margin: 0;
  width: 80%;
`;

const DialogContent = styled(Dialog.Content)`
  margin: 0;
  margin-top: 16px;
  padding: 0;
`;

const DialogContentText = styled(Text)`
  color: ${(props) => props.theme.text.tertiary};
`;

const DialogActions = styled(Dialog.Actions)`
  flex-direction: column;
  margin-top: 24px;
  padding: 0;
`;

const DialogConfirmButton = styled(Button)`
  background: ${(props) => props.theme.button.backgroundColor};
  width: 100%;
`;

const DialogCancelButton = styled(Button)`
  margin-top: 24px;
  width: 100%;
`;

const CloseIcon = styled(Icon)`
  color: ${(props) => props.theme.text.lowEmphasis};
`;

const CloseButton = styled(TouchableDebounce)`
  position: absolute;
  right: 16px;
  top: 16px;
`;

const DialogConfirmation = ({
  title,
  content,
  onConfirm,
  confirmText,
  onCancel,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <DialogContainer {...props}>
      <CloseButton onPress={onCancel}>
        <CloseIcon name="close" size={24} />
      </CloseButton>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <DialogConfirmButton onPress={onConfirm} mode="contained">
          {confirmText}
        </DialogConfirmButton>
        <DialogCancelButton
          onPress={onCancel}
          color="#00a0d1"
          mode="text"
          uppercase={false}
        >
          {t('cancel')}
        </DialogCancelButton>
      </DialogActions>
    </DialogContainer>
  );
};

DialogConfirmation.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  confirmText: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};

DialogConfirmation.defaultProps = {
  title: 'Dialog Title',
  content: 'Dialog Content',
  confirmText: 'Confirm',
  onConfirm: () => {},
  onCancel: () => {},
};

export default DialogConfirmation;
