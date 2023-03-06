import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { unwrapResult } from '@reduxjs/toolkit';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import { useToast } from '../../../hooks/toast';
import { useDynamicTranslation } from '../../../hooks/dynamic-translation';
import Emojis from './Emojis';
import { addReview } from '../../../store/manual';
import { Button, TextInput } from '../../../components';

const FeedbackContainer = styled(View)`
  background: #fff;
  border-radius: 4px;
  margin-left: 16px;
  margin-right: 16px;
`;

const FeedbackTitle = styled(Text)`
  border-bottom-color: #e6e9ed;
  border-bottom-width: 1px;
  font-size: 24px;
  letter-spacing: 0.18px;
  line-height: 28px;
  padding: 24px 30px;
  text-align: center;
`;

const AddCommentButton = styled(Button)`
  height: 48px;
  justify-content: center;
`;

const SendButton = styled(Button)`
  border-radius: 0;
  height: 48px;
  justify-content: center;
`;

const CommentContainer = styled(View)`
  align-items: flex-end;
  padding: 0 16px 0 16px;
`;

const CommentField = styled(TextInput)`
  color: ${(props) => props.theme.text.highEmphasis};
  font-size: 16px;
  letter-spacing: 0.5px;
  line-height: 28px;
  width: 100%;
`;

const getRating = (emoji) => {
  if (emoji === 'sad') return -1;
  if (emoji === 'happy') return 1;
  return 0;
};

const FeedbackForm = ({ manual, navigation }) => {
  const commentFieldRef = useRef(null);
  const [emojiSelected, setEmojiSelected] = useState('');
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { dt } = useDynamicTranslation();
  const { t } = useTranslation();

  const onSend = () => {
    dispatch(
      addReview({
        manualId: dt(manual),
        rating: getRating(emojiSelected),
        comment,
      })
    )
      .then(unwrapResult)
      .then(() =>
        toast.success({
          title: t('review-sent-successfully'),
        })
      )
      .catch(toast.exception)
      .finally(() => navigation.goBack());
  };

  useEffect(() => {
    if (commentFieldRef.current) commentFieldRef.current.focus();
  }, [isAddingComment, commentFieldRef]);

  return (
    <FeedbackContainer>
      <FeedbackTitle>
        {t('did-you-find-what-you-were-looking-for?')}
      </FeedbackTitle>
      <Emojis selected={emojiSelected} setSelected={setEmojiSelected} />
      {!isAddingComment ? (
        <AddCommentButton
          uppercase={false}
          disabled={emojiSelected === ''}
          color={emojiSelected === '' ? 'rgba(0, 0, 0, 0.38)' : '#00A0D1'}
          onPress={() => setIsAddingComment(true)}
        >
          {t('add-a-comment')}
        </AddCommentButton>
      ) : (
        <CommentContainer>
          <CommentField
            ref={commentFieldRef}
            value={comment}
            onChangeText={(text) => setComment(text)}
            mode="outlined"
            clearButtonMode="always"
            scrollEnabled
            multiline
            maxLength={100}
            numberOfLines={5}
          />
          <Text>{comment.length}/100</Text>
        </CommentContainer>
      )}

      <SendButton
        mode="contained"
        color="#00A0D1"
        disabled={emojiSelected === ''}
        onPress={onSend}
      >
        {t('send')}
      </SendButton>
    </FeedbackContainer>
  );
};
FeedbackForm.propTypes = {
  manual: PropTypes.arrayOf(
    PropTypes.shape({
      language: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
};

export default FeedbackForm;
