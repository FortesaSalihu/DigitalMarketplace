'use client';

import React, { useEffect, useState } from 'react';
import { Box, TextField, Chip } from '@mui/material';
import inputStyles from './inputStyles';

/* ===============================
   ClientOnly (same file)
================================ */
function ClientOnly({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return children;
}

/* ===============================
   TagInput Component
================================ */
const TagInput = ({
  label = 'Tags',
  value = [],
  onChange,
  placeholder = 'Type and press Enter',
  disabled = false,
  error = false,
  size = 'medium',
  sx = {},
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();

      const newTag = inputValue.trim();

      if (!value.includes(newTag)) {
        onChange([...value, newTag]);
      }

      setInputValue('');
    }
  };

  const handleDelete = (tagToDelete) => {
    onChange(value.filter((tag) => tag !== tagToDelete));
  };

  const getStyles = () => {
    let styles = {
      ...inputStyles.container,
      ...inputStyles.textInput,
      border: '1px solid #890eeeff',
      borderRadius: 1,
      padding: '8px',
    };

    if (error) styles = { ...styles, ...inputStyles.error };
    if (disabled) styles = { ...styles, ...inputStyles.disabled };
    if (size === 'small') styles = { ...styles, ...inputStyles.small };
    if (size === 'large') styles = { ...styles, ...inputStyles.large };

    return { ...styles, ...sx };
  };

  return (
    <ClientOnly>
      <Box sx={getStyles()}>
        <TextField
          label={label}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          variant="outlined"
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#890eeeff',
              },
              '&:hover fieldset': {
                borderColor: '#890eeeff',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#890eeeff',
                borderWidth: 2,
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#890eeeff',
            },
          }}
        />

        {/* Selected tags */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
          {value.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              onDelete={() => handleDelete(tag)}
              sx={{
                backgroundColor: '#890eeeff',
                color: '#ffffff',
                '& .MuiChip-deleteIcon': {
                  color: '#ffffff',
                  opacity: 0.8,
                  '&:hover': {
                    opacity: 1,
                  },
                },
              }}
            />
          ))}
        </Box>
      </Box>
    </ClientOnly>
  );
};

export default TagInput;