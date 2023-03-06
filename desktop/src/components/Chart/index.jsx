import moment from 'moment';
import styled, { css } from 'styled-components';
import React from 'react';
import { styled as materialStyled } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import PeriodSelect from './PeriodSelect';
import DatePicker from './DatePicker';
import CustomBar from './CustomBar';
import CustomDoughnut from './CustomDoughnut';

const Container = styled.div`
  background: #ffffff;
  border-radius: 8px;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 24px;
  position: relative;

  ${(props) =>
    props.doughnutContainer &&
    css`
      justify-content: flex-start;
      padding-right: 80px;
    `}
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  height: 48px;
  margin: 24px;
  width: 100%;
`;

const HeaderTitle = materialStyled(Typography)({
  color: '#000000',
  fontSize: '1.375rem',
  fontWeight: 500,
  letterSpacing: 1,
  marginBottom: 8,
});

const Empty = styled.div`
  flex: 1;
  overflow: auto;
`;

const HeaderOptions = styled.div`
  display: flex;
  margin-right: 50px;

  & > * {
    margin-right: 24px;
  }
`;

const Chart = ({
  title,
  dataSeries,
  searchRenderFunc,
  period,
  setPeriod,
  date,
  setDate,
  chartType,
  legendLabel,
}) => {
  return (
    <Container>
      <Header>
        <HeaderTitle variant="h6">{title}</HeaderTitle>
        <Empty />
        <HeaderOptions>
          {searchRenderFunc && searchRenderFunc()}
          {setPeriod && <PeriodSelect period={period} setPeriod={setPeriod} />}
          {setDate && (
            <DatePicker period={period} date={date} setDate={setDate} />
          )}
        </HeaderOptions>
      </Header>
      <Content doughnutContainer={chartType === 'Doughnut'}>
        {chartType === 'Doughnut' ? (
          <CustomDoughnut dataSeries={dataSeries} legendLabel={legendLabel} />
        ) : (
          <CustomBar dataSeries={dataSeries} />
        )}
      </Content>
    </Container>
  );
};

Chart.propTypes = {
  title: PropTypes.string,
  dataSeries: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([
        PropTypes.arrayOf(
          PropTypes.shape({
            language: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
          })
        ),
        PropTypes.string,
      ]).isRequired,
      value: PropTypes.number.isRequired,
    })
  ),
  searchRenderFunc: PropTypes.func,
  period: PropTypes.string,
  setPeriod: PropTypes.func,
  date: PropTypes.instanceOf(moment),
  setDate: PropTypes.func,
  chartType: PropTypes.string,
  legendLabel: PropTypes.string,
};

Chart.defaultProps = {
  title: '',
  dataSeries: [],
  searchRenderFunc: undefined,
  period: undefined,
  setPeriod: undefined,
  date: undefined,
  setDate: undefined,
  chartType: 'Bar',
  legendLabel: '',
};

export default Chart;
