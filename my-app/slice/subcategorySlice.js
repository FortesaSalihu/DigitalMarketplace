import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const fetchSubcategoryById = createAsyncThunk(
  "subcategories/fetchSubcategoryById",
  async (id) => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/subcategories/${id}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch subcategory:`);
      }

      return await response.json();
    } catch (error) {
      toast.error(`Error loading subcategory: ${error.message}`);
      throw error;
    }
  }
);

export const fetchSubcategories = createAsyncThunk(
  "subcategories/fetchSubcategories",
  async () => {
    try {
      const response = await fetch(`${process.env.API}/admin/subcategories`);
      if (!response.ok) {
        throw new Error(`Failed to fetch subcategories`);
      }
      return await response.json();
    } catch (error) {
      toast.error(`Error loading subcategories: ${error.message}`);
      throw error;
    }
  }
);

// export const fetchHomeCategories = createAsyncThunk(
//   "categories/fetchHomeCategories",
//   async () => {
//     try {
//       const response = await fetch(`${process.env.API}/categories`);
//       if (!response.ok) {
//         throw new Error(`Failed to fetch categories`);
//       }
//       return await response.json();
//     } catch (error) {
//       toast.error(`Error loading categories: ${error.message}`);
//       throw error;
//     }
//   }
// );

export const createSubcategory = createAsyncThunk(
  "subcategories/createSubcategory",
  async (subcategoryData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${process.env.API}/admin/subcategories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subcategoryData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      toast.success("sub Category created successfully");
      return data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const updateSubcategory = createAsyncThunk(
  "subcategories/updateSubcategory",
  async ({ id, subcategoryData }) => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/subcategories/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(subcategoryData),
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to update sub category: ${response.status}`);
      }
      const data = await response.json();
      toast.success(" SubCategory updated successfully!");
      return data;
    } catch (error) {
      toast.error(`Error updating subcategory: ${error.message}`);
      throw error;
    }
  }
);

export const deleteSubcategory = createAsyncThunk(
  "subcategories/deleteSubcategory",
  async (id) => {
    // console.log("delete di ", id);

    try {
      const response = await fetch(
        `${process.env.API}/admin/subcategories/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to delete sub category: ${response.status}`);
      }
      toast.success(" sub Category deleted successfully!");
      return id;
    } catch (error) {
      toast.error(`Error deleting sub category: ${error.message}`);
      throw error;
    }
  }
);

const subcategorySlice = createSlice({
  name: "subcategories",
  initialState: {
    list: [],
    current: null,
    loading: false,
    error: null,
    //  homeCategories: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //create  subcategory
      .addCase(createSubcategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSubcategory.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(action.payload);
      })
      .addCase(createSubcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch subCategories
      .addCase(fetchSubcategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubcategories.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchSubcategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //   // Fetch Home Categories
      //   .addCase(fetchHomeCategories.pending, (state) => {
      //     state.loading = true;
      //     state.error = null;
      //   })
      //   .addCase(fetchHomeCategories.fulfilled, (state, action) => {
      //     state.loading = false;
      //     state.homeCategories = action.payload;
      //   })
      //   .addCase(fetchHomeCategories.rejected, (state, action) => {
      //     state.loading = false;
      //     state.error = action.error.message;
      //   })

      // Update subCategory
      .addCase(updateSubcategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSubcategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex((c) => c._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateSubcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete SUB Category
      .addCase(deleteSubcategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSubcategory.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((c) => c._id !== action.payload);
      })
      .addCase(deleteSubcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch Single sub Category
      .addCase(fetchSubcategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchSubcategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload; // ✅ FIX

        const index = state.list.findIndex((c) => c._id === action.payload._id);

        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      .addCase(fetchSubcategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default subcategorySlice.reducer;