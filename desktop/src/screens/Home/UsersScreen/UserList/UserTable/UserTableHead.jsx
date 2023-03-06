import React from 'react';
import {
  styled as materialStyled,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const TableHeadRow = materialStyled(TableRow)({
  borderBottom: '2px solid #00a0d1',
});

const TableHeadCell = materialStyled(TableCell)({
  fontWeight: 500,
  fontSize: '1.125rem',
  padding: '14px 12px',
});

const UserTableHead = ({ ...props }) => {
  const { t } = useTranslation();

  const columns = [
    { id: 'name', name: t('name') },
    { id: 'email', name: t('email') },
    { id: 'cell-phone', name: t('cell-phone') },
    { id: 'company', name: t('company') },
    { id: 'country', name: t('country') },
    { id: 'state', name: t('state') },
    { id: 'adm', name: t('adm') },
  ];

  const getCellWidth = (type) => {
    if (type === 'adm') {
      return '8.68%';
    }
    return '15.22%';
  };

  return (
    <TableHead {...props}>
      <TableHeadRow>
        {columns.map(({ id, name }) => (
          <TableHeadCell key={id} width={getCellWidth(id)}>
            {name}
          </TableHeadCell>
        ))}
      </TableHeadRow>
    </TableHead>
  );
};

export default UserTableHead;
