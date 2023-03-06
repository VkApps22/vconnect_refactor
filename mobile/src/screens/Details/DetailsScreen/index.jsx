import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigation, CommonActions } from '@react-navigation/native';
import {
  Augmentify,
  Button,
  FocusAwareStatusBar,
  ImageCarousel,
  Loading,
  Divider,
} from '../../../components';
import arImage from '../../../../assets/images/button_ar_cube.png';

import { useDynamicTranslation } from '../../../hooks/dynamic-translation';
import TopBar from './TopBar';
import DetailsMenu from './DetailsMenu';
import {
  fetchDetails,
  fetchImages,
  selector as modelSelector,
} from '../../../store/model';
import {
  download,
  fetch,
  selector as manualSelector,
  slice,
} from '../../../store/manual';
import { useToast } from '../../../hooks/toast';
import { selector as authSelector } from '../../../store/auth';
import { env } from '../../../config';

const DescriptionContainer = styled(View)`
  background: #fff;
  margin-bottom: 16px;
  padding: 16px 16px 0 16px;
`;

const FamilyTitle = styled(Text)`
  color: ${(props) => props.theme.text.primary};
  font-size: 24px;
  letter-spacing: 0.18px;
  line-height: 28px;
  margin-bottom: 8px;
`;

const ModelTitle = styled(Text)`
  color: ${(props) => props.theme.text.secundary};
  font-size: 20px;
  letter-spacing: 0.15px;
  line-height: 24px;
  margin-bottom: 24px;
`;

const DescriptionText = styled(Text)`
  color: ${(props) => props.theme.text.mediumEmphasis};
  font-size: 16px;
  letter-spacing: 0.5px;
  line-height: 28px;
  margin: 24px 0;
`;

const DownloadButton = styled(Button)`
  height: 40px;
  margin: 24px 0 12px;
`;

const ArButton = styled(Button)`
  height: 40px;
  margin: 0 0;
  padding: 0;
  background-color: ${(props) => props.theme.text.secundary};
  display: flex;
  justify-content: center;
`;

const ArImage = styled(Image)`
  height: 18px
  width: 18px
`;

const ArText = styled(Text)`
  color: ${(props) => props.theme.text.secundary};
  text-align: right;
  font-size: 8px;
  margin-top: 2px;
  margin-bottom: 24px;
`;

const DetailsScreen = ({ route }) => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [manualId, setManualId] = useState();
  const { model, images, pending, pendingImages } = useSelector(modelSelector);
  const { manual } = useSelector(manualSelector);
  const { dt } = useDynamicTranslation();
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const { _id: modelId } = route.params.product;
  const [augmentifyExperience, setAugmentifyExperience] = useState();
  const { preferredName } = useSelector(authSelector);

  useEffect(() => {
    dispatch(fetchDetails({ modelId }))
      .then(unwrapResult)
      .catch(toast.exception);
  }, [dispatch, modelId, toast.exception]);

  useEffect(() => {
    dispatch(fetchImages({ modelId }))
      .then(unwrapResult)
      .catch(toast.exception);
  }, [dispatch, modelId, toast.exception]);

  useEffect(() => {
    const hasAugmentifyExperience = model && model.augmentifyId;

    if (hasAugmentifyExperience) {
      Augmentify?.hasSupport((hasSupport) =>
        setAugmentifyExperience(hasSupport ? model.augmentifyId : undefined)
      );
    } else {
      setAugmentifyExperience(undefined);
    }
  }, [model]);

  useEffect(() => {
    setManualId(
      model && model.manual && model.manual.length > 0
        ? dt(model.manual, true)
        : undefined
    );
  }, [dt, model, i18n.languages]);

  useEffect(() => {
    if (manualId)
      dispatch(fetch({ manualId })).then(unwrapResult).catch(toast.exception);
    else dispatch(slice.actions.reset());
  }, [manualId, dispatch, toast.exception]);

  const downloadButton = () =>
    dispatch(download({ manualId })).then(unwrapResult).catch(toast.exception);

  const arButton = () => Augmentify.openExperience(augmentifyExperience);

  const onSectionPress = (page) => {
    navigation.navigate('Details', {
      screen: 'PdfViewerScreen',
      params: {
        url: `${env.HOST_ADDRESS}/v1/public/manual-file?manualId=${manualId}`,
        page,
      },
    });
  };

  useEffect(() => {
    if (model)
      navigation.dispatch((oldState) => {
        const currentRoute = oldState.routes.find(
          (r) => r.name === 'DetailsScreen'
        );
        const previousRoutes = oldState.routes.filter(
          (r) => r !== currentRoute && r.name !== 'FeedbackScreen'
        );

        return CommonActions.reset({
          ...oldState,
          routes: [
            ...previousRoutes,
            {
              name: 'FeedbackScreen',
              params: {
                model,
              },
            },
            currentRoute,
          ],
          index: previousRoutes.length + 1,
        });
      });
  }, [navigation, model]);

  return (
    <>
      <FocusAwareStatusBar backgroundColor="#fff" />
      <SafeAreaView edges={['right', 'bottom', 'left']} style={{ flex: 1 }}>
        <ScrollView bounces={false} contentContainerStyle={{ flexGrow: 1 }}>
          {preferredName !== env.DEFAULT_USER_NAME && (
            <TopBar modelId={modelId} />
          )}
          {pending && <Loading />}
          {!pending && model && (
            <>
              <ImageCarousel
                images={images}
                pending={pendingImages}
                hasAr={augmentifyExperience}
                onArPressed={arButton}
              />
              <DescriptionContainer>
                <FamilyTitle>{dt(model.family)}</FamilyTitle>
                <ModelTitle>{`${t('model')} ${model.model}`}</ModelTitle>
                <Divider />
                <DescriptionText>{dt(model.description)}</DescriptionText>
                <Divider />
                {manualId && (
                  <DownloadButton mode="contained" onPress={downloadButton}>
                    {t('download-manual')}
                  </DownloadButton>
                )}
                {augmentifyExperience && (
                  <>
                    <ArButton mode="contained" onPress={arButton}>
                      <ArImage
                        source={arImage}
                        style={{ resizeMode: 'contain' }}
                      />
                      <Text>{t('augmentify-ar')}</Text>
                    </ArButton>
                    <ArText>{t('augmentify-powered')}</ArText>
                  </>
                )}
              </DescriptionContainer>
              <DetailsMenu
                playlist={model.playlist}
                manual={manual}
                onSectionPress={onSectionPress}
              />
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

DetailsScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      product: PropTypes.shape({
        _id: PropTypes.string,
      }),
    }).isRequired,
    name: PropTypes.string,
  }).isRequired,
};

export default DetailsScreen;
