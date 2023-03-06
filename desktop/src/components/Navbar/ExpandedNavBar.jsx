import React, { useCallback } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { CreateOutlined, ListAlt } from '@material-ui/icons/';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { signOut } from '../../store/auth';

import { AdminPanelIcon, AnalyticsIcon, LogoutIcon } from '../icons';
import logo from '../../assets/svg/logo.svg';
import vconnectIcon from '../../assets/images/vconnect_icon.png';

const fadeInAndExpand = keyframes`
  0% {
    opacity: 0;
    width: 79px;
  }
  100% {
    opacity: 1;
    width: 315px;
  }
`;

const ExpandedContainer = styled.div`
  animation: ${fadeInAndExpand} 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 315px;
`;

const LogoContainer = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 40px;
  padding: 12px;

  img:first-child {
    margin-right: 12px;
  }
`;

const Menu = styled.div`
  flex: 1;
`;

const MenuTab = styled.div`
  align-items: center;
  color: rgba(0, 0, 0, 0.6);
  display: flex;
  font-size: 1.25rem;
  letter-spacing: 0.5px;
  line-height: 32px;
  margin: 0 8px;
  padding: 16px 19px;

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  svg {
    fill: #00a0d1;
    margin-right: 8px;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.04);
    border-radius: 8px;
    cursor: pointer;
  }

  ${(props) =>
    props.$isActive &&
    css`
      background: #00447a;
      border-radius: 4px;
      color: #fff;

      svg {
        fill: #fff;
      }

      &:hover {
        background: #145385;
        cursor: pointer;
        border-radius: 4px;
      }
    `}
`;

const Footer = styled.div`
  border-top: #e6e9ed solid 1px;
  color: rgba(0, 0, 0, 0.6);
  font-size: 1.25rem;
  letter-spacing: 0.5px;
  line-height: 32px;
  padding: 16px 8px;
`;

const ExpandedNavBar = ({ activeItem, ...props }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const onSignOutClick = useCallback(() => {
    dispatch(signOut({}))
      .then(() => history.replace('/'))
      .catch((err) => enqueueSnackbar(err.message, { variant: 'error' }));
  }, [dispatch, enqueueSnackbar, history]);

  const handleMenuClick = (link) => history.push(link);

  return (
    <ExpandedContainer {...props}>
      <LogoContainer>
        <img src={vconnectIcon} alt="VConnectIcon" width={40} height={40} />
        <img src={logo} alt="VConnect" width={150} height={24} />
      </LogoContainer>
      <Menu>
        <MenuTab
          onClick={() => handleMenuClick('analytics')}
          $isActive={activeItem === '/analytics'}
        >
          <AnalyticsIcon />
          <span>{t('statistics')}</span>
        </MenuTab>
        <MenuTab
          onClick={() => handleMenuClick('modelEditor')}
          $isActive={activeItem === '/modelEditor'}
        >
          <CreateOutlined />
          <span>{t('insert-new-model')}</span>
        </MenuTab>
        <MenuTab
          onClick={() => handleMenuClick('models')}
          $isActive={activeItem === '/models'}
        >
          <ListAlt />
          <span>{t('view-models')}</span>
        </MenuTab>
        <MenuTab
          onClick={() => handleMenuClick('users')}
          $isActive={activeItem === '/users'}
        >
          <AdminPanelIcon />
          <span>{t('manage-users')}</span>
        </MenuTab>
      </Menu>
      <Footer>
        <MenuTab onClick={onSignOutClick}>
          <LogoutIcon />
          {t('sign-out')}
        </MenuTab>
      </Footer>
    </ExpandedContainer>
  );
};

ExpandedNavBar.propTypes = {
  activeItem: PropTypes.string,
};

ExpandedNavBar.defaultProps = {
  activeItem: '',
};

export default ExpandedNavBar;
