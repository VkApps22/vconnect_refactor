import React from 'react';
import { Divider, Typography } from '@material-ui/core';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { styled as materialStyled } from '@material-ui/core/styles';
import { useDynamicTranslation } from '../../hooks/dynamic-translation';

const Container = styled.div`
  background: #ffffff;
  border-radius: 8px;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 24px 0;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 180px;
`;

const Caption = materialStyled(Typography)({
  marginBottom: 24,
});

const StyledDivider = materialStyled(Divider)({
  marginRight: 24,
});

const Overview = ({ content, ...props }) => {
  const { dt } = useDynamicTranslation();
  return (
    <Container {...props}>
      <Content>
        {content.map(
          ({ header, title, body, bottom }, index) =>
            title && (
              <React.Fragment key={header ? dt(header) : dt(title)}>
                <CardContainer>
                  {header && <Caption variant="caption">{dt(header)}</Caption>}
                  <Typography variant="subtitle2">{dt(title)}</Typography>
                  <Typography variant="h5">{body}</Typography>
                  <Typography variant="caption">{bottom}</Typography>
                </CardContainer>
                {index !== content.length - 1 && (
                  <StyledDivider orientation="vertical" flexItem />
                )}
              </React.Fragment>
            )
        )}
      </Content>
    </Container>
  );
};

Overview.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.oneOfType([
        PropTypes.arrayOf(
          PropTypes.shape({
            language: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
          })
        ),
        PropTypes.string,
      ]),
      title: PropTypes.oneOfType([
        PropTypes.arrayOf(
          PropTypes.shape({
            language: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
          })
        ),
        PropTypes.string,
      ]),
      body: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      bottom: PropTypes.string,
    })
  ).isRequired,
};

export default Overview;
