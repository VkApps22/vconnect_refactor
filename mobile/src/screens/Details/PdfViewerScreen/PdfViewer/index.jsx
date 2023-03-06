/* eslint-disable */

import React, { PureComponent } from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';
import { WebView } from 'react-native-webview';
import styled from 'styled-components/native';
import { cacheDirectory } from 'expo-file-system';
import {
  getWebviewSource,
  removeFilesAsync,
  writeWebViewComponentFiles,
} from './unpacker';

const Container = styled(View)`
  background-color: rgba(64, 64, 64, 1);
  flex: 1;
  height: 100%;
  justify-content: center;
  position: absolute;
  width: 100%;
`;

const StyledActivityIndicator = styled(ActivityIndicator).attrs({
  color: '#fff',
  size: 75,
})``;

const Loader = () => (
  <Container>
    <StyledActivityIndicator />
  </Container>
);

const originWhitelist = [
  '*',
  'http://*',
  'https://*',
  'file://*',
  'data:*',
  'content:*',
];

class PdfReader extends PureComponent {
  state = {
    ready: false,
    renderedOnce: false,
  };

  init = async () => {
    try {
      await writeWebViewComponentFiles();
      this.setState({ ready: true });
    } catch (error) {
      alert(`Sorry, an error occurred. ${error.message}`);
      console.error(error);
    }
  };

  componentDidMount() {
    this.init();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.source.uri !== this.props.source.uri) {
      this.setState({ ready: false });
      this.init();
    }
  }

  componentWillUnmount() {
    try {
      removeFilesAsync();
    } catch (error) {
      alert(`Error on removing file. ${error.message}`);
      console.error(error);
    }
  }

  render() {
    const { ready, renderedOnce } = this.state;
    const { source, initialPage, onError, onLoadEnd } = this.props;

    return (
      <Container>
        <WebView
          originWhitelist={originWhitelist}
          onLoad={() => this.setState({ renderedOnce: true })}
          onLoadEnd={onLoadEnd}
          onError={onError}
          onHttpError={onError}
          source={
            ready
              ? getWebviewSource({ uri: source.uri, initialPage })
              : undefined
          }
          allowFileAccess={true}
          allowFileAccessFromFileURLs={true}
          allowUniversalAccessFromFileURLs={true}
          scalesPageToFit={Platform.select({ android: false })}
          mixedContentMode={'always'}
          sharedCookiesEnabled={false}
          startInLoadingState={true}
          incognito={true}
          cacheEnabled={false}
          cacheMode={'LOAD_NO_CACHE'}
          androidLayerType={'hardware'}
          allowingReadAccessToURL={cacheDirectory}
        />
        {(!ready || !renderedOnce) && <Loader />}
      </Container>
    );
  }
}

export default PdfReader;
