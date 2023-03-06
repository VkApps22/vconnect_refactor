import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { TextInput } from '../third-party-components';
import TouchableDebounce from '../TouchableDebounce';

const PasswordContent = styled(View)`
  width: 100%;
`;

const StyledTouchableDebounce = styled(TouchableDebounce)`
  position: absolute;
  right: 17px;
  top: 23px;
  z-index: 5;
`;
const EyeIcon = styled(MaterialCommunityIcons)``;

const PasswordInput = forwardRef(
  ({ initialBlockContent, onSubmitEditing, ...props }, ref) => {
    const { t } = useTranslation();
    const inputElementRef = useRef(null);
    const [blockContent, setBlockContent] = useState(initialBlockContent);

    useImperativeHandle(ref, () => ({
      focus() {
        inputElementRef.current.focus();
      },
    }));

    return (
      <PasswordContent>
        <TextInput
          label={t('password')}
          mode="outlined"
          ref={inputElementRef}
          returnKeyType="done"
          textContentType="password"
          autoCorrect={false}
          secureTextEntry={blockContent}
          autoCapitalize="none"
          onSubmitEditing={onSubmitEditing}
          {...props}
        />
        <StyledTouchableDebounce
          hitSlop={{ top: 16, right: 16, bottom: 16, left: 16 }}
          onPress={() => setBlockContent((value) => !value)}
        >
          {blockContent ? (
            <EyeIcon name="eye-outline" size={24} color="rgba(0, 0, 0, 0.6)" />
          ) : (
            <EyeIcon
              name="eye-off-outline"
              size={24}
              color="rgba(0, 0, 0, 0.6)"
            />
          )}
        </StyledTouchableDebounce>
      </PasswordContent>
    );
  }
);

PasswordInput.propTypes = {
  initialBlockContent: PropTypes.bool,
  onSubmitEditing: PropTypes.func,
};

PasswordInput.defaultProps = {
  initialBlockContent: true,
  onSubmitEditing: () => {},
};

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
