import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';

const views = {
  daily: undefined,
  monthly: ['year', 'month'],
  yearly: ['year'],
};

const formats = {
  daily: 'DD MMM YY',
  monthly: 'MMM YY',
  yearly: 'YYYY',
};

const DatePicker = ({ period, date, setDate }) => {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDatePicker
        disabled={period === 'all'}
        disableToolbar
        views={views[period]}
        variant="inline"
        inputVariant="outlined"
        format={formats[period]}
        value={date}
        onChange={setDate}
        disableFuture
      />
    </MuiPickersUtilsProvider>
  );
};

DatePicker.propTypes = {
  period: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(moment).isRequired,
  setDate: PropTypes.func.isRequired,
};

export default DatePicker;
