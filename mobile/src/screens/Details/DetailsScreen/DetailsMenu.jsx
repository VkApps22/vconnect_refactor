import React from 'react';
import styled from 'styled-components/native';
import { Linking, View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import { DetailsMenuItem } from '../../../components';

const Container = styled(View)`
  margin-bottom: 32px;
`;

const DetailsMenu = ({ playlist, manual, onSectionPress }) => {
  const { t } = useTranslation();
  return (
    <Container>
      {playlist && (
        <DetailsMenuItem
          onPress={() => Linking.openURL(playlist)}
          leftIcon={<Icon name="slideshow" size={24} color="#00A0D1" />}
          title={t('watch-videos')}
        />
      )}
      {manual &&
        manual.sections.map((section) => (
          <DetailsMenuItem
            onPress={() => onSectionPress(section.page)}
            key={section.title}
            leftIcon={<Icon name={section.icon} size={24} color="#00A0D1" />}
            title={section.title}
          />
        ))}
    </Container>
  );
};

DetailsMenu.propTypes = {
  onSectionPress: PropTypes.func,
  playlist: PropTypes.string,
  manual: PropTypes.shape({
    sections: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        icon: PropTypes.string,
        page: PropTypes.number,
      })
    ),
  }),
};

DetailsMenu.defaultProps = {
  onSectionPress: () => {},
  playlist: undefined,
  manual: undefined,
};

export default DetailsMenu;
