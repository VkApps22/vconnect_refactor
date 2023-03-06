import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { fetchMostViewedProducts, selector } from '../../../store/analytics';
import { Chart } from '../../../components';

const MostViewedProductsCard = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { mostViewedProducts } = useSelector(selector);
  const [productsFilter, setProductsFilter] = useState({
    period: 'all',
    date: moment(),
  });

  useEffect(() => {
    dispatch(fetchMostViewedProducts(productsFilter));
  }, [dispatch, productsFilter]);

  return (
    <Chart
      period={productsFilter.period}
      setPeriod={(period) => setProductsFilter({ ...productsFilter, period })}
      date={productsFilter.date}
      setDate={(date) => setProductsFilter({ ...productsFilter, date })}
      dataSeries={mostViewedProducts}
      title={t('most-viewed-products')}
      chartType="Bar"
    />
  );
};

export default MostViewedProductsCard;
