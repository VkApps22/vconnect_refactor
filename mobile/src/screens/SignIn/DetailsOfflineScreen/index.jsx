import React, { useEffect } from 'react';
import { Platform, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import * as Sharing from 'expo-sharing';

import { Loading, ImageCarousel, Button, Divider } from '../../../components';
import { useDynamicTranslation } from '../../../hooks/dynamic-translation';
import DetailsMenu from '../../Details/DetailsScreen/DetailsMenu';
import { fetchPack, selector as offlineSelector } from '../../../store/offline';
import { useToast } from '../../../hooks/toast';

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
  margin: 24px 0;
`;

const DetailsScreen = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { t } = useTranslation();
  const { dt } = useDynamicTranslation();
  const { toast } = useToast();
  const { model, images, manual, manualUri, pending } = useSelector(
    offlineSelector
  );

  const { _id: modelId } = route.params.product;

  useEffect(() => {
    dispatch(fetchPack({ modelId })).then(unwrapResult).catch(toast.exception);
  }, [dispatch, modelId, toast.exception]);

  const downloadButton = () => {
    if (Platform.OS === 'android')
      FileSystem.getContentUriAsync(manualUri).then((uri) => {
        IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
          data: uri,
          flags: 1,
        });
      });
    else Sharing.shareAsync(manualUri);
  };

  const onSectionPress = (page) =>
    navigation.navigate('PdfViewerOfflineScreen', {
      page,
      url: manualUri,
    });

  return (
    <SafeAreaView edges={['right', 'bottom', 'left']} style={{ flex: 1 }}>
      <ScrollView
        bounces={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      >
        {pending && <Loading />}
        {!pending && model && (
          <>
            <ImageCarousel images={images} />
            <DescriptionContainer>
              <FamilyTitle>{dt(model.family)}</FamilyTitle>
              <ModelTitle>{`${t('model')} ${model.model}`}</ModelTitle>
              <Divider />
              <DescriptionText>{dt(model.description)}</DescriptionText>
              <Divider />
              <DownloadButton mode="contained" onPress={downloadButton}>
                {t('download-manual')}
              </DownloadButton>
            </DescriptionContainer>
            <DetailsMenu manual={manual} onSectionPress={onSectionPress} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
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
