import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ExpandMore } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Button,
  styled as materialStyled,
  Typography,
} from '@material-ui/core';

import Overview from '../Overview';
import Comment from './Comment';
import { fetchComments, fetchCommentsOverview } from '../../store/model';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px 40px;
`;

const OverviewContainer = styled.div`
  border: 1px solid #e6e9ed;
  border-radius: 8px;
  margin-top: 16px;
`;

const RecentComments = styled.div`
  margin-top: 24px;
`;

const Titles = materialStyled(Typography)({
  fontSize: '1.25rem',
  fontWeight: 'normal',
  lineHeight: '2rem',
  letterSpacing: 0.5,
});

const MoreCommentsButton = materialStyled(Button)({
  fontWeight: 'bold',
  textDecoration: 'underline',
  textTransform: 'none',
});

const formatDate = (date, format) =>
  moment(date, 'YYYY-MM-DDTHH:mm:ss.sssZ').local().format(format);

const ModalContent = ({ modelId, language }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [comments, setComments] = useState({
    items: [],
    total: 0,
  });
  const [overview, setOverview] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(fetchCommentsOverview({ modelId, language }))
      .then(unwrapResult)
      .then((result) =>
        setOverview([
          {
            title: t('yes'),
            body: result.yesCount,
            bottom: result.lastYesReview
              ? `${t('last-review')} ${formatDate(
                  result.lastYesReview,
                  t('date-format')
                )}`
              : undefined,
          },
          {
            title: t('partially'),
            body: result.partiallyCount,
            bottom: result.lastPartiallyReview
              ? `${t('last-review')} ${formatDate(
                  result.lastPartiallyReview,
                  t('date-format')
                )}`
              : undefined,
          },
          {
            title: t('no'),
            body: result.noCount,
            bottom: result.lastNoReview
              ? `${t('last-review')} ${formatDate(
                  result.lastNoReview,
                  t('date-format')
                )}`
              : undefined,
          },
        ])
      );
  }, [dispatch, t, modelId, language]);

  useEffect(() => {
    dispatch(
      fetchComments({
        modelId,
        language,
        pagination: {
          limit: 10,
          page,
        },
      })
    )
      .then(unwrapResult)
      .then((result) => {
        setComments((previousComments) => ({
          items: [...previousComments.items, ...result.items],
          total: result.total,
        }));
      });
  }, [dispatch, page, modelId, language]);

  const onViewMore = useCallback(() => setPage(page + 1), [page]);

  return (
    <Container>
      <Titles>{t('did-you-find-what-you-were-looking-for')}</Titles>
      <OverviewContainer>
        <Overview content={overview} />
      </OverviewContainer>
      <RecentComments>
        <Titles>{t('recent-comments')}</Titles>
        {comments.items.map((commentInfo) => (
          <Comment
            commentInfo={commentInfo}
            key={`${language}_${commentInfo.id}`}
          />
        ))}
      </RecentComments>
      {comments.items.length < comments.total && (
        <MoreCommentsButton
          variant="text"
          color="secondary"
          onPress={onViewMore}
        >
          {t('view-more')} <ExpandMore fontSize="small" />
        </MoreCommentsButton>
      )}
    </Container>
  );
};

ModalContent.propTypes = {
  modelId: PropTypes.string.isRequired,
  language: PropTypes.string,
};

ModalContent.defaultProps = {
  language: undefined,
};

export default ModalContent;
