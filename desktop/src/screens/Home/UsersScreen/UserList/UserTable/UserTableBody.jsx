import React from 'react';
import {
  styled as materialStyled,
  Switch,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Info } from '@material-ui/icons';
import styled from 'styled-components';

const NAContainer = styled.div`
  align-items: center;
  display: flex;

  & > * {
    margin-left: 5px;
  }
`;

const CellActions = ({ admin, canAdmin, onChange }) => {
  const { t } = useTranslation();

  return (
    <>
      {admin || canAdmin ? (
        <Switch disabled={!canAdmin} checked={admin} onChange={onChange} />
      ) : (
        <NAContainer>
          {t('n/a')}
          <Tooltip title={t('only-vulkan-users-can-have-this-permission')}>
            <Info color="disabled" />
          </Tooltip>
        </NAContainer>
      )}
    </>
  );
};

CellActions.propTypes = {
  admin: PropTypes.bool.isRequired,
  canAdmin: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

const TableBodyCell = materialStyled(TableCell)({
  color: 'rgba(0,0,0, 0.87)',
  fontSize: '1rem',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '1px',
  whiteSpace: 'nowrap',
});

const UserTableBody = ({ list, onToggleAdmin, ...props }) => {
  return (
    <TableBody {...props}>
      {list.map(
        ({
          _id,
          email,
          name,
          company,
          phone,
          country,
          state,
          admin,
          canAdmin,
        }) => (
          <TableRow key={_id}>
            <TableBodyCell title={name}>{name}</TableBodyCell>
            <TableBodyCell title={email}>{email}</TableBodyCell>
            <TableBodyCell title={phone}>{phone}</TableBodyCell>
            <TableBodyCell title={company}>{company}</TableBodyCell>
            <TableBodyCell title={country}>{country}</TableBodyCell>
            <TableBodyCell title={state}>{state}</TableBodyCell>
            <TableBodyCell style={{ maxWidth: 'none' }}>
              <CellActions
                onChange={() => onToggleAdmin({ id: _id, remove: admin })}
                admin={admin}
                canAdmin={canAdmin}
              />
            </TableBodyCell>
          </TableRow>
        )
      )}
    </TableBody>
  );
};

UserTableBody.propTypes = {
  onToggleAdmin: PropTypes.func.isRequired,
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
};

UserTableBody.defaultProps = {
  list: [],
};

export default UserTableBody;
