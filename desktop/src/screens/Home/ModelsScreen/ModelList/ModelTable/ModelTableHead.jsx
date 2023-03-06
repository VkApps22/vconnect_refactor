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

const ModelTableHead = ({ ...props }) => {
  const { t } = useTranslation();

  const getCellWidth = (type) => {
    if (type === 'rating') {
      return '14.78%';
    }
    if (type === 'buttons') {
      return '10.88%';
    }
    return '24.78%';
  };

  const columns = [
    { id: 'model', name: t('model') },
    { id: 'family', name: t('family') },
    { id: 'product', name: t('product') },
    { id: 'rating', name: t('rating') },
    { id: 'buttons', name: '' },
  ];

  return (
    <TableHead {...props}>
      <TableHeadRow>
        {columns.map(({ id, name }) => (
          <TableHeadCell key={id} width={getCellWidth(id)} type={id}>
            {name}
          </TableHeadCell>
        ))}
      </TableHeadRow>
    </TableHead>
  );
};

export default ModelTableHead;
