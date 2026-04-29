// "use client";

// import React, { useEffect, useState, useRef } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   IconButton,
//   CircularProgress,
//   LinearProgress,
// } from "@mui/material";
// import { CloudUpload, Delete, AddPhotoAlternate } from "@mui/icons-material";

// /* ===== FILE TYPE ICONS ===== */
// import ImageIcon from "@mui/icons-material/Image";
// import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
// import DescriptionIcon from "@mui/icons-material/Description";
// import ArchiveIcon from "@mui/icons-material/Archive";
// import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
// import VideoFileIcon from "@mui/icons-material/VideoFile";
// import AudiotrackIcon from "@mui/icons-material/Audiotrack";

// import axios from "axios";
// import inputStyles from "./inputStyles";

// /* ===============================
//    ClientOnly (same file)
// ================================ */
// function ClientOnly({ children }) {
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;
//   return children;
// }

// /* ================= FILE ICON MAP ================= */
// const FILE_ICON_MAP = {
//   jpg: { icon: ImageIcon, color: "#10b981" },
//   jpeg: { icon: ImageIcon, color: "#10b981" },
//   png: { icon: ImageIcon, color: "#10b981" },
//   bmp: { icon: ImageIcon, color: "#10b981" },

//   mp4: { icon: VideoFileIcon, color: "#2563eb" },
//   webm: { icon: VideoFileIcon, color: "#2563eb" },
//   mov: { icon: VideoFileIcon, color: "#2563eb" },
//   avi: { icon: VideoFileIcon, color: "#2563eb" },

//   mp3: { icon: AudiotrackIcon, color: "#f59e0b" },
//   wav: { icon: AudiotrackIcon, color: "#f59e0b" },
//   ogg: { icon: AudiotrackIcon, color: "#f59e0b" },
//   m4a: { icon: AudiotrackIcon, color: "#f59e0b" },

//   pdf: { icon: PictureAsPdfIcon, color: "#ef4444" },
//   doc: { icon: DescriptionIcon, color: "#2563eb" },
//   docx: { icon: DescriptionIcon, color: "#2563eb" },
//   xls: { icon: DescriptionIcon, color: "#16a34a" },
//   xlsx: { icon: DescriptionIcon, color: "#16a34a" },
//   ppt: { icon: DescriptionIcon, color: "#ea580c" },
//   pptx: { icon: DescriptionIcon, color: "#ea580c" },

//   zip: { icon: ArchiveIcon, color: "#7c3aed" },
//   rar: { icon: ArchiveIcon, color: "#7c3aed" },

//   txt: { icon: InsertDriveFileIcon, color: "#6b7280" },
// };

// /* ================= HELPER ================= */
// const getFileIcon = (file) => {
//   const ext = file.extension || file.name?.split(".").pop()?.toLowerCase();
//   const config = FILE_ICON_MAP[ext];

//   if (!config) {
//     return { Icon: InsertDriveFileIcon, color: "#6b7280" };
//   }

//   return { Icon: config.icon, color: config.color };
// };

// /* ================= COMPONENT ================= */
// const MultiImageUploadInput = ({
//   label = "Upload Files",
//   value = [],
//   onChange,
//   disabled = false,
//   error = false,
//   helperText = "",
//   accept = "*/*",
//   maxSize = 50 * 1024 * 1024,
//   sx = {},
//   categoryId,
//   categories
// }) => {
//   const [dragOver, setDragOver] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const fileInputRef = useRef(null);

//   const uploadToServer = async (file, tempId) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("categoryId", categoryId);

//     const res = await axios.post(
//       `${process.env.API}/author/files/file`,
//       formData,
//       {
//         //  headers: { 'Content-Type': 'multipart/form-data' },
//         onUploadProgress: (e) => {
//           const percent = Math.round((e.loaded * 100) / e.total);

//           onChange((prev) =>
//             prev.map((f) =>
//               f.tempId === tempId ? { ...f, progress: percent } : f,
//             ),
//           );
//         },
//       },
//     );

//     return res.data;
//   };

//   const handleFiles = async (files) => {
//     const fileArray = Array.from(files);
//     setUploading(true);

//     const tempFiles = fileArray.map((file) => ({
//       tempId: `${file.name}-${Date.now()}`,
//       name: file.name,
//       size: file.size,
//       mime_type: file.type,
//       extension: file.name.split(".").pop()?.toLowerCase(),
//       progress: 0,
//     }));

//     onChange([...(value || []), ...tempFiles]);

//     try {
//       for (const file of fileArray) {
//         if (file.size > maxSize) continue;

//         const tempId = tempFiles.find((f) => f.name === file.name)?.tempId;
//         const uploaded = await uploadToServer(file, tempId);

//         onChange((prev) =>
//           prev.map((f) =>
//             f.tempId === tempId ? { ...uploaded, progress: 100 } : f,
//           ),
//         );
//       }
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleRemove = async (file) => {
//     await fetch(`${process.env.API}/author/files/delete`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         public_id: file.path?.public_id,
//         categoryId,
//       }),
//     });

//     onChange(value.filter((v) => v._id !== file._id));
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
//     <ClientOnly>
//       <Box sx={getStyles()}>
//         <input
//           type="file"
//           ref={fileInputRef}
//           hidden
//           multiple
//           accept={accept}
//           disabled={disabled || uploading}
//           onChange={(e) => e.target.files && handleFiles(e.target.files)}
//         />

//         <Box
//           onDragOver={(e) => {
//             e.preventDefault();
//             setDragOver(true);
//           }}
//           onDragLeave={() => setDragOver(false)}
//           onDrop={(e) => {
//             e.preventDefault();
//             setDragOver(false);
//             handleFiles(e.dataTransfer.files);
//           }}
//           sx={{ textAlign: "center" }}
//         >
//           <AddPhotoAlternate sx={{ fontSize: 68, color: "#890eeeff", mb: 1 }} />

//           <Typography variant="h6">{label}</Typography>

//           <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//             Drag & drop image, video, audio or files here
//           </Typography>

//           <Button
//             variant="contained"
//             startIcon={
//               uploading ? <CircularProgress size={18} /> : <CloudUpload />
//             }
//             onClick={() => fileInputRef.current?.click()}
//             disabled={disabled || uploading}
//             sx={{
//               backgroundColor: "#890eeeff",
//               "&:hover": { backgroundColor: "#890eeeff" },
//             }}
//           >
//             {uploading ? "Uploading..." : "Browse Files"}
//           </Button>

//           {value?.length > 0 && (
//             <Box sx={{ mt: 2, textAlign: "left" }}>
//               {value.map((file) => {
//                 const { Icon, color } = getFileIcon(file);

//                 return (
//                   <Box key={file._id || file.tempId} sx={{ mb: 1.5 }}>
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                       <Icon sx={{ color, fontSize: 22 }} />
//                       <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                         {file.name} • {(file.size / 1024 / 1024).toFixed(2)} MB
//                       </Typography>
//                     </Box>

//                     <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                       <LinearProgress
//                         variant="determinate"
//                         value={file.progress || 0}
//                         sx={{
//                           flexGrow: 1,
//                           height: 8,
//                           borderRadius: 5,
//                           backgroundColor: "#ede9fe",
//                           "& .MuiLinearProgress-bar": {
//                             backgroundColor: "#890eeeff",
//                           },
//                         }}
//                       />

//                       <Typography
//                         variant="caption"
//                         sx={{
//                           minWidth: 35,
//                           fontWeight: 600,
//                           color: "#890eeeff",
//                         }}
//                       >
//                         {file.progress || 0}%
//                       </Typography>

//                       {file.path?.public_id && (
//                         <IconButton
//                           size="small"
//                           color="error"
//                           onClick={() => handleRemove(file)}
//                         >
//                           <Delete fontSize="small" />
//                         </IconButton>
//                       )}
//                     </Box>
//                   </Box>
//                 );
//               })}
//             </Box>
//           )}
//         </Box>

//         {helperText && (
//           <Typography
//             variant="caption"
//             color={error ? "error" : "text.secondary"}
//             sx={{ mt: 1, display: "block" }}
//           >
//             {helperText}
//           </Typography>
//         )}
//       </Box>
//     </ClientOnly>
//   );
// };

// export default MultiImageUploadInput;



"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  CircularProgress,
  LinearProgress,
  Snackbar,
  Alert,
} from "@mui/material";

import {
  CloudUpload,
  Delete,
  AddPhotoAlternate,
} from "@mui/icons-material";

/* ===== FILE TYPE ICONS ===== */
import ImageIcon from "@mui/icons-material/Image";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import ArchiveIcon from "@mui/icons-material/Archive";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";

import axios from "axios";
import inputStyles from "./inputStyles";

/* ===============================
   ClientOnly
================================ */
function ClientOnly({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return children;
}

/* ================= FILE ICON MAP ================= */
const FILE_ICON_MAP = {
  jpg: { icon: ImageIcon, color: "#10b981" },
  jpeg: { icon: ImageIcon, color: "#10b981" },
  png: { icon: ImageIcon, color: "#10b981" },
  bmp: { icon: ImageIcon, color: "#10b981" },

  mp4: { icon: VideoFileIcon, color: "#2563eb" },
  webm: { icon: VideoFileIcon, color: "#2563eb" },
  mov: { icon: VideoFileIcon, color: "#2563eb" },
  avi: { icon: VideoFileIcon, color: "#2563eb" },

  mp3: { icon: AudiotrackIcon, color: "#f59e0b" },
  wav: { icon: AudiotrackIcon, color: "#f59e0b" },
  ogg: { icon: AudiotrackIcon, color: "#f59e0b" },

  pdf: { icon: PictureAsPdfIcon, color: "#ef4444" },
  doc: { icon: DescriptionIcon, color: "#2563eb" },
  docx: { icon: DescriptionIcon, color: "#2563eb" },
  xls: { icon: DescriptionIcon, color: "#16a34a" },
  xlsx: { icon: DescriptionIcon, color: "#16a34a" },

  zip: { icon: ArchiveIcon, color: "#7c3aed" },
  rar: { icon: ArchiveIcon, color: "#7c3aed" },

  txt: { icon: InsertDriveFileIcon, color: "#6b7280" },
};

/* ================= HELPER ================= */
const getFileIcon = (file) => {
  const ext = file.extension || file.name?.split(".").pop()?.toLowerCase();
  const config = FILE_ICON_MAP[ext];
  if (!config) return { Icon: InsertDriveFileIcon, color: "#6b7280" };
  return { Icon: config.icon, color: config.color };
};

/* ================= UPLOAD TEXT HELPER ================= */
const getUploadText = (extensions = []) => {
  if (!extensions.length) {
    return "Upload image, video, audio, zip, pdf, etc.";
  }

  const image = ["jpg", "jpeg", "png", "bmp"];
  const video = ["mp4", "mov", "avi", "webm"];
  const audio = ["mp3", "wav", "ogg", "m4a"];
  const archive = ["zip", "rar"];

  const parts = [];

  if (extensions.some((e) => image.includes(e))) parts.push("Image");
  if (extensions.some((e) => video.includes(e))) parts.push("Video");
  if (extensions.some((e) => audio.includes(e))) parts.push("Audio");
  if (extensions.some((e) => archive.includes(e))) parts.push("ZIP");
  if (extensions.includes("pdf")) parts.push("PDF");

  return ` Drag & Drop,   Upload|| ${parts.join(", ")} files`;
};

/* ================= COMPONENT ================= */
const MultiImageUploadInput = ({
  label = "Upload Files",
  value = [],
  onChange,
  disabled = false,
  error = false,
  helperText = "",
  accept = "*/*",
  maxSize = 50 * 1024 * 1024,
  sx = {},
  categoryId,
  categories,
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });

  const showError = (message) => {
    setSnackbar({ open: true, message });
  };

  /* ===== Category Logic ===== */
  const selectedCategory = categories?.find(
    (cat) => cat._id === categoryId
  );

  const allowedExtensions = selectedCategory?.fileTypes || [];

  const uploadToServer = async (file, tempId) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("categoryId", categoryId);

    const res = await axios.post(
      `${process.env.API}/author/files/file`,
      formData,
      {
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / e.total);
          onChange((prev) =>
            prev.map((f) =>
              f.tempId === tempId ? { ...f, progress: percent } : f
            )
          );
        },
      }
    );

    return res.data;
  };

  /* ===== FILE VALIDATION ===== */
  const handleFiles = async (files) => {
    if (!categoryId || !allowedExtensions.length) {
      showError("Please select a category first");
      return;
    }

    const fileArray = Array.from(files);
    const validFiles = [];
    const invalidFiles = [];

    fileArray.forEach((file) => {
      const ext = file.name.split(".").pop()?.toLowerCase();
      if (allowedExtensions.includes(ext)) {
        validFiles.push(file);
      } else {
        invalidFiles.push(file.name);
      }
    });

    if (invalidFiles.length) {
      showError(
        `Invalid file type. Allowed: ${allowedExtensions
          .join(", ")
          .toUpperCase()}`
      );
    }

    if (!validFiles.length) return;

    setUploading(true);

    const tempFiles = validFiles.map((file) => ({
      tempId: `${file.name}-${Date.now()}`,
      name: file.name,
      size: file.size,
      mime_type: file.type,
      extension: file.name.split(".").pop()?.toLowerCase(),
      progress: 0,
    }));

    onChange([...(value || []), ...tempFiles]);

    try {
      for (const file of validFiles) {
        if (file.size > maxSize) continue;

        const tempId = tempFiles.find((f) => f.name === file.name)?.tempId;
        const uploaded = await uploadToServer(file, tempId);

        onChange((prev) =>
          prev.map((f) =>
            f.tempId === tempId ? { ...uploaded, progress: 100 } : f
          )
        );
      }
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async (file) => {
    await fetch(`${process.env.API}/author/files/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        public_id: file.path?.public_id,
        categoryId,
      }),
    });

    onChange(value.filter((v) => v._id !== file._id));
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
    <ClientOnly>
      <Box sx={getStyles()}>
        <input
          type="file"
          ref={fileInputRef}
          hidden
          multiple
          accept={
            allowedExtensions.length
              ? allowedExtensions.map((e) => `.${e}`).join(",")
              : accept
          }
          disabled={disabled || uploading}
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />

        <Box
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            handleFiles(e.dataTransfer.files);
          }}
          sx={{ textAlign: "center" }}
        >
          <AddPhotoAlternate sx={{ fontSize: 68, color: "#890eeeff", mb: 1 }} />

          <Typography variant="h6">{label}</Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {getUploadText(allowedExtensions)}
          </Typography>

          <Button
            variant="contained"
            startIcon={
              uploading ? <CircularProgress size={18} /> : <CloudUpload />
            }
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled || uploading}
            sx={{
              backgroundColor: "#890eeeff",
              "&:hover": { backgroundColor: "#890eeeff" },
            }}
          >
            {uploading ? "Uploading..." : "Browse Files"}
          </Button>

          {value?.length > 0 && (
            <Box sx={{ mt: 2, textAlign: "left" }}>
              {value.map((file) => {
                const { Icon, color } = getFileIcon(file);

                return (
                  <Box key={file._id || file.tempId} sx={{ mb: 1.5 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Icon sx={{ color, fontSize: 22 }} />
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {file.name} •{" "}
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={file.progress || 0}
                        sx={{
                          flexGrow: 1,
                          height: 8,
                          borderRadius: 5,
                          backgroundColor: "#ede9fe",
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: "#890eeeff",
                          },
                        }}
                      />

                      <Typography
                        variant="caption"
                        sx={{
                          minWidth: 35,
                          fontWeight: 600,
                          color: "#890eeeff",
                        }}
                      >
                        {file.progress || 0}%
                      </Typography>

                      {file.path?.public_id && (
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleRemove(file)}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      )}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          )}
        </Box>

        {helperText && (
          <Typography
            variant="caption"
            color={error ? "error" : "text.secondary"}
            sx={{ mt: 1, display: "block" }}
          >
            {helperText}
          </Typography>
        )}

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar({ open: false, message: "" })}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            severity="error"
            variant="filled"
            onClose={() => setSnackbar({ open: false, message: "" })}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </ClientOnly>
  );
};

export default MultiImageUploadInput;

































// 'use client';

// import React, { useEffect, useState, useRef } from 'react';
// import {
//   Box,
//   Typography,
//   Button,
//   IconButton,
//   CircularProgress,
//   LinearProgress,
//   Alert,
//   Snackbar,
//   Chip,
// } from '@mui/material';
// import { CloudUpload, Delete, AddPhotoAlternate } from '@mui/icons-material';

// /* ===== FILE TYPE ICONS ===== */
// import ImageIcon from '@mui/icons-material/Image';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// import DescriptionIcon from '@mui/icons-material/Description';
// import ArchiveIcon from '@mui/icons-material/Archive';
// import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
// import VideoFileIcon from '@mui/icons-material/VideoFile';
// import AudiotrackIcon from '@mui/icons-material/Audiotrack';

// import axios from 'axios';
// import inputStyles from './uploadStyles';

// /* ===============================
//    ClientOnly (same file)
// ================================ */
// function ClientOnly({ children }) {
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;
//   return children;
// }

// /* ================= FILE ICON MAP ================= */
// const FILE_ICON_MAP = {
//   jpg: { icon: ImageIcon, color: '#10b981', label: 'Image' },
//   jpeg: { icon: ImageIcon, color: '#10b981', label: 'Image' },
//   png: { icon: ImageIcon, color: '#10b981', label: 'Image' },
//   bmp: { icon: ImageIcon, color: '#10b981', label: 'Image' },
//   webp: { icon: ImageIcon, color: '#10b981', label: 'Image' },
//   gif: { icon: ImageIcon, color: '#10b981', label: 'Image' },

//   mp4: { icon: VideoFileIcon, color: '#2563eb', label: 'Video' },
//   webm: { icon: VideoFileIcon, color: '#2563eb', label: 'Video' },
//   mov: { icon: VideoFileIcon, color: '#2563eb', label: 'Video' },
//   avi: { icon: VideoFileIcon, color: '#2563eb', label: 'Video' },
//   mkv: { icon: VideoFileIcon, color: '#2563eb', label: 'Video' },

//   mp3: { icon: AudiotrackIcon, color: '#f59e0b', label: 'Audio' },
//   wav: { icon: AudiotrackIcon, color: '#f59e0b', label: 'Audio' },
//   ogg: { icon: AudiotrackIcon, color: '#f59e0b', label: 'Audio' },
//   m4a: { icon: AudiotrackIcon, color: '#f59e0b', label: 'Audio' },
//   aac: { icon: AudiotrackIcon, color: '#f59e0b', label: 'Audio' },
//   flac: { icon: AudiotrackIcon, color: '#f59e0b', label: 'Audio' },

//   pdf: { icon: PictureAsPdfIcon, color: '#ef4444', label: 'PDF' },
//   doc: { icon: DescriptionIcon, color: '#2563eb', label: 'Word' },
//   docx: { icon: DescriptionIcon, color: '#2563eb', label: 'Word' },
//   xls: { icon: DescriptionIcon, color: '#16a34a', label: 'Excel' },
//   xlsx: { icon: DescriptionIcon, color: '#16a34a', label: 'Excel' },
//   ppt: { icon: DescriptionIcon, color: '#ea580c', label: 'PPT' },
//   pptx: { icon: DescriptionIcon, color: '#ea580c', label: 'PPT' },

//   zip: { icon: ArchiveIcon, color: '#7c3aed', label: 'ZIP' },
//   rar: { icon: ArchiveIcon, color: '#7c3aed', label: 'RAR' },
//   '7z': { icon: ArchiveIcon, color: '#7c3aed', label: '7Z' },

//   txt: { icon: InsertDriveFileIcon, color: '#6b7280', label: 'Text' },
//   csv: { icon: InsertDriveFileIcon, color: '#6b7280', label: 'CSV' },
//   json: { icon: InsertDriveFileIcon, color: '#6b7280', label: 'JSON' },
// };

// /* ================= HELPER FUNCTIONS ================= */
// const getFileIcon = (file) => {
//   const ext = file.extension || file.name?.split('.').pop()?.toLowerCase();
//   const config = FILE_ICON_MAP[ext] || {
//     icon: InsertDriveFileIcon,
//     color: '#6b7280',
//     label: 'File'
//   };

//   return { Icon: config.icon, color: config.color, label: config.label };
// };

// const formatFileSize = (bytes) => {
//   if (bytes === 0) return '0 Bytes';
//   const k = 1024;
//   const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//   const i = Math.floor(Math.log(bytes) / Math.log(k));
//   return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
// };

// /* ================= COMPONENT ================= */
// const MultiImageUploadInput = ({
//   label = 'Upload Files',
//   value = [],
//   onChange,
//   disabled = false,
//   error = false,
//   helperText = '',
//   accept = '*/*',
//   maxSize = 50 * 1024 * 1024,
//   sx = {},
//   categoryId,
// }) => {
//   const [dragOver, setDragOver] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
//   const fileInputRef = useRef(null);

//   // Show snackbar notification
//   const showSnackbar = (message, severity = 'info') => {
//     setSnackbar({ open: true, message, severity });
//   };

//   const closeSnackbar = () => {
//     setSnackbar({ ...snackbar, open: false });
//   };

//   const uploadToServer = async (file, tempId) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('categoryId', categoryId);

//     try {
//       const res = await axios.post(
//         `${process.env.API}/author/files/file`,
//         formData,
//         {
//           onUploadProgress: (e) => {
//             const percent = Math.round((e.loaded * 100) / e.total);
//             onChange((prev) =>
//               prev.map((f) =>
//                 f.tempId === tempId ? { ...f, progress: percent } : f,
//               ),
//             );
//           },
//         },
//       );

//       showSnackbar(`${file.name} uploaded successfully!`, 'success');
//       return res.data;
//     } catch (error) {
//       console.error('Upload error:', error);
//       showSnackbar(`Failed to upload ${file.name}`, 'error');
//       throw error;
//     }
//   };

//   const handleFiles = async (files) => {
//     const fileArray = Array.from(files);
//     setUploading(true);

//     // Validate file sizes
//     const oversizedFiles = fileArray.filter(file => file.size > maxSize);
//     if (oversizedFiles.length > 0) {
//       showSnackbar(`${oversizedFiles.length} file(s) exceed ${formatFileSize(maxSize)} limit`, 'warning');
//     }

//     const validFiles = fileArray.filter(file => file.size <= maxSize);

//     if (validFiles.length === 0) {
//       setUploading(false);
//       return;
//     }

//     const tempFiles = validFiles.map((file) => ({
//       tempId: `${file.name}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
//       name: file.name,
//       size: file.size,
//       mime_type: file.type,
//       extension: file.name.split('.').pop()?.toLowerCase(),
//       progress: 0,
//       status: 'uploading',
//     }));

//     onChange([...(value || []), ...tempFiles]);

//     try {
//       for (const file of validFiles) {
//         const tempId = tempFiles.find((f) => f.name === file.name)?.tempId;
//         if (!tempId) continue;

//         try {
//           const uploaded = await uploadToServer(file, tempId);
//           onChange((prev) =>
//             prev.map((f) =>
//               f.tempId === tempId ? { ...uploaded, progress: 100, status: 'completed' } : f,
//             ),
//           );
//         } catch (error) {
//           onChange((prev) =>
//             prev.map((f) =>
//               f.tempId === tempId ? { ...f, progress: 0, status: 'error', error: error.message } : f,
//             ),
//           );
//         }
//       }
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleRemove = async (file) => {
//     if (file.path?.public_id) {
//       try {
//         await fetch(`${process.env.API}/author/files/delete`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             public_id: file.path?.public_id,
//             categoryId,
//           }),
//         });
//         showSnackbar(`${file.name} deleted successfully`, 'success');
//       } catch (error) {
//         console.error('Delete error:', error);
//         showSnackbar(`Failed to delete ${file.name}`, 'error');
//         return;
//       }
//     }

//     onChange(value.filter((v) => v._id !== file._id && v.tempId !== file.tempId));
//   };

//   const handleFileChange = (e) => {
//     if (e.target.files?.length) {
//       handleFiles(e.target.files);
//       e.target.value = '';
//     }
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setDragOver(false);
//     if (e.dataTransfer.files?.length) {
//       handleFiles(e.dataTransfer.files);
//     }
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     setDragOver(true);
//   };

//   const handleDragLeave = (e) => {
//     e.preventDefault();
//     setDragOver(false);
//   };

//   const getStyles = () => {
//     let styles = { ...inputStyles.container, ...inputStyles.imageUpload };
//     if (dragOver) styles = { ...styles, ...inputStyles.imageUpload['&.dragOver'] };
//     if (error) styles = { ...styles, ...inputStyles.error };
//     if (disabled) styles = { ...styles, ...inputStyles.disabled };
//     return { ...styles, ...sx };
//   };

//   // Add CSS animations
//   const styleTag = `
//     @keyframes rotate {
//       0% { transform: rotate(0deg); }
//       100% { transform: rotate(360deg); }
//     }

//     @keyframes bounce {
//       0%, 100% { transform: translateY(0); }
//       50% { transform: translateY(-5px); }
//     }
//   `;

//   return (
//     <ClientOnly>
//       <style>{styleTag}</style>

//       <Box sx={getStyles()}>
//         <input
//           type="file"
//           ref={fileInputRef}
//           hidden
//           multiple
//           accept={accept}
//           disabled={disabled || uploading}
//           onChange={handleFileChange}
//         />

//         {/* Upload Area */}
//         <Box
//           onDragOver={handleDragOver}
//           onDragLeave={handleDragLeave}
//           onDrop={handleDrop}
//           onClick={disabled || uploading ? undefined : () => fileInputRef.current?.click()}
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             justifyContent: 'center',
//             minHeight: '300px',
//             position: 'relative',
//           }}
//         >
//           {/* Drag Overlay */}
//           {dragOver && (
//             <Box
//               sx={{
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,
//                 right: 0,
//                 bottom: 0,
//                 backgroundColor: '#890eeeff',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 zIndex: 10,
//                 borderRadius: '20px',
//                 backdropFilter: 'blur(4px)',
//               }}
//             >
//               <Typography
//                 sx={{
//                   backgroundColor: 'primary.main',
//                   color: 'white',
//                   padding: '16px 32px',
//                   borderRadius: '12px',
//                   fontSize: '1.2rem',
//                   fontWeight: 600,
//                   boxShadow: '0 10px 40px #890eeeff',
//                 }}
//               >
//                 Drop files here
//               </Typography>
//             </Box>
//           )}

//           {/* Main Icon */}
//           <Box sx={inputStyles.mainIconContainer}>
//             <AddPhotoAlternate sx={inputStyles.mainIcon} />
//           </Box>

//           {/* Title */}
//           <Typography
//             variant="h4"
//             sx={{
//               fontWeight: 700,
//               background: 'linear-gradient(45deg, #890EEE 0%, #BA68C8 100%)',
//               backgroundClip: 'text',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               marginBottom: '8px',
//               textAlign: 'center',
//             }}
//           >
//             {label}
//           </Typography>

//           {/* Subtitle */}
//           <Typography
//             variant="body1"
//             sx={{
//               color: 'grey.600',
//               textAlign: 'center',
//               maxWidth: '500px',
//               marginBottom: '32px',
//               lineHeight: 1.6,
//             }}
//           >
//             Drag & drop your files here or click to browse
//             <br />
//             Supports images, videos, audio, documents (Max {formatFileSize(maxSize)} per file)
//           </Typography>

//           {/* Upload Button */}
//           <Button
//             variant="contained"
//             startIcon={
//               uploading ? (
//                 <CircularProgress size={20} sx={{ color: 'white' }} />
//               ) : (
//                 <CloudUpload />
//               )
//             }
//             onClick={(e) => {
//               e.stopPropagation();
//               fileInputRef.current?.click();
//             }}
//             disabled={disabled || uploading || !categoryId}
//             sx={inputStyles.uploadButton}
//           >
//             {uploading ? 'Uploading...' : 'Select Files'}
//           </Button>

//           {/* Category Warning */}
//           {!categoryId && (
//             <Typography
//               variant="caption"
//               sx={{
//                 color: 'warning.main',
//                 marginTop: '16px',
//                 fontWeight: 500,
//               }}
//             >
//               Please select a category first
//             </Typography>
//           )}

//           {/* Upload Stats */}
//           {value.length > 0 && (
//             <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
//               <Chip
//                 label={`Total: ${value.length}`}
//                 sx={{
//                   backgroundColor: 'primary.50',
//                   color: 'primary.main',
//                   fontWeight: 600,
//                 }}
//               />
//               <Chip
//                 label={`Uploading: ${value.filter(f => f.status === 'uploading').length}`}
//                 sx={{
//                   backgroundColor: 'warning.50',
//                   color: 'warning.main',
//                   fontWeight: 600,
//                 }}
//               />
//               <Chip
//                 label={`Completed: ${value.filter(f => f.status === 'completed' || f._id).length}`}
//                 sx={{
//                   backgroundColor: 'success.50',
//                   color: 'success.main',
//                   fontWeight: 600,
//                 }}
//               />
//             </Box>
//           )}
//         </Box>

//         {/* File List */}
//         {value?.length > 0 && (
//           <Box sx={inputStyles.fileListContainer}>
//             <Box sx={{ padding: '20px 24px', borderBottom: '1px solid', borderColor: 'grey.200' }}>
//               <Typography variant="h6" sx={{ fontWeight: 600, color: 'grey.900' }}>
//                 Uploaded Files ({value.length})
//               </Typography>
//             </Box>

//             <Box sx={{ padding: '16px', maxHeight: '400px', overflowY: 'auto' }}>
//               {value.map((file) => {
//                 const { Icon, color, label } = getFileIcon(file);
//                 const isUploading = file.status === 'uploading';
//                 const hasError = file.status === 'error';
//                 const isCompleted = file.status === 'completed' || file._id;

//                 return (
//                   <Box
//                     key={file._id || file.tempId}
//                     sx={{
//                       ...inputStyles.fileItem,
//                       borderColor: hasError ? 'error.light' : isUploading ? 'warning.light' : isCompleted ? 'success.light' : 'grey.200',
//                       backgroundColor: hasError ? 'rgba(239, 68, 68, 0.02)' : isUploading ? 'rgba(245, 158, 11, 0.02)' : isCompleted ? 'rgba(16, 185, 129, 0.02)' : 'white',
//                     }}
//                   >
//                     <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                       <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
//                         {/* File Icon */}
//                         <Box sx={{ ...inputStyles.fileIconWrapper, backgroundColor: `${color}15` }}>
//                           <Icon sx={{ color, fontSize: 24 }} />
//                         </Box>

//                         {/* File Info */}
//                         <Box sx={{ flex: 1, minWidth: 0 }}>
//                           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
//                             <Typography
//                               variant="subtitle2"
//                               sx={{
//                                 fontWeight: 600,
//                                 color: hasError ? 'error.main' : 'grey.900',
//                                 overflow: 'hidden',
//                                 textOverflow: 'ellipsis',
//                                 whiteSpace: 'nowrap',
//                               }}
//                             >
//                               {file.name}
//                             </Typography>

//                             <Chip
//                               label={label}
//                               size="small"
//                               sx={{
//                                 height: '20px',
//                                 fontSize: '0.65rem',
//                                 backgroundColor: `${color}15`,
//                                 color: color,
//                                 fontWeight: 500,
//                               }}
//                             />

//                             {isCompleted && (
//                               <Box
//                                 sx={{
//                                   width: '16px',
//                                   height: '16px',
//                                   borderRadius: '50%',
//                                   backgroundColor: 'success.main',
//                                   display: 'flex',
//                                   alignItems: 'center',
//                                   justifyContent: 'center',
//                                 }}
//                               >
//                                 <Typography variant="caption" sx={{ color: 'white', fontSize: '0.6rem' }}>
//                                   ✓
//                                 </Typography>
//                               </Box>
//                             )}
//                           </Box>

//                           <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
//                             {formatFileSize(file.size)} • {file.mime_type}
//                           </Typography>

//                           {/* Progress Bar */}
//                           {(isUploading || file.progress > 0) && (
//                             <Box sx={{ mt: 1 }}>
//                               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                                 <LinearProgress
//                                   variant="determinate"
//                                   value={file.progress || 0}
//                                   sx={inputStyles.progressBar}
//                                 />
//                                 <Typography sx={inputStyles.progressPercentage}>
//                                   {file.progress || 0}%
//                                 </Typography>
//                               </Box>

//                               {hasError && file.error && (
//                                 <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
//                                   {file.error}
//                                 </Typography>
//                               )}
//                             </Box>
//                           )}
//                         </Box>
//                       </Box>

//                       {/* Delete Button */}
//                       {file.path?.public_id && (
//                         <IconButton
//                           size="small"
//                           onClick={() => handleRemove(file)}
//                           disabled={disabled}
//                           sx={inputStyles.deleteButton}
//                         >
//                           <Delete fontSize="small" />
//                         </IconButton>
//                       )}
//                     </Box>
//                   </Box>
//                 );
//               })}
//             </Box>
//           </Box>
//         )}

//         {helperText && (
//           <Typography
//             variant="caption"
//             sx={{
//               ...inputStyles.helperText,
//               ...(error && inputStyles.helperText['&.error']),
//             }}
//           >
//             {helperText}
//           </Typography>
//         )}
//       </Box>

//       {/* Snackbar for notifications */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={closeSnackbar}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//       >
//         <Alert
//           onClose={closeSnackbar}
//           severity={snackbar.severity}
//           sx={{
//             width: '100%',
//             borderRadius: '12px',
//             boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
//             alignItems: 'flex-start',
//           }}
//           elevation={6}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </ClientOnly>
//   );
// };

// export default MultiImageUploadInput;