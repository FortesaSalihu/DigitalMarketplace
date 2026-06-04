"use client";

import React from "react";
import { TextField } from "@mui/material";
import inputStyles from "./inputStyles";

const TextInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  disabled = false,
  error = false,
  helperText = "",
  size = "medium",
  fullWidth = true,
  variant = "outlined",
  sx = {},
  ...props
}) => {
  const getStyles = () => {
    let styles = { ...inputStyles.container, ...inputStyles.textInput };

    if (error) styles = { ...styles, ...inputStyles.error };
    if (disabled) styles = { ...styles, ...inputStyles.disabled };
    if (size === "small") styles = { ...styles, ...inputStyles.small };
    if (size === "large") styles = { ...styles, ...inputStyles.large };

    return { ...styles, ...sx };
  };

  return (
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      required={required}
      disabled={disabled}
      error={error}
      helperText={helperText}
      size={size}
      fullWidth={fullWidth}
      variant={variant}
      sx={getStyles()}
      {...props}
    />
  );
};

export default TextInput;
