import React from 'react';
import styled from 'styled-components';
import MostPopularStatesCard from './MostPopularStatesCard';
import OverviewCard from './OverviewCard';
import MostViewedProductsCard from './MostViewedProductsCard';
import MostViewedFamiliesCard from './MostViewedFamiliesCard';
import MostViewedModelsCard from './MostViewedModelsCard';

const Container = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  padding-top: 40px;
  width: 100%;

  & > * {
    margin-bottom: 24px;
  }
`;

const AnalyticsScreen = () => {
  return (
    <Container>
      <OverviewCard />
      <MostViewedProductsCard />
      <MostViewedFamiliesCard />
      <MostViewedModelsCard />
      <MostPopularStatesCard />
    </Container>
  );
};

export default AnalyticsScreen;
