import React, { useEffect, useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled, { css } from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import Animated from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { ContactCard, FocusAwareStatusBar, Divider } from '../../../components';
import { ContactIllustration } from '../../../components/icons';
import { useDynamicTranslation } from '../../../hooks/dynamic-translation';
import LinksBar from './LinksBar';
import { selector as userSelector } from '../../../store/auth';
import { fetch, selector as contactSelector } from '../../../store/contact';

const Container = styled(SafeAreaView)`
  background: #e5eef4;
  flex: 1;
`;

const Header = styled(View)`
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
  padding: 16px;
`;

const HeaderTitle = styled(Text)`
  color: ${(props) => props.theme.text.primary};
  font-size: 20px;
  letter-spacing: 0.15px;
  line-height: 24px;
`;

const IllustrationContainer = styled(Animated.View)`
  align-items: center;
  justify-content: center;
  padding: 32px;
`;

const Category = styled(View)`
  background: #fff;
  padding-bottom: 32px;
  ${(props) =>
    !props.$isFirst &&
    css`
      margin-top: 16px;
    `}
`;

const CategoryTitle = styled(Text)`
  color: ${(props) => props.theme.text.primary};
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.15px;
  line-height: 24px;
  padding: 16px;
  text-transform: uppercase;
`;

const ContactDivider = styled(Divider)`
  color: #e6e9ed;
  margin-bottom: 24px;
`;

const Content = styled(ScrollView)`
  flex: 1;
`;

const PlaceContainer = styled(View)`
  align-items: center;
  flex-direction: row;
  padding-left: 16px;
`;

const PlaceTitle = styled(Text)`
  color: ${(props) => props.theme.text.secundary};
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.15px;
  line-height: 24px;
  padding: 11px 8px;
`;

const groupBy = (list, groupField) => {
  return list.reduce((acc, item) => {
    const tempArray = acc;
    const isInArray = tempArray.findIndex(
      (x) => x.key === item[`${groupField}Key`]
    );
    if (isInArray === -1) {
      tempArray.push({
        key: item[`${groupField}Key`],
        name: item[groupField],
        items: [item],
      });
    } else {
      const categoryTemp = tempArray[isInArray];
      tempArray[isInArray] = {
        ...categoryTemp,
        items: [...categoryTemp.items, item],
      };
    }

    return tempArray;
  }, []);
};

const ContactScreen = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { dt } = useDynamicTranslation();
  const { country, state } = useSelector(userSelector);
  const { contacts } = useSelector(contactSelector);
  const contactsForSelectedLanguage = useMemo(
    () => contacts.filter((contact) => contact.language === i18n.languages[0]),
    [contacts, i18n.languages]
  );
  const contactsPerCategory = useMemo(
    () => groupBy(contactsForSelectedLanguage, 'category'),
    [contactsForSelectedLanguage]
  );

  useEffect(() => {
    dispatch(fetch({ country, state, language: i18n.languages[0] }));
  }, [dispatch, country, state, i18n.languages]);

  const scrollY = new Animated.Value(0);
  const illustrationPos = Animated.interpolateNode(scrollY, {
    inputRange: [-10, 0, 1, 2],
    outputRange: [0, 0, 1, 1.5],
  });

  return (
    <>
      <FocusAwareStatusBar barStyle="dark" backgroundColor="#fff" />
      <Container edges={['right', 'bottom', 'left']}>
        <Header>
          <HeaderTitle>{t('contact')}</HeaderTitle>
        </Header>
        <Content
          bounces={false}
          onScroll={(e) => {
            scrollY.setValue(e.nativeEvent.contentOffset.y);
          }}
          scrollEventThrottle={1}
          decelerationRate="fast"
        >
          <IllustrationContainer
            style={{
              transform: [
                {
                  translateY: illustrationPos,
                },
              ],
            }}
          >
            <ContactIllustration />
          </IllustrationContainer>
          {contactsPerCategory.map(
            ({ key: categoryKey, name: categoryName, items }, index) => {
              const contactsPerPlace = groupBy(items, 'place');
              return (
                <Category key={categoryKey} $isFirst={index === 0}>
                  <CategoryTitle>{dt(categoryName)}</CategoryTitle>
                  <ContactDivider />
                  {contactsPerPlace.map(
                    ({ name: placeName, items: placeItems }) => (
                      <View key={placeItems[0]._id}>
                        {placeName.length > 0 && (
                          <PlaceContainer>
                            <MaterialCommunityIcons
                              name="map-marker-outline"
                              size={16}
                              color="#00a0d1"
                            />
                            <PlaceTitle>{dt(placeName)}</PlaceTitle>
                          </PlaceContainer>
                        )}
                        {placeItems.map(
                          (
                            { _id, name, phones, email, description },
                            placeItemIndex
                          ) => (
                            <ContactCard
                              key={_id}
                              name={name}
                              isFirst={placeItemIndex === 0}
                              isLast={placeItemIndex === placeItems.length - 1}
                              isPlaceShowing={placeName.length > 0}
                              description={
                                description.length > 0 ? dt(description) : ''
                              }
                              phones={phones}
                              email={email}
                            />
                          )
                        )}
                      </View>
                    )
                  )}
                </Category>
              );
            }
          )}
          <LinksBar />
        </Content>
      </Container>
    </>
  );
};

export default ContactScreen;
