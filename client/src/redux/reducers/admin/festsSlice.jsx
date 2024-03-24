import { createSlice } from "@reduxjs/toolkit";
import {
  getFests,
  createFest,
  editFest,
} from "../../actions/admin/festsAction";

const festsSlice = createSlice({
  name: "fests",
  initialState: {
    loading: false,
    fests: [],
    error: null,
    totalAvailableFests: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFests.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFests.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.fests = payload.fests;
        state.totalAvailableFests = payload.totalAvailableFests;
      })
      .addCase(getFests.rejected, (state, { payload }) => {
        state.loading = false;
        state.fests = null;
        state.error = payload;
      })

      .addCase(createFest.pending, (state) => {
        state.loading = true;
      })
      .addCase(createFest.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.fests = [...state.fests, payload];
        state.totalAvailableFests = payload.totalAvailableFests;
      })
      .addCase(createFest.rejected, (state, { payload }) => {
        state.loading = false;
        state.fests = null;
        state.error = payload;
      })

      .addCase(editFest.pending, (state) => {
        state.loading = true;
      })
      .addCase(editFest.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        const index = state.fests.findIndex((item) => item._id === payload._id);

        if (index !== -1) {
          state.fests[index] = payload;
        }
      })
      .addCase(editFest.rejected, (state, { payload }) => {
        state.loading = false;
        state.fests = null;
        state.error = payload;
      });
  },
});

export default festsSlice.reducer;
