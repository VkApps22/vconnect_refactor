import React from 'react';
import {
  IconButton,
  useTheme,
  makeStyles,
  TablePagination,
} from '@material-ui/core';
import {
  FirstPage,
  LastPage,
  KeyboardArrowRight,
  KeyboardArrowLeft,
} from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const ModelTablePagination = ({
  length,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <TablePagination
      {...props}
      rowsPerPageOptions={[10, 20, 35]}
      align="right"
      count={length}
      component="div"
      colSpan={50}
      rowsPerPage={rowsPerPage}
      page={page}
      labelRowsPerPage={t('rows-per-page')}
      labelDisplayedRows={({ from, to, count }) =>
        `${from}-${to} ${t('of')} ${count}`
      }
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      ActionsComponent={TablePaginationActions}
    />
  );
};

ModelTablePagination.propTypes = {
  length: PropTypes.number,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  handleChangePage: PropTypes.func,
  handleChangeRowsPerPage: PropTypes.func,
};

ModelTablePagination.defaultProps = {
  length: 0,
  page: 0,
  rowsPerPage: 10,
  handleChangePage: () => {},
  handleChangeRowsPerPage: () => {},
};

export default ModelTablePagination;
