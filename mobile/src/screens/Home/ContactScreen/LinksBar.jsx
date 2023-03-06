import React from 'react';
import { Linking, View } from 'react-native';
import styled from 'styled-components/native';
import {
  FacebookBox,
  InstagramBox,
  LinkedinBox,
  TwitterBox,
  WebIconBox,
  YoutubeBox,
} from '../../../components/icons';
import { useDynamicTranslation } from '../../../hooks/dynamic-translation';
import { TouchableDebounce } from '../../../components';

const Container = styled(View)`
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 59px;
  padding: 32px 0;
`;

const Linkedin = styled(LinkedinBox)`
  margin: 0 12px;
`;

const Facebook = styled(FacebookBox)`
  margin: 0 12px;
`;

const Twitter = styled(TwitterBox)`
  margin: 0 12px;
`;

const Instagram = styled(InstagramBox)`
  margin: 0 12px;
`;

const Youtube = styled(YoutubeBox)`
  margin: 0 12px;
`;

const WebIcon = styled(WebIconBox)`
  margin: 0 12px;
`;

const LinksBar = () => {
  const { dt } = useDynamicTranslation();

  const languageLinks = [
    {
      language: 'pt',
      value: {
        links: {
          linkedin: 'https://www.linkedin.com/company/vulkan-do-brasil',
          facebook: 'https://www.facebook.com/VulkanDoBrasil/',
          instagram: 'https://www.instagram.com/vulkandobrasil/?hl=pt',
          youtube: 'https://www.youtube.com/channel/UCS5L3CJhVEoh9jKcwFS0w1A',
          site: 'https://www.vulkan.com/pt-br/holding',
        },
      },
    },
    {
      language: 'en',
      value: {
        links: {
          linkedin: 'https://www.linkedin.com/company/vulkangroup',
          facebook:
            'https://www.facebook.com/pages/category/Commercial---Industrial/Vulkan-Southern-Hemisphere-2516385835052490/',
          twitter: 'https://twitter.com/southernvulkan?lang=en',
          site: 'https://www.vulkan.com/en-us/holding',
        },
      },
    },
    {
      language: 'es',
      value: {
        links: {
          linkedin: 'https://www.linkedin.com/company/vulkangroup',
          facebook:
            'https://www.facebook.com/pages/category/Commercial---Industrial/Vulkan-Southern-Hemisphere-2516385835052490/',
          site: 'https://www.vulkan.com/es-es/holding',
        },
      },
    },
  ];
  const { linkedin, facebook, instagram, twitter, youtube, site } = dt(
    languageLinks
  ).links;

  return (
    <Container>
      {linkedin && (
        <TouchableDebounce onPress={() => Linking.openURL(linkedin)}>
          <Linkedin />
        </TouchableDebounce>
      )}
      {facebook && (
        <TouchableDebounce onPress={() => Linking.openURL(facebook)}>
          <Facebook />
        </TouchableDebounce>
      )}
      {twitter && (
        <TouchableDebounce onPress={() => Linking.openURL(twitter)}>
          <Twitter />
        </TouchableDebounce>
      )}
      {instagram && (
        <TouchableDebounce onPress={() => Linking.openURL(instagram)}>
          <Instagram />
        </TouchableDebounce>
      )}
      {youtube && (
        <TouchableDebounce onPress={() => Linking.openURL(youtube)}>
          <Youtube />
        </TouchableDebounce>
      )}
      {site && (
        <TouchableDebounce onPress={() => Linking.openURL(site)}>
          <WebIcon />
        </TouchableDebounce>
      )}
    </Container>
  );
};

export default LinksBar;
