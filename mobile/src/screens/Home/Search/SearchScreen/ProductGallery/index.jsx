import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { Loading } from '../../../../../components';
import ProductGalleryView from './ProductGalleryView';
import {
  fetchProducts,
  selector as modelSelector,
} from '../../../../../store/model';
import { useToast } from '../../../../../hooks/toast';

const ProductGallery = () => {
  const dispatch = useDispatch();
  const { products, pending } = useSelector(modelSelector);
  const { toast } = useToast();

  useEffect(() => {
    dispatch(fetchProducts()).then(unwrapResult).catch(toast.exception);
  }, [dispatch, toast.exception]);

  return pending ? <Loading /> : <ProductGalleryView items={products || []} />;
};

export default ProductGallery;
