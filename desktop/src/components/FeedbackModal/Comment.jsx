import React from 'react';
import styled from 'styled-components';
import { AccountCircle } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import moment from 'moment';

const Container = styled.div`
  border: 1px solid #e6e9ed;
  border-radius: 8px;
  margin-bottom: 16px;
  padding: 25px;
`;

const Avatar = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-bottom: 9px;

  span {
    margin-left: 9px;
  }

  span:last-child {
    color: rgba(0, 0, 0, 0.6);
    margin-left: auto;
  }
`;

const Manual = styled.div`
  color: rgba(0, 0, 0, 0.87);
  font-size: 0.875rem;
  letter-spacing: 0.4px;
  line-height: 20px;
  margin-bottom: 8px;
`;

const ReviewText = styled.div`
  color: rgba(0, 0, 0, 0.54);
  font-size: 0.875rem;
  letter-spacing: 0.4px;
  line-height: 20px;
  margin-bottom: 16px;

  span:last-child {
    color: #000000;
    font-size: 0.875rem;
    letter-spacing: 0.4px;
    line-height: 20px;
  }
`;

const CommentText = styled.span`
  color: #000000;
  font-size: 1rem;
  letter-spacing: 0.25px;
  line-height: 24px;
`;

const Empty = styled.div`
  flex: 1;
  overflow: auto;
`;

const getAnswerByRating = (rating) => {
  if (rating === 1) return 'yes';
  if (rating === 0) return 'partially';
  if (rating === -1) return 'no';

  return 'n/a';
};

const formatDate = (date) =>
  moment(date, 'YYYY-MM-DDTHH:mm:ss.sssZ').local().format('LL');

const Comment = ({ commentInfo, ...props }) => {
  const { t } = useTranslation();
  const { authorName, manual, rating, date, comment } = commentInfo;

  return (
    <Container {...props}>
      <Avatar>
        <AccountCircle color="primary" />
        <span>{authorName}</span>
        <Empty />
        <span>{formatDate(date)}</span>
      </Avatar>
      <Manual>{manual}</Manual>
      <ReviewText>
        {t('did-you-find-what-you-were-looking-for')}{' '}
        <span>{t(getAnswerByRating(rating))}</span>
      </ReviewText>
      <CommentText>{comment}</CommentText>
    </Container>
  );
};

Comment.propTypes = {
  commentInfo: PropTypes.shape({
    id: PropTypes.string,
    authorName: PropTypes.string,
    manual: PropTypes.string,
    rating: PropTypes.oneOf([1, 0, -1]),
    comment: PropTypes.string,
    date: PropTypes.string,
  }).isRequired,
};

export default Comment;
