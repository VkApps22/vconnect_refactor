import React from 'react';
import styled, { css } from 'styled-components/native';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import FamilyCard from '../../../../../components/FamilyCard/FamilyCard';
import { useDynamicTranslation } from '../../../../../hooks/dynamic-translation';
import { TouchableDebounce } from '../../../../../components';

const Container = styled(View)`
  background: #ffffff;
  flex-grow: 0;
  padding: 16px 0 0 0;
`;
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

const ShowAllButton = styled(View)`
  align-items: center;
  font-size: 12px;
  letter-spacing: 0.4px;
  line-height: 16px;
  padding: 20px 0 16px 0;
  right: 0;
  top: 0;
`;

const ShowAllTitle = styled(Text)`
  color: ${(props) => props.theme.text.secundary};
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1.25px;
  line-height: 16px;
`;

const FamilyCardContainer = styled(View)`
  flex: 1;
  flex-grow: 0;
`;

const ProductCard = ({ nameKey, name, items, onPress, ...props }) => {
  const { t } = useTranslation();
  const { dt } = useDynamicTranslation();
  return (
    <Container {...props}>
      <MainText $padding>
        {t('product-card-title', { title: dt(name) })}
      </MainText>
      <FamilyCardContainer>
        {items.map((product) => (
          <FamilyCard
            nameKey={product.nameKey}
            name={product.name}
            image={product.thumbnail}
            key={product.id}
            onPress={(familyKey) =>
              onPress({
                product: nameKey,
                family: familyKey,
              })
            }
          />
        ))}
      </FamilyCardContainer>
      <TouchableDebounce
        onPress={() =>
          onPress({
            product: nameKey,
          })
        }
      >
        <ShowAllButton>
          <ShowAllTitle>{t('view-all-items')}</ShowAllTitle>
        </ShowAllButton>
      </TouchableDebounce>
    </Container>
  );
};

ProductCard.propTypes = {
  nameKey: PropTypes.string.isRequired,
  name: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      language: PropTypes.string,
    })
  ).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string,
          language: PropTypes.string,
        })
      ),
      description: PropTypes.string,
      thumbnail: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      id: PropTypes.string,
    })
  ).isRequired,
  onPress: PropTypes.func,
};

ProductCard.defaultProps = {
  onPress: () => {},
};

export default ProductCard;
