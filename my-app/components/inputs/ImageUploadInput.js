"use client";

import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { CloudUpload, Delete, AddPhotoAlternate } from "@mui/icons-material";
import inputStyles from "./inputStyles";

const ImageUploadInput = ({
  label = "Upload Image",
  name,
  value,
  onChange,
  disabled = false,
  error = false,
  helperText = "",
  accept = "image/*",
  maxSize = 5 * 1024 * 1024,
  sx = {},
  ...props
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  /* ================= SERVER UPLOAD ================= */
  const uploadToServer = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${process.env.API}/upload/image`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Upload failed");
    return res.json(); // { url, public_id }
  };

  /* ================= SERVER DELETE ================= */
  const deleteFromServer = async (public_id) => {
    if (!public_id) return;

    await fetch(`${process.env.API}/upload/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ public_id }),
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);
    const file = event.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  /* ================= SINGLE FILE HANDLER ================= */
  const handleFile = async (file) => {
    if (file.size > maxSize) {
      alert(
        `File is too large. Maximum size is ${maxSize / 1024 / 1024}MB`
      );
      return;
    }

    try {
      setUploading(true);

      // 🔁 Replace existing image (important)
      if (value?.public_id) {
        await deleteFromServer(value.public_id);
      }

      const uploaded = await uploadToServer(file);
      onChange(uploaded);
    } catch {
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  /* ================= DELETE ================= */
  const handleRemove = async () => {
    if (value?.public_id) {
      await deleteFromServer(value.public_id);
    }
    onChange(null);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const getStyles = () => {
    let styles = { ...inputStyles.container, ...inputStyles.imageUpload };
    if (dragOver)
      styles = { ...styles, ...inputStyles.imageUpload["&.dragOver"] };
    if (error) styles = { ...styles, ...inputStyles.error };
    if (disabled) styles = { ...styles, ...inputStyles.disabled };
    return { ...styles, ...sx };
  };

  return (
    <Box sx={getStyles()}>
      <input
        type="file"
        ref={fileInputRef}
        hidden
        accept={accept}
        disabled={disabled || uploading}
        onChange={handleFileChange}
        {...props}
      />

      <Box
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        sx={{ textAlign: "center" }}
      >
        <AddPhotoAlternate sx={{ fontSize: 68, color: "#890eeeff", mb: 1 }} />

        <Typography variant="h6">{label}</Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Drag & drop your image here or
        </Typography>

        <Button
          variant="contained"
          startIcon={
            uploading ? <CircularProgress size={18} /> : <CloudUpload />
          }
          onClick={triggerFileInput}
          disabled={disabled || uploading}
          sx={{
            backgroundColor: "#890eeeff",
            "&:hover": { backgroundColor: "#890eeeff" },
          }}
        >
          {uploading ? "Uploading..." : "Browse Files"}
        </Button>
      </Box>

      {/* ===== PREVIEW ===== */}
      {value && (
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Avatar
            src={value.url}
            sx={inputStyles.imagePreview}
            variant="rounded"
          />
          <IconButton onClick={handleRemove} color="error" size="small">
            <Delete />
          </IconButton>
        </Box>
      )}

      {helperText && (
        <Typography
          variant="caption"
          color={error ? "error" : "text.secondary"}
          sx={{ mt: 1, display: "block" }}
        >
          {helperText}
        </Typography>
      )}
    </Box>
  );
};

export default ImageUploadInput;


































// "use client";

// import React, { useState, useRef } from "react";
// import { Box, Typography, Button, IconButton, Avatar } from "@mui/material";
// import { CloudUpload, Delete, AddPhotoAlternate } from "@mui/icons-material";
// import inputStyles from "./inputStyles";

// const ImageUploadInput = ({
//   label = "Upload Image",
//   name,
//   value,
//   onChange,
//   multiple = false,
//   disabled = false,
//   error = false,
//   helperText = "",
//   accept = "image/*",
//   maxSize = 5 * 1024 * 1024, // 5MB
//   sx = {},
//   ...props
// }) => {
//   const [dragOver, setDragOver] = useState(false);
//   const fileInputRef = useRef(null);

//   const handleFileChange = (event) => {
//     const files = Array.from(event.target.files);
//     handleFiles(files);
//   };

//   const handleDragOver = (event) => {
//     event.preventDefault();
//     setDragOver(true);
//   };

//   const handleDragLeave = (event) => {
//     event.preventDefault();
//     setDragOver(false);
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();
//     setDragOver(false);
//     const files = Array.from(event.dataTransfer.files);
//     handleFiles(files);
//   };

//   const handleFiles = (files) => {
//     const validFiles = files.filter((file) => {
//       if (file.size > maxSize) {
//         alert(
//           `File ${file.name} is too large. Maximum size is ${
//             maxSize / 1024 / 1024
//           }MB`
//         );
//         return false;
//       }
//       return true;
//     });

//     if (validFiles.length > 0) {
//       if (multiple) {
//         onChange(validFiles);
//       } else {
//         onChange(validFiles[0]);
//       }
//     }
//   };

//   const handleRemove = (index) => {
//     if (multiple) {
//       const newFiles = value.filter((_, i) => i !== index);
//       onChange(newFiles);
//     } else {
//       onChange(null);
//     }
//   };

//   const triggerFileInput = () => {
//     fileInputRef.current?.click();
//   };

//   const getStyles = () => {
//     let styles = { ...inputStyles.container, ...inputStyles.imageUpload };

//     if (dragOver)
//       styles = { ...styles, ...inputStyles.imageUpload["&.dragOver"] };
//     if (error) styles = { ...styles, ...inputStyles.error };
//     if (disabled) styles = { ...styles, ...inputStyles.disabled };

//     return { ...styles, ...sx };
//   };

//   return (
//     <Box sx={getStyles()}>
//       <input
//         type="file"
//         ref={fileInputRef}
//         onChange={handleFileChange}
//         multiple={multiple}
//         accept={accept}
//         style={{ display: "none" }}
//         disabled={disabled}
//         {...props}
//       />

//       <Box
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         onDrop={handleDrop}
//         sx={{ textAlign: "center" }}
//       >
//         <AddPhotoAlternate sx={{ fontSize: 68, color: "#890eeeff", mb: 1 }} />

//         <Typography variant="h6" gutterBottom>
//           {label}
//         </Typography>

//         <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//           Drag & drop your files here or
//         </Typography>

//         <Button
//           variant="contained"
//           component="span"
//           startIcon={
//             <CloudUpload
//               sx={{
//                 color: "#890eeeff",
//               }}
//             />
//           }
//           onClick={triggerFileInput}
//           disabled={disabled}
//           sx={{
//             backgroundColor: "#890eeeff",
//             color: "white",
//             "&:hover": {
//               backgroundColor: "#890eeeff",
//             },
//           }}
//         >
//           Browse Files
//         </Button>

//         <Typography
//           variant="caption"
//           color="text.secondary"
//           sx={{ mt: 1, display: "block" }}
//         >
//           Maximum file size: {maxSize / 1024 / 1024}MB
//         </Typography>
//       </Box>

//       {/* Preview for single file */}
//       {value && !multiple && (
//         <Box sx={{ mt: 2, textAlign: "center" }}>
//           <Avatar
//             src={typeof value === "string" ? value : URL.createObjectURL(value)}
//             sx={inputStyles.imagePreview}
//             variant="rounded"
//           />
//           <IconButton
//             onClick={() => handleRemove(0)}
//             color="error"
//             size="small"
//           >
//             <Delete />
//           </IconButton>
//         </Box>
//       )}

//       {/* Preview for multiple files */}
//       {value && multiple && value.length > 0 && (
//         <Box sx={{ mt: 2 }}>
//           <Typography variant="subtitle2" gutterBottom>
//             Selected Files:
//           </Typography>
//           <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
//             {value.map((file, index) => (
//               <Box
//                 key={index}
//                 sx={{ position: "relative", textAlign: "center" }}
//               >
//                 <Avatar
//                   src={
//                     typeof file === "string" ? file : URL.createObjectURL(file)
//                   }
//                   sx={inputStyles.imagePreview}
//                   variant="rounded"
//                 />
//                 <IconButton
//                   onClick={() => handleRemove(index)}
//                   color="error"
//                   size="small"
//                   sx={{ position: "absolute", top: -8, right: -8 }}
//                 >
//                   <Delete fontSize="small" />
//                 </IconButton>
//               </Box>
//             ))}
//           </Box>
//         </Box>
//       )}

//       {helperText && (
//         <Typography
//           variant="caption"
//           color={error ? "error" : "text.secondary"}
//           sx={{ mt: 1, display: "block" }}
//         >
//           {helperText}
//         </Typography>
//       )}
//     </Box>
//   );
// };

// export default ImageUploadInput;