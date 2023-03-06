import { useTranslation } from 'react-i18next';
import { FormHelperText, InputLabel, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { styled as materialStyled } from '@material-ui/core/styles';

const AugmentifyIdField = materialStyled(TextField)({
                                                     width: 450,
                                                 });

const AugmentifyId = ({augmentifyId,
                       handleChange,
                       errors,
                       onBlur,
                       touched,
                       ...props
                   }) => {
    const { t } = useTranslation();

    return (
        <div {...props}>
            <InputLabel>{t('augmentify-id')}</InputLabel>
            <AugmentifyIdField
                value={augmentifyId}
                name="augmentifyId"
                onBlur={onBlur}
                onChange={handleChange}
                placeholder={t('ex-augmentify-id')}
                variant="outlined"
            />
            <FormHelperText error={touched.augmentifyId && !!errors.augmentifyId}>
                {touched.augmentifyId && errors.augmentifyId
                    ? errors.augmentifyId
                    : t('augmentify-id-you-want-to-add')}
            </FormHelperText>
        </div>
    );
};

AugmentifyId.propTypes = {
    augmentifyId: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    errors: PropTypes.objectOf(PropTypes.any).isRequired,
    onBlur: PropTypes.func.isRequired,
    touched: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default AugmentifyId;
