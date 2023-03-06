import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { restore, selector as authSelector } from '../../store/auth';
import HomeNavigation from '../Home/navigation';
import SignInNavigation from '../SignIn/navigation';

const Container = styled.div`
  background: #e5eef4;
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

const ProgressContainer = styled(Container)`
  align-items: center;
  justify-content: center;
`;

const RestoringNavigation = () => {
  return (
    <Router>
      <ProgressContainer>
        <CircularProgress size={80} />
      </ProgressContainer>
    </Router>
  );
};

const Navigation = () => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const { signedIn, restoring, language } = useSelector(authSelector);

  useEffect(() => {
    if (!signedIn) dispatch(restore());
  }, [dispatch, signedIn]);

  useEffect(() => {
    if (language && language !== i18n.languages[0])
      i18n.changeLanguage(language);
  }, [i18n, i18n.languages, language]);

  if (restoring) return <RestoringNavigation />;

  if (signedIn) return <HomeNavigation />;

  return <SignInNavigation />;
};

export default Navigation;
