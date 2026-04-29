"use client";

import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import  Visibility from '@mui/icons-material/Visibility';
import  VisibilityOff from '@mui/icons-material/VisibilityOff';

import inputStyles from './inputStyles';

const PasswordInput = ({
  label = 'Password',
  name = 'password',
  value,
  onChange,
  placeholder = 'Enter your password',
  required = false,
  disabled = false,
  error = false,
  helperText = '',
  size = 'medium',
  fullWidth = true,
  sx = {},
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const getStyles = () => {
    let styles = { ...inputStyles.container, ...inputStyles.passwordInput };
    
    if (error) styles = { ...styles, ...inputStyles.error };
    if (disabled) styles = { ...styles, ...inputStyles.disabled };
    if (size === 'small') styles = { ...styles, ...inputStyles.small };
    if (size === 'large') styles = { ...styles, ...inputStyles.large };
    
    return { ...styles, ...sx };
  };

  return (
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={showPassword ? 'text' : 'password'}
      required={required}
      disabled={disabled}
      error={error}
      helperText={helperText}
      size={size}
      fullWidth={fullWidth}
      sx={getStyles()}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};

export default PasswordInput;