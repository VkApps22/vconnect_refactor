import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { styled as materialStyled, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import UserList from './UserList';
import {
  fetch,
  selector as userSelector,
  toggleAdmin,
} from '../../../store/user';

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

const UsersScreen = () => {
  const dispatch = useDispatch();
  const [searchString, setSearchString] = useState();
  const [ratingFilter, setRatingFilter] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { items, total, fetchingRequired } = useSelector(userSelector);
  const { t } = useTranslation();

  const update = useCallback(
    () =>
      dispatch(
        fetch({
          text: searchString,
          companyDomain: ratingFilter === 'vulkan-users',
          pagination: {
            page,
            limit: rowsPerPage,
          },
        })
      ),
    [dispatch, ratingFilter, page, rowsPerPage, searchString]
  );

  useEffect(() => {
    update();
  }, [update]);

  useEffect(() => {
    if (fetchingRequired) update();
  }, [update, fetchingRequired]);

  useEffect(() => {
    setPage(0);
  }, [searchString, ratingFilter]);

  const onToggleAdmin = ({ id, remove }) =>
    dispatch(toggleAdmin({ id, remove }));

  return (
    <Container>
      <Header>
        <HeaderTitle variant="h6">{t('manage-users')}</HeaderTitle>
      </Header>
      <UserList
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
        onToggleAdmin={onToggleAdmin}
      />
    </Container>
  );
};

export default UsersScreen;
