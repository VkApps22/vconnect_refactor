import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Overview } from '../../../components';
import { fetchOverview, selector } from '../../../store/analytics';

const OverviewCard = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { overview } = useSelector(selector);

  useEffect(() => {
    dispatch(fetchOverview());
  }, [dispatch]);

  return (
    <Overview
      content={[
        {
          header: t('most-viewed-product'),
          title: overview.monthlyMostViewedProduct.title,
          body: overview.monthlyMostViewedProduct.value,
          bottom: t('views-this-month'),
        },
        {
          header: t('most-viewed-family'),
          title: overview.monthlyMostViewedFamily.title,
          body: overview.monthlyMostViewedFamily.value,
          bottom: t('views-this-month'),
        },
        {
          header: t('most-viewed-model'),
          title: overview.monthlyMostViewedModel.title,
          body: overview.monthlyMostViewedModel.value,
          bottom: t('views-this-month'),
        },
        {
          header: t('most-popular-place'),
          title: overview.mostPopularState.title,
          body: overview.mostPopularState.value,
          bottom: t('of-total-users'),
        },
      ]}
    />
  );
};

export default OverviewCard;
