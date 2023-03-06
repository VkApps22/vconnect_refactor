import React from 'react';
import styled, { css } from 'styled-components/native';
import { Linking, Text, View } from 'react-native';
import Proptypes from 'prop-types';
import { ContactCallIcon, EmailButtonIcon } from '../icons';
import TouchableDebounce from '../TouchableDebounce';

const Container = styled(View)`
  align-items: center;
  flex-direction: row;
`;

const ContactInfo = styled(View)`
  flex: 1;
`;

const ContactDescription = styled(Text)`
  color: ${(props) => props.theme.text.mediumEmphasis};
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 24px;
  margin-bottom: 8px;
`;

const ContactPhones = styled(View)``;

const ContactPhone = styled(Text)`
  color: ${(props) => props.theme.text.highEmphasis};
  font-size: 16px;
  letter-spacing: 0.5px;
  line-height: 28px;
  margin-bottom: 4px;
`;

const ContactEmail = styled(Text)`
  color: ${(props) => props.theme.text.mediumEmphasis};
  font-size: 14px;
  letter-spacing: 0.25px;
  line-height: 20px;
`;

const ContactName = styled(Text)`
  font-size: 20px;
  letter-spacing: 0.15px;
  line-height: 24px;
  margin-bottom: 8px;
`;

const InfoContainer = styled(View)`
  align-items: center;
  flex: 1;
  flex-direction: row;
  margin-left: 48px;

  ${(props) =>
    props.$isPlaceShowing &&
    css`
      border-top-color: #e7efea;
      border-top-width: 1px;
      padding: 24px 0;
    `}

  ${(props) =>
    !props.$isPlaceShowing &&
    props.$isFirst &&
    css`
      padding: 0 0 24px 0;
    `}
  
  ${(props) =>
    !props.$isPlaceShowing &&
    !props.$isFirst &&
    props.$isLast &&
    css`
      padding: 24px 0 0 0;
    `}
  
  ${(props) =>
    !props.$isPlaceShowing &&
    !props.$isFirst &&
    css`
      border-top-color: #e7efea;
      border-top-width: 1px;
    `}
  
    ${(props) =>
    !props.$isPlaceShowing &&
    !props.$isFirst &&
    !props.$isLast &&
    css`
      padding: 24px 0;
    `}
`;

const ContactButton = styled(TouchableDebounce)``;

const StyledEmailButtonIcon = styled(EmailButtonIcon)`
  margin-right: 12px;
`;

const StyledContactCallIcon = styled(ContactCallIcon)`
  margin-right: 16px;
`;

const ContactCard = ({
  name,
  description,
  phones,
  email,
  isPlaceShowing,
  isFirst,
  isLast,
}) => (
  <Container>
    <InfoContainer
      $isPlaceShowing={isPlaceShowing}
      $isFirst={isFirst}
      $isLast={isLast}
    >
      <ContactInfo>
        {description.length > 0 && (
          <ContactDescription>{description}</ContactDescription>
        )}
        <ContactName>{name}</ContactName>
        <ContactPhones>
          {phones.map((phone) => (
            <ContactPhone key={phone}>{phone}</ContactPhone>
          ))}
        </ContactPhones>
        <ContactEmail>{email}</ContactEmail>
      </ContactInfo>
      <ContactButton onPress={() => Linking.openURL(`mailto:${email}`)}>
        <StyledEmailButtonIcon />
      </ContactButton>
      <ContactButton onPress={() => Linking.openURL(`tel:${phones[0]}`)}>
        <StyledContactCallIcon />
      </ContactButton>
    </InfoContainer>
  </Container>
);

ContactCard.propTypes = {
  name: Proptypes.string.isRequired,
  description: Proptypes.string,
  phones: Proptypes.arrayOf(Proptypes.string).isRequired,
  email: Proptypes.string.isRequired,
  isPlaceShowing: Proptypes.bool,
  isFirst: Proptypes.bool,
  isLast: Proptypes.bool,
};

ContactCard.defaultProps = {
  description: '',
  isPlaceShowing: true,
  isFirst: false,
  isLast: false,
};

export default ContactCard;
