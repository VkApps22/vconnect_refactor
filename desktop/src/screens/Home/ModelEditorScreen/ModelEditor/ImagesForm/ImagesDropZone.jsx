import React, { useState, useCallback, useRef } from 'react';
import styled, { css } from 'styled-components';
import {
  Typography,
  styled as materialStyled,
  Button,
  IconButton,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import PhotoLibraryOutlinedIcon from '@material-ui/icons/PhotoLibraryOutlined';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Error from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import HomeIcon from '@material-ui/icons/Home';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

const Container = styled.div`
  background: #f3f3f3;
  border: 1px solid #e6e9ed;
  border-radius: 4px;
  padding: 24px 24px 32px 24px;
`;

const DropZone = styled.div`
  align-items: center;
  border: 1px dashed rgba(0, 0, 0, 0.38);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 240px;
  padding: 29px;
  z-index: 1;

  ${(props) =>
    props.isDragging &&
    css`
      opacity: 0.3;
    `} ${(props) =>
    props.hasImages &&
    css`
      align-items: flex-start;
      background: #e5eef4;
      justify-content: flex-start;
      flex-direction: row;
      flex-wrap: wrap;
    `}
`;

const ImageContainer = styled.div`
  align-items: flex-end;
  display: flex;
  flex-direction: row;
  margin: 16px;
`;

const IconsContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ImagePreview = styled.img`
  height: auto;
  vertical-align: middle;
  width: 100px;
`;

const ImageBackIcon = materialStyled(PhotoLibraryOutlinedIcon)({
  fontSize: 60,
  marginBottom: 21,
});

const AddImageButton = materialStyled(Button)({
  height: 56,
  fontWeight: 'bold',
  marginTop: 32,
});

const FooterMessage = materialStyled(Typography)({
  marginTop: 16,
});

const ImagesDropZone = ({
  imageList,
  mainImage,
  handleUpdateImageList,
  handleUpdateMainImage,
  disabled,
  errors,
}) => {
  const { t } = useTranslation();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef();

  const dragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const dragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const addFiles = useCallback(
    (files) => {
      const updatedArray = [...imageList];

      [...files].forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          updatedArray.push({
            _id: uuidv4(),
            src: event.target.result,
            name: file.name,
            type: file.type,
            size: file.size,
          });
          handleUpdateImageList([...updatedArray]);
        };

        reader.readAsDataURL(file);
      });
    },

    [handleUpdateImageList, imageList]
  );

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    const { files } = e.dataTransfer;
    addFiles(files);
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    const { files } = e.target;
    addFiles(files);
    fileInputRef.current.value = '';
  };

  const handleRemove = (imageId) => {
    handleUpdateImageList([
      ...imageList.filter((image) => image._id !== imageId),
    ]);
  };

  return (
    <Container>
      <DropZone
        onDragOver={dragEnter}
        onDragLeave={dragLeave}
        onDrop={handleFileDrop}
        isDragging={isDragging}
        hasImages={imageList.length > 0}
      >
        {imageList.length > 0 ? (
          imageList.map((image, index) => (
            <ImageContainer key={image._id}>
              <IconsContainer>
                <IconButton
                  onClick={() => handleUpdateMainImage(image._id)}
                  disabled={disabled}
                >
                  {image._id === mainImage ? (
                    <HomeIcon />
                  ) : (
                    <HomeOutlinedIcon />
                  )}
                </IconButton>
              </IconsContainer>
              <ImagePreview alt={`img - ${image._id}`} src={image.src} />
              <IconsContainer>
                {errors[index] ? (
                  <Error htmlColor="#B00020" titleAccess={errors[index]} />
                ) : (
                  <CheckCircleIcon htmlColor="#1FA83D" />
                )}

                <IconButton
                  onClick={() => handleRemove(image._id)}
                  disabled={disabled}
                >
                  <CloseIcon />
                </IconButton>
              </IconsContainer>
            </ImageContainer>
          ))
        ) : (
          <>
            <ImageBackIcon color="action" />
            <Typography variant="caption" colo="action">
              {t(
                'drag-and-drop-the-images-you-want-to-add-here-or-use-the-button-below'
              )}
            </Typography>
          </>
        )}
      </DropZone>
      <input
        hidden
        ref={fileInputRef}
        onChange={handleOnChange}
        multiple
        accept="image/png"
        type="file"
      />
      <AddImageButton
        color="secondary"
        variant="contained"
        disabled={disabled}
        fullWidth
        onClick={() => fileInputRef.current.click()}
      >
        {t('add-image')}
      </AddImageButton>
      <FooterMessage align="center">
        {t('you-can-add-multiple-images')}
      </FooterMessage>
    </Container>
  );
};

ImagesDropZone.propTypes = {
  mainImage: PropTypes.string,
  imageList: PropTypes.arrayOf(PropTypes.any).isRequired,
  disabled: PropTypes.bool.isRequired,
  handleUpdateImageList: PropTypes.func.isRequired,
  handleUpdateMainImage: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf(PropTypes.any),
};

ImagesDropZone.defaultProps = {
  errors: [],
  mainImage: '',
};

export default ImagesDropZone;
