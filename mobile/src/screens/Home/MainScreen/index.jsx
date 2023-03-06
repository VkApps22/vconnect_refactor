import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { FocusAwareStatusBar, SearchInput } from '../../../components';
import MainContent from './MainContent';
import HeaderContent from './HeaderContent';

const Container = styled(SafeAreaView)`
  background: #e5eef4;
  flex: 1;
`;

const SearchContainer = styled(View)`
  background: #00447a;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border-color: #00447a;
  padding: 12px 16px 16px 16px;
`;

const AnimatedHeader = styled(Animated.View)`
  background: #00447a;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

const MainScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [query, setQuery] = useState('');

  return (
    <>
      <FocusAwareStatusBar barStyle="light" backgroundColor="#00447a" />
      <Container edges={['right', 'bottom', 'left']}>
        <AnimatedHeader>
          <HeaderContent />
          <SearchContainer>
            <SearchInput
              queryValue={query}
              setQueryValue={(value) => setQuery(value)}
              placeholder={t('search-by-products-families')}
              onSubmitSearch={(value) => {
                navigation.navigate('Search', {
                  screen: 'SearchScreen',
                  params: {
                    query: value,
                    queryDate: new Date().getTime(),
                    filter: undefined,
                  },
                });
                setQuery('');
              }}
              onClearPress={() => {
                setQuery('');
              }}
            />
          </SearchContainer>
        </AnimatedHeader>
        <ScrollView
          bounces={false}
          scrollEventThrottle={1}
          decelerationRate="fast"
        >
          <MainContent />
        </ScrollView>
      </Container>
    </>
  );
};

export default MainScreen;
