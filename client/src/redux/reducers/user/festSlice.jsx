import { createSlice } from "@reduxjs/toolkit";
import {
  getFests,
  createFest,
  updateFest,
} from "../../actions/user/festActions";
import toast from "react-hot-toast";

const festSlice = createSlice({
  name: "fests",
  initialState: {
    loading: false,
    fests: [],
    error: null,
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
      })
      .addCase(getFests.rejected, (state, { payload }) => {
        state.loading = false;
        state.fests = null;
        state.error = payload;
      })
      // Fest creation
      .addCase(createFest.pending, (state) => {
        state.loading = true;
      })
      .addCase(createFest.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.fests = [...state.fests, payload.fest];
        toast.success("Fest Added");
      })
      .addCase(createFest.rejected, (state, { payload }) => {
        state.loading = false;
        state.fests = null;
        state.error = payload;
      })

      .addCase(updateFest.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateFest.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        const index = state.fests.findIndex(
          (item) => item._id === payload.fest._id
        );

        if (index !== -1) {
          state.fests[index] = payload.fest;
        }
      })
      .addCase(updateFest.rejected, (state, { payload }) => {
        state.loading = false;
        state.fests = null;
        state.error = payload;
      });
  },
});

export default festSlice.reducer;
