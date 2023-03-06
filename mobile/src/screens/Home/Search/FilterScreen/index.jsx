import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import FooterView from './FooterView';
import ProductListView from './ProductListView';
import FamilyListView from './FamilyListView';
import ModelListView from './ModelListView';
import {
  fetchFilterOptions,
  selector as modelSelector,
} from '../../../../store/model';
import { useToast } from '../../../../hooks/toast';
import { FocusAwareStatusBar, Divider } from '../../../../components';

const Container = styled(SafeAreaView)`
  background: #fff;
  flex: 1;
`;

const ListTitleContainer = styled(View)`
  padding: 12px 16px;
`;

const ListTitle = styled(Text)`
  font-size: 20px;
  line-height: 24px;
`;

const ListsContainer = styled(ScrollView)`
  flex: 1;
`;

const FilterScreen = ({ route }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { filterOptions } = useSelector(modelSelector);

  const { params } = route;
  const { filter } = params;

  const [data, setData] = useState({
    productList: [],
    product: null,
    familyList: [],
    family: null,
    modelsList: [],
    models: [],
  });

  const { productList, product, familyList, family, modelsList, models } = data;

  useEffect(() => {
    dispatch(fetchFilterOptions()).then(unwrapResult).catch(toast.exception);
  }, [dispatch, toast]);

  useEffect(() => {
    const newProductList = filterOptions || [];
    const newProduct = newProductList.find((p) => p.nameKey === filter.product);
    const newFamily = newProduct
      ? newProduct.families.find((p) => p.nameKey === filter.family)
      : null;
    const newModels = newFamily && filter.models ? filter.models : [];
    const newFamilyList = newProduct ? newProduct.families : [];
    const newModelList = newFamily ? newFamily.models : [];

    setData({
      productList: newProductList,
      product: newProduct,
      familyList: newFamilyList,
      family: newFamily,
      modelsList: newModelList,
      models: newModels,
    });
  }, [filterOptions, filter]);

  useEffect(() => {
    if (route.params && route.params.modelsListParam)
      setData((d) => ({
        ...d,
        models: route.params.modelsListParam,
      }));
  }, [route]);

  const disabled = !product || product.length === 0;

  const onPressClear = () => {
    setData({
      ...data,
      product: null,
      family: null,
      models: [],
    });
    navigation.navigate('Search', {
      screen: 'SearchScreen',
      params: {
        query: route.params.query,
        filter: {},
      },
    });
  };

  const onPressFilter = () =>
    navigation.navigate('Search', {
      screen: 'SearchScreen',
      params: {
        query: route.params.query,
        filter: {
          product: product ? product.nameKey : null,
          family: family ? family.nameKey : null,
          models,
        },
      },
    });

  const setProduct = (value) => {
    setData({
      ...data,
      product: value,
      familyList: value ? value.families : [],
      family: null,
      models: [],
    });
  };

  const setFamily = (value) => {
    setData({
      ...data,
      family: value,
      modelsList: value ? value.models : [],
      models: [],
    });
  };

  const setModels = (value) => setData({ ...data, models: value });

  return (
    <>
      <FocusAwareStatusBar height={0} />
      <Container edges={['right', 'bottom', 'left']}>
        <ListsContainer bounces={false}>
          <ListTitleContainer>
            <ListTitle>{t('which-product?')}</ListTitle>
          </ListTitleContainer>
          <ProductListView
            productList={productList}
            product={product}
            setProduct={setProduct}
          />
          <Divider />
          <FamilyListView
            product={product}
            familyList={familyList}
            family={family}
            setFamily={setFamily}
          />
          <Divider />
          <ModelListView
            family={family}
            modelsList={modelsList}
            models={models}
            setModels={setModels}
          />
        </ListsContainer>
        <FooterView
          disabled={disabled}
          onPressClear={onPressClear}
          onPressFilter={onPressFilter}
        />
      </Container>
    </>
  );
};

FilterScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      query: PropTypes.string.isRequired,
      filter: PropTypes.shape({
        product: PropTypes.string,
        family: PropTypes.string,
        models: PropTypes.arrayOf(PropTypes.string),
      }),
      modelsListParam: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
};

FilterScreen.defaultProps = {
  route: {
    params: {
      filter: {
        product: null,
        family: null,
        models: [],
      },
      modelsListParam: [],
    },
  },
};

export default FilterScreen;
