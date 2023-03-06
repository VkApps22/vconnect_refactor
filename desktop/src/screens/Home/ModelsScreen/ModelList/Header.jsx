import React, { useState } from 'react';
import {
  Button,
  Chip,
  IconButton,
  InputAdornment,
  OutlinedInput,
  styled as materialStyled,
  Typography,
  withStyles,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Close, Search } from '@material-ui/icons';
import PropTypes from 'prop-types';

const Container = styled.div`
  margin: 0 79px;
  margin-bottom: 8px;
`;

const Title = materialStyled(Typography)({
  color: '#000000',
  fontSize: '1.375rem',
  fontWeight: 500,
  letterSpacing: 1,
  marginBottom: 8,
});

const SearchInput = withStyles({
  root: {
    height: 48,
    fontSize: '1rem',
    '&.Mui-focused': {
      color: '#00447A',
    },
  },
  input: {
    '&::placeholder': {
      color: 'rgba(0, 0, 0, 0.54)',
      textOverflow: 'ellipsis !important',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
  },
  notchedOutline: {
    borderColor: '#E6E9ED',
    borderRadius: '4px 0px 0px 4px',
  },
  adornedStart: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
})(OutlinedInput);

const SearchButton = withStyles(() => ({
  root: {
    height: 48,
    fontWeight: 'bold',
    textTransform: 'none',
    borderRadius: '0px 4px 4px 0px',
  },
  contained: {
    color: 'rgba(0, 0, 0, 0.38)',
    letterSpacing: 1.25,
    fontSize: '1rem',
    boxShadow: 'none',
  },
  containedPrimary: {
    color: '#fff',
  },
}))(Button);

const SearchBar = styled.div`
  align-items: center;
  display: flex;
`;

const ChipContainer = styled.div`
  margin-left: 24px;

  div {
    margin-right: 8px;
  }
`;

const Header = ({
  ratingFilter,
  handleChangeRatingFilter,
  handleChangeSearchString,
  ...props
}) => {
  const [inputValue, setInputValue] = useState('');
  const { t } = useTranslation();
  const ratingsOptions = [
    { id: 'positive', label: t('positives') },
    { id: 'negative', label: t('negatives') },
    { id: 'neutral', label: t('neutrals') },
  ];

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && event.target.nodeName === 'INPUT') {
      event.preventDefault();
      handleChangeSearchString(inputValue);
    }
  };
  return (
    <Container {...props}>
      <Title variant="subtitle2">{t('all-models')}</Title>
      <SearchBar>
        <SearchInput
          variant="outlined"
          color={inputValue.length > 0 ? 'secondary' : 'primary'}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t('search-for-products-family')}
          startAdornment={
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          }
          endAdornment={
            inputValue.length > 0 && (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    handleChangeSearchString('');
                    setInputValue('');
                  }}
                >
                  <Close />
                </IconButton>
              </InputAdornment>
            )
          }
        />
        <SearchButton
          variant="contained"
          color="primary"
          disabled={inputValue.length === 0}
          onClick={() => handleChangeSearchString(inputValue)}
        >
          {t('search')}
        </SearchButton>
        <ChipContainer>
          {ratingsOptions.map(({ id, label }) => (
            <Chip
              key={id}
              label={label}
              variant={ratingFilter === id ? 'default' : 'outlined'}
              color={ratingFilter === id ? 'secondary' : 'default'}
              onClick={() =>
                handleChangeRatingFilter(ratingFilter === id ? '' : id)
              }
            />
          ))}
        </ChipContainer>
      </SearchBar>
    </Container>
  );
};

Header.propTypes = {
  ratingFilter: PropTypes.string,
  handleChangeRatingFilter: PropTypes.func.isRequired,
  handleChangeSearchString: PropTypes.func.isRequired,
};

Header.defaultProps = {
  ratingFilter: undefined,
};

export default Header;
