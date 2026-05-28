import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const fetchAuthorItemById = createAsyncThunk(
  "authorItems/fetchAuthorItemById",
  async (id) => {
    try {
      const response = await fetch(`${process.env.API}/author/item/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch items:`);
      }

      return await response.json();
    } catch (error) {
      toast.error(`Error loading Items: ${error.message}`);
      throw error;
    }
  }
);

export const fetchAuthorItems = createAsyncThunk(
  "authorItems/fetchAuthorItems",
  async () => {
    try {
      const response = await fetch(`${process.env.API}/author/item`);
      if (!response.ok) {
        throw new Error(`Failed to fetch items`);
      }
      return await response.json();
    } catch (error) {
      toast.error(`Error loading items: ${error.message}`);
      throw error;
    }
  }
);

export const fetchHomeItems = createAsyncThunk(
  "authorItems/fetchHomeItems",
  async () => {
    try {
      const response = await fetch(`${process.env.API}/item`);
      if (!response.ok) {
        throw new Error(`Failed to fetch items`);
      }
      return await response.json();
    } catch (error) {
      toast.error(`Error loading items: ${error.message}`);
      throw error;
    }
  }
);

export const createAuthorItem = createAsyncThunk(
  "authorItems/createAuthorItem",
  async (itemData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${process.env.API}/author/item`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      toast.success("Item created successfully");
      return data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const updateAuthorItem = createAsyncThunk(
  "authorItems/updateAuthorItem",
  async ({ id, itemData }) => {
    try {
      const response = await fetch(`${process.env.API}/author/item/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemData),
      });
      if (!response.ok) {
        throw new Error(`Failed to update items: ${response.status}`);
      }
      const data = await response.json();
      toast.success("item updated successfully!");
      return data;
    } catch (error) {
      toast.error(`Error updating item: ${error.message}`);
      throw error;
    }
  }
);

export const deleteAuthorItem = createAsyncThunk(
  "authorItems/deleteAuthorItem",
  async (id) => {
    try {
      const response = await fetch(`${process.env.API}/author/item/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Failed to delete items: ${response.status}`);
      }
      toast.success("items deleted successfully!");
      return id;
    } catch (error) {
      toast.error(`Error deleting item: ${error.message}`);
      throw error;
    }
  }
);

const authorItemSlice = createSlice({
  name: "authorItems",
  initialState: {
    list: [],
    current: null,
    loading: false,
    error: null,
    homeItems: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(createAuthorItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAuthorItem.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(action.payload);
      })
      .addCase(createAuthorItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch author Items
      .addCase(fetchAuthorItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAuthorItems.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAuthorItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch Home Items
      .addCase(fetchHomeItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomeItems.fulfilled, (state, action) => {
        state.loading = false;
        state.homeItems = action.payload;
      })
      .addCase(fetchHomeItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update items
      .addCase(updateAuthorItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAuthorItem.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex((c) => c._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateAuthorItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete Items
      .addCase(deleteAuthorItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAuthorItem.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((c) => c._id !== action.payload);
      })
      .addCase(deleteAuthorItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch Single item
      .addCase(fetchAuthorItemById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAuthorItemById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload; // ✅ FIX

        const index = state.list.findIndex((c) => c._id === action.payload._id);

        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      .addCase(fetchAuthorItemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default authorItemSlice.reducer;
