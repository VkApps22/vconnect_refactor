import React from 'react';
import styled from 'styled-components';
import {
  InputLabel,
  OutlinedInput,
  FormHelperText,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import ImagesDropZone from './ImagesDropZone';

const Container = styled.div``;

const VideoLinkContainer = styled.div``;

const ImagesForm = ({
  videoLink,
  images,
  errors,
  setFieldValue,
  touched,
  setFieldTouched,
  ...props
}) => {
  const { t } = useTranslation();
  const { hasVideo, link } = videoLink;
  const { hasImages, files } = images;

  const handleUpdateMainImage = (imageId) => {
    setFieldValue('images', { ...images, mainImage: imageId });
  };

  const handleUpdateImageList = (value) => {
    const updateAndSetMainImage = (filesList, mainImage) =>
      setFieldValue('images', { ...images, files: filesList, mainImage }, true);

    if (value.length === 0) {
      updateAndSetMainImage(value, '');
    } else if (images.files.length === 0) {
      updateAndSetMainImage(value, value[0]._id);
    } else if (
      images.mainImage &&
      !value.find((image) => image._id === images.mainImage)
    ) {
      updateAndSetMainImage(value, value[0]._id);
    } else {
      setFieldValue('images', { ...images, files: value }, true);
    }

    setTimeout(() => setFieldTouched('images', true));
  };

  return (
    <Container {...props}>
      <VideoLinkContainer>
        <InputLabel disabled={!hasVideo}>
          {t('video-or-playlist-url-address')}
        </InputLabel>
        <OutlinedInput
          value={link}
          placeholder={t('ex-link', {
            link: 'https://www.youtube.com/playlist?list=vulkan',
          })}
          onBlur={() => setFieldTouched('videoLink')}
          fullWidth
          onChange={(event) =>
            setFieldValue('videoLink', {
              ...videoLink,
              link: event.target.value,
            })
          }
          disabled={!hasVideo}
        />
        <FormHelperText
          disabled={!hasVideo}
          error={!!(touched.videoLink && errors.videoLink)}
        >
          {touched.videoLink && errors.videoLink
            ? errors.videoLink.link
            : t(
                'enter-the-url-address-of-the-video-or-playlist-of-the-desired-model'
              )}
        </FormHelperText>
        <FormControlLabel
          control={<Checkbox checked={!hasVideo} />}
          onClick={() => {
            setFieldValue(
              'videoLink',
              { ...videoLink, hasVideo: !hasVideo },
              true
            );
            setTimeout(() => setFieldTouched('videoLink', true));
          }}
          label={t('this-model-has-no-video-or-playlist')}
        />
      </VideoLinkContainer>
      <ImagesDropZone
        disabled={!hasImages}
        imageList={files}
        errors={
          Array.isArray(errors && errors.images && errors.images.files)
            ? errors.images.files
            : []
        }
        mainImage={images.mainImage}
        handleUpdateMainImage={handleUpdateMainImage}
        handleUpdateImageList={handleUpdateImageList}
      />
      <FormHelperText error={!!(touched.images && errors.images)}>
        {touched.images && errors.images && errors.images.files}
      </FormHelperText>
      <FormControlLabel
        control={<Checkbox checked={!hasImages} />}
        onClick={() => {
          setFieldValue('images', { ...images, hasImages: !hasImages }, true);
          setTimeout(() => setFieldTouched('images', true));
        }}
        label={t('this-model-has-no-images')}
      />
    </Container>
  );
};

ImagesForm.propTypes = {
  videoLink: PropTypes.shape({
    hasVideo: PropTypes.bool,
    link: PropTypes.string,
  }).isRequired,
  images: PropTypes.shape({
    hasImages: PropTypes.bool,
    files: PropTypes.arrayOf(PropTypes.any),
    mainImage: PropTypes.string,
  }).isRequired,
  errors: PropTypes.objectOf(PropTypes.any).isRequired,
  touched: PropTypes.objectOf(PropTypes.any).isRequired,
  setFieldValue: PropTypes.func.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
};

export default ImagesForm;
