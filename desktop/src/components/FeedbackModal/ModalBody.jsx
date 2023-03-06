import React, { useState } from 'react';
import { Tab, Tabs } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import ModalContent from './ModalContent';

const Panel = styled.div`
  background: #fff;
  overflow-y: auto;
`;

const TabPanel = ({ children, value, index }) => (
  <Panel hidden={value !== index}>{children}</Panel>
);

TabPanel.propTypes = {
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  children: PropTypes.node,
};

TabPanel.defaultProps = {
  children: <></>,
};

const ModalBody = ({ modelId }) => {
  const { t } = useTranslation();
  const [activePanel, setActivePanel] = useState(0);

  return (
    <>
      <AppBar position="static" color="default" elevation={0}>
        <Tabs
          variant="fullWidth"
          value={activePanel}
          indicatorColor="primary"
          onChange={(_, newValue) => setActivePanel(newValue)}
        >
          <Tab label={t('total-ratings')} />
          <Tab label={t('reviews-in-pt')} />
          <Tab label={t('reviews-in-en')} />
          <Tab label={t('reviews-in-es')} />
        </Tabs>
      </AppBar>
      <TabPanel value={activePanel} index={0}>
        <ModalContent modelId={modelId} />
      </TabPanel>
      <TabPanel value={activePanel} index={1}>
        <ModalContent modelId={modelId} language="pt" />
      </TabPanel>
      <TabPanel value={activePanel} index={2}>
        <ModalContent modelId={modelId} language="en" />
      </TabPanel>
      <TabPanel value={activePanel} index={3}>
        <ModalContent modelId={modelId} language="es" />
      </TabPanel>
    </>
  );
};

ModalBody.propTypes = {
  modelId: PropTypes.string.isRequired,
};

export default ModalBody;
