import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Chart } from '../../../components';
import { fetchMostPopularStates, selector } from '../../../store/analytics';

const MostPopularStatesCard = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { mostPopularStates } = useSelector(selector);

  useEffect(() => {
    dispatch(fetchMostPopularStates());
  }, [dispatch]);

  return (
    <Chart
      dataSeries={mostPopularStates}
      title={t('most-popular-states')}
      chartType="Doughnut"
      legendLabel={t('users')}
    />
  );
};

export default MostPopularStatesCard;
