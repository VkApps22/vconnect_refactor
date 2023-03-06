import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { TextField } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import { styled as materialStyled } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
import { Chart } from '../../../components';
import { useDynamicTranslation } from '../../../hooks/dynamic-translation';
import { fetchMostViewedFamilies, selector } from '../../../store/analytics';
import { fetchSuggestions } from '../../../store/model';

const CustomAutoComplete = materialStyled(Autocomplete)({
  width: 280,
});

const MostViewedFamiliesCard = () => {
  const { t, i18n } = useTranslation();
  const { dt } = useDynamicTranslation();
  const dispatch = useDispatch();

  const { mostViewedFamilies } = useSelector(selector);
  const [productQuery, setProductQuery] = useState('');
  const [productOptions, setProductOptions] = useState([]);
  const [familiesFilter, setFamiliesFilter] = useState({
    product: '',
    period: 'all',
    date: moment(),
  });

  useEffect(() => {
    dispatch(fetchMostViewedFamilies(familiesFilter));
  }, [dispatch, familiesFilter]);

  useEffect(() => {
    let mounted = true;
    dispatch(
      fetchSuggestions({
        language: i18n.languages[0],
        query: productQuery,
      })
    )
      .then(unwrapResult)
      .then((value) => mounted && setProductOptions(value));

    return () => {
      mounted = false;
    };
  }, [dispatch, i18n.languages, productQuery]);

  const renderProductSearch = () => (
    <CustomAutoComplete
      options={productOptions}
      getOptionLabel={(option) => dt(option.name)}
      getOptionSelected={(option, value) => option.nameKey === value.nameKey}
      inputValue={productQuery}
      onInputChange={(_, newInputValue) => setProductQuery(newInputValue)}
      onChange={(_, newValue) =>
        setFamiliesFilter({
          ...familiesFilter,
          product: newValue ? newValue.nameKey : '',
        })
      }
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={t('search-for-products')}
          variant="outlined"
        />
      )}
    />
  );

  return (
    <Chart
      period={familiesFilter.period}
      setPeriod={(period) => setFamiliesFilter({ ...familiesFilter, period })}
      date={familiesFilter.date}
      setDate={(date) => setFamiliesFilter({ ...familiesFilter, date })}
      dataSeries={mostViewedFamilies}
      title={t('most-viewed-families')}
      searchRenderFunc={renderProductSearch}
      chartType="Doughnut"
      legendLabel={t('views')}
    />
  );
};

export default MostViewedFamiliesCard;
