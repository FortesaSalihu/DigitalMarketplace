"use client";

import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import inputStyles from './inputStyles';

const SelectInput = ({
  label,
  name,
  value,
  onChange,
  options = [],
  required = false,
  disabled = false,
  error = false,
  helperText = '',
  size = 'medium',
  fullWidth = true,
  sx = {},
  ...props
}) => {
  const getStyles = () => {
    let styles = { ...inputStyles.container, ...inputStyles.selectInput };
    
    if (error) styles = { ...styles, ...inputStyles.error };
    if (disabled) styles = { ...styles, ...inputStyles.disabled };
    if (size === 'small') styles = { ...styles, ...inputStyles.small };
    if (size === 'large') styles = { ...styles, ...inputStyles.large };
    
    return { ...styles, ...sx };
  };

  return (
    <FormControl
      fullWidth={fullWidth}
      size={size}
      error={error}
      disabled={disabled}
      sx={getStyles()}
    >
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        {...props}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default SelectInput;