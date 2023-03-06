import React, { useState } from 'react';
import { OutlinedInput, InputAdornment, IconButton } from '@material-ui/core';
import { VisibilityOutlined, VisibilityOffOutlined } from '@material-ui/icons';

const PasswordInput = (props) => {
  const [visible, setVisible] = useState(false);

  return (
    <OutlinedInput
      variant="outlined"
      type={visible ? 'text' : 'password'}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={() => setVisible(!visible)}
            onMouseDown={(event) => {
              event.preventDefault();
            }}
          >
            {visible ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
          </IconButton>
        </InputAdornment>
      }
      {...props}
    />
  );
};

export default PasswordInput;
