"use client";

import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Box,
  FormHelperText,
} from '@mui/material';
import inputStyles from './inputStyles';

const MultiSelectInput = ({
  label,
  name,
  value = [],
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
    let styles = { ...inputStyles.container, ...inputStyles.multiSelect };
    
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
        multiple
        value={value}
        onChange={onChange}
        required={required}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((selectedValue) => {
              const option = options.find(opt => opt.value === selectedValue);
              return (
                <Chip 
                  key={selectedValue} 
                  label={option?.label || selectedValue} 
                  size="small"
                />
              );
            })}
          </Box>
        )}
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

export default MultiSelectInput;