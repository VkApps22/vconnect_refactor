import React, { useCallback } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { CreateOutlined, ListAlt } from '@material-ui/icons/';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';

import { signOut } from '../../store/auth';
import { AdminPanelIcon, AnalyticsIcon, LogoutIcon } from '../icons';
import vconnectIcon from '../../assets/images/vconnect_icon.png';

const shrinkAndFadeIn = keyframes`
  0% {
    opacity: 0;
    width: 315px;
  }
  100% {
    opacity: 1;
    width: 79px;
  }
`;

const CollapsedContainer = styled.div`
  align-items: center;
  animation: ${shrinkAndFadeIn} 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 79px;

  img {
    margin-bottom: 40px;
    padding: 12px;
  }
`;

const CollapsedMenu = styled.div`
  flex: 1;
`;

const CollapsedMenuTab = styled.div`
  padding: 16px;
  svg {
    fill: #00a0d1;
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

const CollapsedFooter = styled.div`
  border-top: #e6e9ed solid 1px;
  padding: 16px 0;
  text-align: center;
  width: 100%;
`;

const CollapsedNavBar = ({ activeItem, ...props }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const onSignOutClick = useCallback(() => {
    dispatch(signOut({}))
      .then(() => history.replace('/'))
      .catch((err) => enqueueSnackbar(err.message, { variant: 'error' }));
  }, [dispatch, enqueueSnackbar, history]);

  const handleMenuClick = (link) => history.push(link);

  return (
    <CollapsedContainer {...props}>
      <img src={vconnectIcon} alt="VConnectIcon" width={40} height={40} />
      <CollapsedMenu>
        <CollapsedMenuTab
          onClick={() => handleMenuClick('analytics')}
          $isActive={activeItem === '/analytics'}
        >
          <AnalyticsIcon />
        </CollapsedMenuTab>
        <CollapsedMenuTab
          onClick={() => handleMenuClick('modelEditor')}
          $isActive={activeItem === '/modelEditor'}
        >
          <CreateOutlined />
        </CollapsedMenuTab>
        <CollapsedMenuTab
          onClick={() => handleMenuClick('models')}
          $isActive={activeItem === '/models'}
        >
          <ListAlt />
        </CollapsedMenuTab>
        <CollapsedMenuTab
          onClick={() => handleMenuClick('users')}
          $isActive={activeItem === '/users'}
        >
          <AdminPanelIcon />
        </CollapsedMenuTab>
      </CollapsedMenu>
      <CollapsedFooter>
        <CollapsedMenuTab onClick={onSignOutClick}>
          <LogoutIcon />
        </CollapsedMenuTab>
      </CollapsedFooter>
    </CollapsedContainer>
  );
};

CollapsedNavBar.propTypes = {
  activeItem: PropTypes.string,
};

CollapsedNavBar.defaultProps = {
  activeItem: '',
};

export default CollapsedNavBar;
