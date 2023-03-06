import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { styled as materialStyled } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
import { Chart } from '../../../components';
import { fetchMostViewedModels, selector } from '../../../store/analytics';
import { useDynamicTranslation } from '../../../hooks/dynamic-translation';
import { fetchFamilySuggestions } from '../../../store/model';

const CustomAutoComplete = materialStyled(Autocomplete)({
  width: 280,
});

const MostViewedModelsCard = () => {
  const { t, i18n } = useTranslation();
  const { dt } = useDynamicTranslation();
  const dispatch = useDispatch();
  const [modelsFilter, setModelsFilter] = useState({
    family: '',
    period: 'all',
    date: moment(),
  });
  const [familyQuery, setFamilyQuery] = useState('');
  const [familyOptions, setFamilyOptions] = useState([]);

  const { mostViewedModels } = useSelector(selector);

  useEffect(() => {
    dispatch(fetchMostViewedModels(modelsFilter));
  }, [dispatch, modelsFilter]);

  useEffect(() => {
    let mounted = true;
    dispatch(
      fetchFamilySuggestions({
        language: i18n.languages[0],
        query: familyQuery,
      })
    )
      .then(unwrapResult)
      .then((value) => mounted && setFamilyOptions(value));

    return () => {
      mounted = false;
    };
  }, [dispatch, i18n.languages, familyQuery]);

  const renderFamilySearch = () => (
    <CustomAutoComplete
      options={familyOptions}
      getOptionLabel={(option) => dt(option.family)}
      getOptionSelected={(option, value) =>
        option.familyKey === value.familyKey
      }
      inputValue={familyQuery}
      onInputChange={(_, newInputValue) => setFamilyQuery(newInputValue)}
      onChange={(_, newValue) =>
        setModelsFilter({
          ...modelsFilter,
          family: newValue ? newValue.familyKey : '',
        })
      }
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={t('search-for-families')}
          variant="outlined"
        />
      )}
    />
  );

  return (
    <Chart
      period={modelsFilter.period}
      setPeriod={(period) => setModelsFilter({ ...modelsFilter, period })}
      date={modelsFilter.date}
      setDate={(date) => setModelsFilter({ ...modelsFilter, date })}
      dataSeries={mostViewedModels}
      title={t('most-viewed-models')}
      searchRenderFunc={renderFamilySearch}
      chartType="Bar"
    />
  );
};

export default MostViewedModelsCard;
