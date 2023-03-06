import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Header from './Header';
import UserTable from './UserTable';

const UserListContainer = styled.div`
  background: #ffffff;
  border-radius: 8px;
  padding: 24px 0;
  width: 100%;
`;

const UserList = ({
  searchString,
  setSearchString,
  ratingFilter,
  setRatingFilter,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  total,
  list,
  onToggleAdmin,
  ...props
}) => {
  return (
    <UserListContainer {...props}>
      <Header
        ratingFilter={ratingFilter}
        handleChangeRatingFilter={setRatingFilter}
        handleChangeSearchString={setSearchString}
      />
      <UserTable
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        total={total}
        list={list}
        onToggleAdmin={onToggleAdmin}
      />
    </UserListContainer>
  );
};

UserList.propTypes = {
  searchString: PropTypes.string,
  setSearchString: PropTypes.func.isRequired,
  ratingFilter: PropTypes.string,
  setRatingFilter: PropTypes.func.isRequired,
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
  ).isRequired,
  onToggleAdmin: PropTypes.func.isRequired,
};

UserList.defaultProps = {
  searchString: undefined,
  ratingFilter: undefined,
  total: undefined,
};

export default UserList;
