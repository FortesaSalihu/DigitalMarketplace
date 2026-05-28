"use client";
// --- ONE-LINER findDOMNode polyfill (very simple) ---
if (typeof window !== "undefined")
  try {
    const rd = require("react-dom");
    if (!rd.findDOMNode)
      rd.findDOMNode = (inst) =>
        inst?.current ?? (inst && inst.nodeType === 1 ? inst : null);
  } catch (e) {}

import React, { useState, useEffect } from "react";
import { Box, Typography, Divider, Paper } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import { marked } from "marked";
import Button from "@/components/inputs/Button";
import TextInput from "@/components/inputs/TextInput";
// import CategoryAttributes from "./CategoryAttributes";
import styles from "./newItemStyles";
// import FilesSection from "./FilesSection";
// import SupportPricingSection from "./SupportPricingSection";
// import { fetchCategories } from "@/slice/categorySlice";
// import { fetchSubcategories } from "@/slice/subcategorySlice";

// import FreeItemReviewerSection from "./FreeItemReviewerSection";
// import { runAi } from "@/ai/Ai";
import axios from "axios";
import { createAuthorItem, updateAuthorItem } from "@/slice/authorItemSlice";

const NewItemForm = ({ mode = "create", itemId = null, current = null }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [version, setVersion] = useState("");
  const [demoLink, setDemoLink] = useState("");
  const [tags, setTags] = useState([]);
  const [previewType, setPreviewType] = useState("");

  const [previewFiles, setPreviewFiles] = useState("");

  const [mainFileType, setMainFileType] = useState("");
  const [mainFileLink, setMainFileLink] = useState("");

  const [mainFileUpload, setMainFileUpload] = useState([]);

  const [screenshots, setScreenshots] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [supportMessage, setSupportMessage] = useState("");

  const [supported, setSupported] = useState("no");
  const [regularPrice, setRegularPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");

  const [isFree, setIsFree] = useState("");
  const [reviewerMessage, setReviewerMessage] = useState("");
  const [status, setStatus] = useState("");
  const { list: categories } = useSelector((s) => s.categories);
  const { list: subcategories } = useSelector((s) => s.subcategories);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSubcategories());
  }, [dispatch]);

  useEffect(() => {
    const slug = searchParams.get("category");
    if (!slug || categories.length === 0) return;

    const match = categories.find((c) => c.slug === slug);
    if (match) setCategoryId(match._id);
  }, [searchParams, categories]);

  const filteredSubcategories = subcategories.filter((s) =>
    typeof s.category_id === "string"
      ? s.category_id === categoryId
      : s.category_id?._id === categoryId
  );

  useEffect(() => {
    if (!categoryId) return;

    const fetchUploadedFiles = async () => {
      const res = await axios.get(`${process.env.API}/author/files/file`, {
        params: { categoryId },
      });

      setUploadedFiles(
        res.data.map((f) => ({
          ...f,
          progress: 100,
        }))
      );
    };

    fetchUploadedFiles();
  }, [categoryId]);

  useEffect(() => {
    if (mode === "edit" && current) {
      setName(current.name || "");

      setDescription(current.description || "");

      setCategoryId(
        typeof current.category_id === "string"
          ? current.category_id
          : current.category_id?._id
      );

      setSubCategoryId(
        typeof current.sub_category_id === "string"
          ? current.sub_category_id
          : current.sub_category_id?._id || ""
      );

      setVersion(current.version || "");

      setDemoLink(current.demo_link || "");

      setTags(current.tags || []);

      setPreviewType(current.preview_type || "");

      setPreviewFiles(
        current.preview_image || current.preview_audio || current.preview_video
      );

      setMainFileUpload(current.main_files || []);

      setScreenshots(current.screenshots || []);

      setSupported(current.is_supported ? "yes" : "no");

      setSupportMessage(current.support_instructions);

      setRegularPrice(current.price || "");
      setDiscountPrice(current.discount_price || "");

      setIsFree(current.is_free ? "yes" : "no");

      setStatus(current?.status || "");

      setReviewerMessage(current.reviewer_message);
    }
  }, [mode, current]);

  const generateDescriptionWithAI = async () => {
    if (!name || !categoryId) return;

    const categoryName =
      categories.find((c) => c._id === categoryId)?.name || "General";

    const subCategoryName = subCategoryId
      ? subcategories.find((s) => s._id === subCategoryId)?.name || ""
      : "";

    const prompt = `
Write a professional marketplace product description in MARKDOWN.

Item Name: ${name}
Category: ${categoryName}
Sub Category: ${subCategoryName}
Tags: ${tags.join(", ")}

Rules:
- Use headings
- Use bullet points
- Clean structure
- No pricing
`;

    try {
      const markdown = await runAi(prompt);

      // 🔥 Convert Markdown → HTML
      const html = marked.parse(markdown);

      // ✅ Push clean HTML into Quill
      setDescription(html);
    } catch (err) {
      console.error("AI ERROR:", err);
      alert("Failed to generate description");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      description,
      category_id: categoryId,
      subcategory_id: subCategoryId,
      version,
      demo_link: demoLink,
      tags,

      // ===== PREVIEW =====
      preview_type: previewType,
      preview_image: null,
      preview_video: null,
      preview_audio: null,

      // ===== MAIN FILE =====
      main_file: null,
      main_files: [],
      is_main_file_external: false,

      screenshots,
      supported,
      support_instructions: supportMessage,
      regularPrice: regularPrice,
      discount_price: discountPrice,

      is_free: isFree === "yes",

      reviewer_message: reviewerMessage,
    };

    if (previewType === "image") {
      payload.preview_image = previewFiles;
    }

    if (previewType === "video") {
      payload.preview_video = previewFiles;
    }

    if (previewType === "audio") {
      payload.preview_audio = previewFiles;
    }

    if (mainFileType === "link") {
      payload.main_file = mainFileLink;
      payload.is_main_file_external = true;
    }

    if (mainFileType === "upload") {
      payload.main_files = mainFileUpload;
      payload.is_main_file_external = false;
    }

    let result;

    if (mode === "edit") {
      result = await dispatch(
        updateAuthorItem({
          id: itemId,
          itemData: payload,
        })
      );
    } else {
      result = await dispatch(createAuthorItem(payload));
    }

    if (
      createAuthorItem.fulfilled.match(result) ||
      updateAuthorItem.fulfilled.match(result)
    ) {
      router.push("/dashboard/author/products");
    }

    console.log(" FINAL PAYLOAD", payload);
  };

  return (
    <Box sx={styles.page}>
      {mode === "create" && (
        <Box sx={styles.header}>
          <Box>
            <Typography sx={styles.title}>New Item</Typography>
            <Typography sx={styles.subtitle}>Manage your items.</Typography>
          </Box>

          <Button variant="contained" onClick={() => router.back()}>
            Back
          </Button>
        </Box>
      )}
      <Paper elevation={0} sx={styles.card}>
        <Typography sx={styles.sectionTitle}>Name And Description</Typography>

        <Divider sx={styles.divider} />

        <Box sx={styles.field}>
          <TextInput
            label="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>

        <Box sx={{ position: "relative" }}>
          {/* AI GENERATE BUTTON */}
          <Tooltip title="Generate description with AI">
            <IconButton
              onClick={generateDescriptionWithAI}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                zIndex: 10,
                color: "#890eee",
                backgroundColor: "#f5f3ff",
                "&:hover": {
                  backgroundColor: "#ede9fe",
                },
              }}
            >
              <AutoAwesomeIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Box
            sx={{
              ...styles.editorWrapper,
              border: "5px solid #890eeeff",
              "& .ql-container": { minHeight: 200 },
            }}
          >
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              placeholder="Write item description..."
            />
          </Box>
        </Box>
      </Paper>

      <CategoryAttributes
        categoryId={categoryId}
        subCategoryId={subCategoryId}
        categories={categories}
        subcategories={filteredSubcategories}
        version={version}
        demoLink={demoLink}
        tags={tags}
        onCategoryChange={(id) => {
          setCategoryId(id);
          setSubCategoryId("");
        }}
        onSubCategoryChange={(id) => setSubCategoryId(id)}
        onVersionChange={(e) => setVersion(e.target.value)}
        onDemoLinkChange={(e) => setDemoLink(e.target.value)}
        onTagsChange={(newTags) => setTags(newTags)}
      />

      <FilesSection
        categoryId={categoryId}
        categories={categories}
        previewType={previewType}
        previewFiles={previewFiles}
        mainFileType={mainFileType}
        mainFileLink={mainFileLink}
        mainFileUpload={mainFileUpload}
        screenshots={screenshots}
        onPreviewTypeChange={(e) => setPreviewType(e.target.value)}
        onPreviewFilesChange={(e) => setPreviewFiles(e.target.value)}
        onMainFileTypeChange={(e) => setMainFileType(e.target.value)}
        onMainFileLinkChange={(e) => setMainFileLink(e.target.value)}
        onMainFileUploadChange={(e) => setMainFileUpload(e.target.value)}
        onScreenshotsChange={(e) => setScreenshots(e.target.value)}
        uploadedFiles={uploadedFiles}
        onUploadedFilesChange={(files) => setUploadedFiles(files)}
      />

      <SupportPricingSection
        supported={supported}
        regularPrice={regularPrice}
        discountPrice={discountPrice}
        supportMessage={supportMessage}
        onSupportedChange={(e) => setSupported(e.target.value)}
        onRegularPriceChange={(e) => setRegularPrice(e.target.value)}
        onDiscountPriceChange={(e) => setDiscountPrice(e.target.value)}
        onSupportMessageChange={(e) => setSupportMessage(e.target.value)}
      />

      <FreeItemReviewerSection
        isFree={isFree}
        reviewerMessage={reviewerMessage}
        onIsFreeChange={(e) => setIsFree(e.target.value)}
        onReviewerMessageChange={(e) => setReviewerMessage(e.target.value)}
      />
      <Box sx={styles.actions}>
        <Button onClick={handleSubmit}>Save Item</Button>
      </Box>
    </Box>
  );
};

export default NewItemForm;
