import React from 'react';
import { Table, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { styled as materialStyled } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import UserTablePagination from './UserTablePagination';
import UserTableHead from './UserTableHead';
import UserTableBody from './UserTableBody';

const Container = styled.div`
  margin: 0 79px;
  width: auto;
`;

const Empty = styled.div`
  align-items: center;
  background: rgba(0, 0, 0, 0.04);
  display: flex;
  height: 60px;
  justify-content: center;
  text-align: center;
`;

const EmptyText = materialStyled(Typography)({
  color: '#000000',
  fontSize: '16px',
  fontWeight: 400,
  letterSpacing: 1,
  marginBottom: 8,
});

const UserTable = ({
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  total,
  list,
  onToggleAdmin,
  ...props
}) => {
  const { t } = useTranslation();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container {...props}>
      <Table>
        <UserTableHead />
        <UserTableBody onToggleAdmin={onToggleAdmin} list={list} />
      </Table>
      {total !== 0 && (
        <UserTablePagination
          length={total}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
      {total === 0 && (
        <Empty>
          <EmptyText>{t('no-results-found')}</EmptyText>
        </Empty>
      )}
    </Container>
  );
};

UserTable.propTypes = {
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
  total: PropTypes.number,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      email: PropTypes.string,
      name: PropTypes.string,
      preferredName: PropTypes.string,
      company: PropTypes.string,
      phone: PropTypes.string,
      country: PropTypes.string,
      state: PropTypes.string,
      admin: PropTypes.bool,
      canAdmin: PropTypes.bool,
    })
  ),
  onToggleAdmin: PropTypes.func.isRequired,
};

UserTable.defaultProps = {
  list: [],
  total: undefined,
};

export default UserTable;
