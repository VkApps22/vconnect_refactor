import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';

import ExpandedNavBar from './ExpandedNavBar';
import CollapsedNavBar from './CollapsedNavBar';

const Container = styled.div`
  background: #fff;
  border-right: 2px solid transparent;
  filter: drop-shadow(1px 0 4px rgba(0, 0, 0, 0.15));
  max-height: 100vh;
  padding-top: 40px;
  transition: max-width 0.3s ease;
  width: auto;

  &:hover {
    border-right: 2px solid #30cffc;
  }

  ${(props) =>
    props.$doAnimation
      ? css`
          max-width: 315px;
        `
      : css`
          max-width: 79px;
        `}
`;

const ToggleButton = styled.div`
  background: #ffffff;
  border: 1px solid #e6e9ed;
  border-radius: 24px;
  display: flex;
  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.15));
  place-content: center;
  position: absolute;
  right: -12px;
  top: 56px;

  &:hover {
    border: 1px solid #30cffc;
    cursor: pointer;
  }

  svg {
    fill: #00a0d1;
  }
`;

const Navbar = () => {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  const [doExpand, setDoExpand] = useState(true);

  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      $doAnimation={doExpand}
    >
      {isHovered && (
        <ToggleButton onClick={() => setDoExpand(!doExpand)}>
          {doExpand ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </ToggleButton>
      )}
      {doExpand ? (
        <ExpandedNavBar activeItem={location.pathname} />
      ) : (
        <CollapsedNavBar activeItem={location.pathname} />
      )}
    </Container>
  );
};

export default Navbar;
