"use client";

import React, { useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import TextInput from "@/components/inputs/TextInput";
import MultiSelectInput from "@/components/inputs/MultiSelectInput";
import SelectInput from "@/components/inputs/SelectInput";
import Button from "@/components/inputs/Button";
import { createCategory } from "@/slice/categorySlice";
import styles from "./createCategoryStyles";

const FILE_TYPE_OPTIONS = [
    { label: "JPG", value: "jpg" },
    { label: "JPEG", value: "jpeg" },
    { label: "PNG", value: "png" },
    { label: "BMP", value: "bmp" },
    { label: "ZIP", value: "zip" },
    { label: "RAR", value: "rar" },
    { label: "PDF", value: "pdf" },
    { label: "DOC", value: "doc" },
    { label: "DOCX", value: "docx" },
    { label: "XLS", value: "xls" },
    { label: "XLSX", value: "xlsx" },
    { label: "PPT", value: "ppt" },
    { label: "PPTX", value: "pptx" },
    { label: "TXT", value: "txt" },
];

const BOOLEAN_OPTIONS = [
    { label: "Yes", value: true },
    { label: "No", value: false },
];

const CreateCategoryForm = () => {
    const router = useRouter();

    const dispatch = useDispatch();

    const { loading } = useSelector((state) => state.categories);

    consy[FormData, setFormData] = useState({
        category_name: "",
        file_types: [],
        show_at_featured: false,
    });


    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const result = await dispatch(createCategory(formData))

        if(createCategory.fulfilled.match(result)) {
            router.push("/dashboard/admin/categories/list");
        }
    };

    return (
        <Box sx={styles.page}>
            <Box sx={styles.header}>
                <Typography sx={styles.title}> Create Category </Typography>
                <Button size="small" startIcon={<ArrowBackIcon />} onClick={() => router.back()}> Go Back</Button>
            </Box>

            <Divider sx={styles.divider} />
            <Box
                component="form"
                sx={styles.card}
                onSubmit={handleSubmit}>


                <TextInput
                    label="Category Name"
                    name="category_name"
                    value={formData.category_name}
                    onChange={handleChange}
                    fullWidth />

                <Divider sx={styles.divider} />

                <MultiSelectInput
                    label="File Types"
                    name="file_types"
                    value={formData.file_types}
                    options={FILE_TYPE_OPTIONS}
                    onChange={handleChange}
                    fullWidth />

                <Divider sx={styles.divider} />

                <SelectInput
                    label="Show at Features"
                    name="show_at_features"
                    value={formData.show_at_featured}
                    options={BOOLEAN_OPTIONS}
                    onChange={handleChange}
                    fullWidth
                />

                <Divider sx={styles.divider} />

                <SelectInput
                    label="Show at Navigation"
                    name="show_at_nav"
                    value={formData.show_at_nav}
                    options={BOOLEAN_OPTIONS}
                    onChange={handleChange}
                    fullWidth
                />

                <Divider sx={styles.divider} />

                <Box sx={styles.actions} >
                    <Button type=" submit" loading={loading} color="success">
                        Create Category
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default CreateCategoryForm;