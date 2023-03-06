import React from 'react';
import styled from 'styled-components/native';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import { EmojiHappy, EmojiNormal, EmojiSad } from '../../../components/icons';
import { TouchableDebounce } from '../../../components';

const EmojiContainer = styled(View)`
  flex-direction: row;
  height: 112px;
  justify-content: space-evenly;
`;

const Emoji = styled(View)`
  align-items: center;
  justify-content: center;
`;

const EmojiText = styled(Text)`
  color: ${(props) => props.theme.text.disabled};
  font-size: 12px;
  letter-spacing: 0.4px;
  line-height: 16px;
  margin-top: 8px;
`;

const EmojiButton = styled(TouchableDebounce)`
  align-items: center;
  justify-content: center;
`;

const Emojis = ({ selected, setSelected }) => {
  const { t } = useTranslation();

  return (
    <EmojiContainer>
      <EmojiButton onPress={() => setSelected('sad')}>
        <Emoji>
          <EmojiSad disabled={selected !== 'sad'} />
          <EmojiText>{t('no')}</EmojiText>
        </Emoji>
      </EmojiButton>
      <EmojiButton onPress={() => setSelected('partial')}>
        <Emoji>
          <EmojiNormal disabled={selected !== 'partial'} />
          <EmojiText>{t('partially')}</EmojiText>
        </Emoji>
      </EmojiButton>
      <EmojiButton onPress={() => setSelected('happy')}>
        <Emoji>
          <EmojiHappy disabled={selected !== 'happy'} />
          <EmojiText>{t('yes')}</EmojiText>
        </Emoji>
      </EmojiButton>
    </EmojiContainer>
  );
};

Emojis.propTypes = {
  selected: PropTypes.string.isRequired,
  setSelected: PropTypes.func.isRequired,
};

export default Emojis;
