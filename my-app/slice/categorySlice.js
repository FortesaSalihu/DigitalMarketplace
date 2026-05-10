
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";



export const fetchCategoryById = createAsyncThunk(
  'categories/fetchCategoryById',
  async (id) => {
    try {
      const response = await fetch(`${process.env.API}/admin/categories/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch category:`);
      }



      return await response.json();
    } catch (error) {
      toast.error(`Error loading category: ${error.message}`);
      throw error;
    }
  }
);


export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    try {
      const response = await fetch(`${process.env.API}/admin/categories`);
      if (!response.ok) {
        throw new Error(`Failed to fetch categories`);
      }
      return await response.json();
    } catch (error) {
      toast.error(`Error loading categories: ${error.message}`);
      throw error;
    }
  }
);


export const fetchHomeCategories = createAsyncThunk(
  "categories/fetchHomeCategories",
  async () => {
    try {
      const response = await fetch(`${process.env.API}/categories`);
      if (!response.ok) {
        throw new Error(`Failed to fetch categories`);
      }
      return await response.json();
    } catch (error) {
      toast.error(`Error loading categories: ${error.message}`);
      throw error;
    }
  }
);


export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${process.env.API}/admin/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoryData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      toast.success("Category created successfully");
      return data;


    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);


export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, categoryData }) => {




    try {
      const response = await fetch(`${process.env.API}/admin/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoryData),
      });
      if (!response.ok) {
        throw new Error(`Failed to update category: ${response.status}`);
      }
      const data = await response.json();
      toast.success("Category updated successfully!");
      return data;
    } catch (error) {
      toast.error(`Error updating category: ${error.message}`);
      throw error;
    }
  }
);


export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id) => {
    console.log("delete di ", id)


    try {
      const response = await fetch(`${process.env.API}/admin/categories/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Failed to delete category: ${response.status}`);
      }
      toast.success("Category deleted successfully!");
      return id;
    } catch (error) {
      toast.error(`Error deleting category: ${error.message}`);
      throw error;
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    list: [],
    current: null,
    loading: false,
    error: null,
    homeCategories: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch Home Categories
      .addCase(fetchHomeCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomeCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.homeCategories = action.payload;
      })
      .addCase(fetchHomeCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update Category
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex((c) => c._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete Category
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((c) => c._id !== action.payload);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch Single Category
      .addCase(fetchCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload; // ✅ FIX

        const index = state.list.findIndex(
          (c) => c._id === action.payload._id
        );

        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;