import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FocusAwareStatusBar } from '../../../components';
import PdfReader from './PdfViewer';

const PdfViewerScreen = ({ route }) => {
  const { url, page } = route.params;

  return (
    <>
      <FocusAwareStatusBar height={0} backgroundColor="#fff" />
      <SafeAreaView edges={['right', 'bottom', 'left']} style={{ flex: 1 }}>
        <PdfReader
          initialPage={page}
          source={{
            uri: url,
          }}
        />
      </SafeAreaView>
    </>
  );
};

PdfViewerScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      url: PropTypes.string.isRequired,
      page: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};
export default PdfViewerScreen;
