import { Bar } from 'react-chartjs-2';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useDynamicTranslation } from '../../hooks/dynamic-translation';

const colors = [
  '#EC8865',
  '#004678',
  '#DADADA',
  '#B9BFCA',
  '#325B88',
  '#E3C6BC',
  '#E97348',
  '#577399',
  '#E9B19E',
  '#99A5B8',
  '#798CA8',
  '#EC9D81',
];

const options = (t) => ({
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
        gridLines: {
          borderDash: [8, 4],
        },
      },
    ],
    xAxes: [
      {
        gridLines: {
          color: 'rgba(0, 0, 0, 0)',
        },
      },
    ],
  },
  tooltips: {
    callbacks: {
      label: (tooltipItem) => {
        return tooltipItem.value;
      },
      footer: () => t('views'),
    },
    backgroundColor: '#FFF',
    titleFontColor: 'rgba(0, 0, 0, 0.6)',
    titleFontFamily: 'Roboto',
    titleFontSize: 12,
    titleAlign: 'center',
    titleFontStyle: {
      fontWeight: 'normal',
    },
    footerFontColor: 'rgba(0, 0, 0, 0.6)',
    footerAlign: 'center',
    footerFontFamily: 'Roboto',
    footerFontSize: 10,
    footerFontStyle: 'normal',
    bodyFontColor: '#000',
    bodyFontSize: 22,
    bodyFontFamily: 'Roboto',
    bodyAlign: 'center',
    displayColors: false,
    xPadding: 12,
    yPadding: 13,
    borderWidth: 3,
    borderColor: 'rgba(50, 50, 71, 0.08)',
  },
});

const buildData = ({ othersLabel, limit, dataSeries, dt }) => {
  let limitedDataSeries = [...dataSeries];
  limitedDataSeries.sort((a, b) => b.value - a.value);

  if (dataSeries.length > limit) {
    const inputs = limitedDataSeries.slice(0, limit - 1);
    const othersInputs = limitedDataSeries.slice(
      limit - 1,
      limitedDataSeries.length
    );
    limitedDataSeries = [
      ...inputs,
      {
        label: othersLabel,
        value: othersInputs
          .map((input) => input.value)
          .reduce((a, b) => a + b, 0),
      },
    ];
  }

  const labelsList = limitedDataSeries.map((input) => dt(input.label));

  return {
    datasets: [
      {
        backgroundColor: colors,
        data: limitedDataSeries.map((input) => input.value),
        label: labelsList,
      },
    ],
    labels: labelsList,
  };
};

const CustomBar = ({ dataSeries }) => {
  const { t } = useTranslation();
  const { dt } = useDynamicTranslation();

  const data = useMemo(
    () =>
      buildData({
        othersLabel: t('others'),
        limit: 12,
        dataSeries,
        dt,
      }),
    [t, dt, dataSeries]
  );

  return (
    <Bar
      height={400}
      data={data}
      legend={{
        display: true,
        position: 'bottom',
        labels: {
          fontColor: '#000000',
          fontSize: 12,
          generateLabels: ({ data: legendData }) => {
            const { labels } = legendData;
            return labels.map((label, index) => ({
              text: label,
              fillStyle: colors[index],
            }));
          },
        },
      }}
      options={options(t)}
    />
  );
};

CustomBar.propTypes = {
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
};

CustomBar.defaultProps = {
  dataSeries: [],
};

export default CustomBar;
