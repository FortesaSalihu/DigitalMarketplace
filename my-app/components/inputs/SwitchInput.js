"use client";

import React from "react";
import {
  FormControlLabel,
  Switch,
  FormGroup,
  FormHelperText,
  Typography,
  Box,
} from "@mui/material";
import inputStyles from "./inputStyles";

const SwitchInput = ({
  label,
  name,
  checked = false,
  onChange,
  size = "medium",
  color = "primary",
  disabled = false,
  required = false,
  helperText = "",
  labelPlacement = "end",
  sx = {},
  ...props
}) => {
  const getSwitchStyles = () => {
    let styles = { ...inputStyles.switch };

    // Size styles
    if (size === "small") {
      styles = { ...styles, ...inputStyles.switchSmall };
    } else if (size === "large") {
      styles = { ...styles, ...inputStyles.switchLarge };
    }

    // Color styles
    if (color === "success") {
      styles = { ...styles, ...inputStyles.switchSuccess };
    } else if (color === "error") {
      styles = { ...styles, ...inputStyles.switchError };
    } else if (color === "warning") {
      styles = { ...styles, ...inputStyles.switchWarning };
    }

    return styles;
  };

  const handleChange = (event) => {
    if (onChange) {
      onChange({
        target: {
          name: name,
          value: event.target.checked,
        },
      });
    }
  };

  return (
    <Box sx={{ ...inputStyles.container, ...sx }}>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={checked}
              onChange={handleChange}
              name={name}
              disabled={disabled}
              required={required}
              sx={getSwitchStyles()}
              color={color === "primary" ? "primary" : undefined}
              {...props}
            />
          }
          label={
            <Typography
              variant={size === "small" ? "body2" : "body1"}
              color={disabled ? "text.disabled" : "text.primary"}
            >
              {label}
              {required && " *"}
            </Typography>
          }
          labelPlacement={labelPlacement}
          sx={{
            marginLeft: 0,
            marginRight: 0,
            "& .MuiFormControlLabel-label": {
              ml: 1,
            },
          }}
        />
      </FormGroup>
      {helperText && (
        <FormHelperText
          sx={{
            ml: 0,
            color: disabled ? "text.disabled" : "text.secondary",
          }}
        >
          {helperText}
        </FormHelperText>
      )}
    </Box>
  );
};

export default SwitchInput;
