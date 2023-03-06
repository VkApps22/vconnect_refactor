import React from 'react';
import { Text, View } from 'react-native';
import styled, { css } from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { ModelCard } from '../../../components';
import { selector as authSelector } from '../../../store/auth';
import { env } from '../../../config';

const MainText = styled(Text)`
  color: ${(props) => props.theme.text.primary};
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0.15px;
  line-height: 24px;
  margin-bottom: 16px;
  text-transform: uppercase;
  ${(props) =>
    props.$padding &&
    css`
      margin-left: 17px;
    `}
`;

const RecentSearches = styled(View)`
  background: #ffffff;
  padding: 16px 0;
`;

const EmptyText = styled(Text)`
  color: ${(props) => props.theme.text.lowEmphasis};
  font-size: 14px;
  letter-spacing: 0.25px;
  line-height: 20px;
  padding: 0 16px;
`;

const RecentViewed = ({ items }) => {
  const { t } = useTranslation();
  const { preferredName } = useSelector(authSelector);

  return (
    <RecentSearches>
      <MainText $padding>{t('recently-viewed')}</MainText>
      <View>
        {items && items.length > 0 ? (
          items.map((product, i) => (
            <ModelCard
              item={product}
              hideFavoriteButton={preferredName === env.DEFAULT_USER_NAME}
              key={product._id}
              isLastMember={i === items.length - 1}
            />
          ))
        ) : (
          <EmptyText>{t('you-didnt-look-at-any-products-recently')}</EmptyText>
        )}
      </View>
    </RecentSearches>
  );
};

RecentViewed.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      thumbnail: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.arrayOf(
        PropTypes.shape({
          language: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
        })
      ),
      family: PropTypes.arrayOf(
        PropTypes.shape({
          language: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
        })
      ),
      model: PropTypes.string,
    })
  ).isRequired,
};

export default RecentViewed;
