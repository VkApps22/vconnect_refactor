import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Button,
  styled as materialStyled,
  Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Add } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Overview } from '../../../components';
import ModelList from './ModelList';
import {
  fetch,
  fetchOverview,
  remove,
  selector as modelSelector,
} from '../../../store/model';

const Container = styled.div`
  align-items: flex-start;
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

const AddModel = materialStyled(Button)({
  textTransform: 'none',
  fontWeight: 'bold',
  height: 48,
});

const formatDate = (date, format) =>
  moment(date, 'YYYY-MM-DDTHH:mm:ss.sssZ').local().format(format);

const ModelsScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [searchString, setSearchString] = useState();
  const [ratingFilter, setRatingFilter] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [overviewContent, setOverviewContent] = useState([]);
  const { items, total, overview, refreshCounter } = useSelector(modelSelector);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    dispatch(fetchOverview());
  }, [refreshCounter, dispatch]);

  useEffect(() => {
    setOverviewContent([
      {
        title: t('registered-products'),
        body: overview.productCount,
        bottom: `${t('last-change')} ${formatDate(
          overview.lastUpdated,
          t('date-format')
        )}`,
      },
      {
        title: t('registered-families'),
        body: overview.familyCount,
        bottom: `${t('last-change')} ${formatDate(
          overview.lastUpdated,
          t('date-format')
        )}`,
      },
      {
        title: t('registered-models'),
        body: overview.modelCount,
        bottom: `${t('last-change')} ${formatDate(
          overview.lastUpdated,
          t('date-format')
        )}`,
      },
    ]);
  }, [t, overview]);

  useEffect(() => {
    dispatch(
      fetch({
        language: i18n.languages[0],
        text: searchString,
        filter: {
          rating: ratingFilter,
        },
        pagination: {
          page,
          limit: rowsPerPage,
        },
      })
    );
  }, [
    ratingFilter,
    dispatch,
    page,
    rowsPerPage,
    i18n.languages,
    searchString,
    refreshCounter,
  ]);

  useEffect(() => {
    setPage(0);
  }, [searchString, ratingFilter]);

  const handleDelete = (id) =>
    dispatch(
      remove({
        id,
      })
    );

  return (
    <Container>
      <Header>
        <HeaderTitle variant="h6">{t('view-models')}</HeaderTitle>
        <AddModel
          onClick={() => history.push('modelEditor')}
          variant="contained"
          color="primary"
          startIcon={<Add />}
        >
          {t('add-model')}
        </AddModel>
      </Header>
      <Overview content={overviewContent} />
      <ModelList
        searchString={searchString}
        setSearchString={setSearchString}
        ratingFilter={ratingFilter}
        setRatingFilter={setRatingFilter}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        total={total}
        list={items}
        handleDelete={handleDelete}
      />
    </Container>
  );
};

export default ModelsScreen;
