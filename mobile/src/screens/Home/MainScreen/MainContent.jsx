import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { unwrapResult } from '@reduxjs/toolkit';

import { fetchProducts, selector as modelSelector } from '../../../store/model';
import {
  fetchRecentViewed,
  selector as userSelector,
} from '../../../store/auth';

import { useToast } from '../../../hooks/toast';
import RecentViewed from './RecentViewed';
import ProductCarousel from './ProductCarousel';

const MainContainer = styled(View)`
  background: #e5eef4;
  margin-bottom: ${(props) => props.$scrollOffSet + 20}px;
  padding: 14px 0 32px 0;
`;

const MainContent = ({ scrollOffSet, ...props }) => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { products } = useSelector(modelSelector);
  const { recentViewed } = useSelector(userSelector);

  useEffect(() => {
    dispatch(fetchProducts()).then(unwrapResult).catch(toast.exception);
    dispatch(fetchRecentViewed()).then(unwrapResult).catch(toast.exception);
  }, [dispatch, toast.exception]);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchRecentViewed()).then(unwrapResult).catch(toast.exception);
    }, [dispatch, toast.exception])
  );

  return (
    <MainContainer $scrollOffSet={scrollOffSet} {...props}>
      {products && <ProductCarousel products={products} />}
      {recentViewed && <RecentViewed items={recentViewed} />}
    </MainContainer>
  );
};

MainContent.propTypes = {
  scrollOffSet: PropTypes.number,
};

MainContent.defaultProps = {
  scrollOffSet: 0,
};

export default MainContent;
