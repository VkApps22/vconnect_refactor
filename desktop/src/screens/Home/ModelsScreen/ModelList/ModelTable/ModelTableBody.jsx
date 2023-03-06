import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  styled as materialStyled,
  TableBody,
  TableCell,
  TableRow,
  withStyles,
} from '@material-ui/core';
import {
  CommentOutlined,
  CreateOutlined,
  DeleteOutline,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import FeedbackModal from '../../../../../components/FeedbackModal';
import { useDynamicTranslation } from '../../../../../hooks/dynamic-translation';
import DeleteModelModal from '../../../../../components/DeleteModelModal';
import ModelEditorModal from '../../ModelEditorModal';

const CellFlexContainer = styled.div`
  align-items: center;
  display: flex;

  button {
    margin-right: 4px;
  }
`;

const ColoredDot = styled.div`
  border-radius: 30px;
  height: 6px;
  margin-left: 8px;
  width: 6px;

  ${(props) => {
    if (props.$state === 'positive') {
      return css`
        background: #1fa83d;
      `;
    }

    if (props.$state === 'negative') {
      return css`
        background: #b00020;
      `;
    }

    if (props.$state === 'neutral') {
      return css`
        background: #e6cf05;
      `;
    }
    return css``;
  }}
`;

const EvaluationField = ({ state }) => {
  const { t } = useTranslation();

  return (
    <CellFlexContainer>
      {state ? (
        <>
          {t(state)} <ColoredDot $state={state} />
        </>
      ) : (
        '-'
      )}
    </CellFlexContainer>
  );
};

EvaluationField.propTypes = {
  state: PropTypes.string,
};

EvaluationField.defaultProps = {
  state: '',
};

const ActionButton = materialStyled(Button)({
  padding: 6,
  minWidth: 28,
  minHeight: 28,
});

const DeleteButton = withStyles(() => ({
  root: {
    color: '#fff',
    backgroundColor: '#C03C3C',
    '&:hover': {
      backgroundColor: '#862a2a',
    },
  },
}))(ActionButton);

const CellActions = ({ id, model, family, handleDelete, ...props }) => {
  const { t } = useTranslation();
  const { dt } = useDynamicTranslation();
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showDeleteModelModal, setShowDeleteModelModal] = useState(false);
  const [showEditModelModal, setShowEditModelModal] = useState(false);

  return (
    <CellFlexContainer {...props}>
      {showFeedbackModal && (
        <FeedbackModal
          modelId={id}
          open={showFeedbackModal}
          handleClose={() => setShowFeedbackModal(false)}
          headerTitle={`${dt(family)} - ${t('model')} ${model}`}
        />
      )}
      {showDeleteModelModal && (
        <DeleteModelModal
          id={id}
          model={model}
          handleClose={() => setShowDeleteModelModal(false)}
          handleDelete={handleDelete}
          open={showDeleteModelModal}
        />
      )}
      {showEditModelModal && (
        <ModelEditorModal
          id={id}
          handleClose={() => setShowEditModelModal(false)}
          open={showEditModelModal}
        />
      )}
      <ActionButton
        variant="contained"
        onClick={() => setShowFeedbackModal(true)}
        color="primary"
        size="small"
        title={t('ratings')}
      >
        <CommentOutlined fontSize="small" />
      </ActionButton>
      <ActionButton
        variant="contained"
        color="primary"
        size="small"
        title={t('edit')}
        onClick={() => setShowEditModelModal(true)}
      >
        <CreateOutlined fontSize="small" />
      </ActionButton>
      <DeleteButton
        variant="contained"
        title={t('delete')}
        size="small"
        onClick={() => setShowDeleteModelModal(true)}
      >
        <DeleteOutline fontSize="small" />
      </DeleteButton>
    </CellFlexContainer>
  );
};

CellActions.propTypes = {
  id: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  family: PropTypes.arrayOf(
    PropTypes.shape({
      language: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleDelete: PropTypes.func.isRequired,
};

const TableBodyCell = materialStyled(TableCell)({
  color: 'rgba(0,0,0, 0.87)',
  fontSize: '1rem',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '1px',
  whiteSpace: 'nowrap',
});

const ModelTableBody = ({ list, handleDelete, ...props }) => {
  const { dt } = useDynamicTranslation();
  return (
    <TableBody {...props}>
      {list.map(({ _id, model, family, name, rating }) => (
        <TableRow key={_id}>
          <TableBodyCell title={model}>{model}</TableBodyCell>
          <TableBodyCell title={dt(family)}>{dt(family)}</TableBodyCell>
          <TableBodyCell title={dt(name)}>{dt(name)}</TableBodyCell>
          <TableBodyCell>
            <EvaluationField state={rating} />
          </TableBodyCell>
          <TableBodyCell style={{ maxWidth: 'none' }}>
            <CellActions
              id={_id}
              model={model}
              family={family}
              handleDelete={handleDelete}
            />
          </TableBodyCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

ModelTableBody.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      model: PropTypes.string,
      family: PropTypes.arrayOf(
        PropTypes.shape({
          language: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
        })
      ),
      name: PropTypes.arrayOf(
        PropTypes.shape({
          language: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
        })
      ),
      rating: PropTypes.oneOf(['positive', 'negative', 'neutral', undefined]),
    })
  ),
  handleDelete: PropTypes.func.isRequired,
};

ModelTableBody.defaultProps = {
  list: [],
};

export default ModelTableBody;
