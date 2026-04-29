"use client";

import React from 'react';
import { Button as MuiButton, CircularProgress, Box } from '@mui/material';
import inputStyles from './inputStyles';

const Button = ({
  children,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  startIcon,
  endIcon,
  onClick,
  type = 'button',
  sx = {},
  ...props
}) => {
  const getStyles = () => {
    let styles = { ...inputStyles.button };
    
    // Variant styles
    if (variant === 'contained') {
      styles = { ...styles, ...inputStyles.buttonContained };
    } else if (variant === 'outlined') {
      styles = { ...styles, ...inputStyles.buttonOutlined };
    } else if (variant === 'text') {
      styles = { ...styles, ...inputStyles.buttonText };
    }
    
    // Size styles
    if (size === 'small') {
      styles = { ...styles, ...inputStyles.buttonSmall };
    } else if (size === 'large') {
      styles = { ...styles, ...inputStyles.buttonLarge };
    } else {
      styles = { ...styles, ...inputStyles.buttonMedium };
    }
    
    // Color styles for contained variant
    if (variant === 'contained') {
      if (color === 'success') {
        styles = { ...styles, ...inputStyles.buttonSuccess };
      } else if (color === 'error') {
        styles = { ...styles, ...inputStyles.buttonError };
      } else if (color === 'warning') {
        styles = { ...styles, ...inputStyles.buttonWarning };
      } else if (color === 'info') {
        styles = { ...styles, ...inputStyles.buttonInfo };
      }
    }
    
    // State styles
    if (disabled || loading) {
      styles = { ...styles, ...inputStyles.buttonDisabled };
    }
    
    if (loading) {
      styles = { ...styles, ...inputStyles.buttonLoading };
    }
    
    return { ...styles, ...sx };
  };

  return (
    <MuiButton
      variant={variant}
      color={color === 'primary' ? 'primary' : undefined}
      size={size}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      startIcon={!loading ? startIcon : undefined}
      endIcon={!loading ? endIcon : undefined}
      onClick={onClick}
      type={type}
      sx={getStyles()}
      {...props}
    >
      {loading ? (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CircularProgress 
            size={size === 'small' ? 16 : size === 'large' ? 24 : 20} 
            color="inherit"
            sx={{ mr: 1 }}
          />
          Loading...
        </Box>
      ) : (
        children
      )}
    </MuiButton>
  );
};

export default Button;