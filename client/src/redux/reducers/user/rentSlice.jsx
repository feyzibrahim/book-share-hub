import { createSlice } from "@reduxjs/toolkit";

const rentSlice = createSlice({
  name: "rent",
  initialState: {
    loading: false,
    product: null,
    numberOfDays: null,
    error: null,
  },
  reducers: {
    addToRentStore: (state, { payload }) => {
      console.log("file: rentSlice.jsx:13 -> payload", payload);
      state.product = payload.product;
      state.numberOfDays = payload.count;
    },
    emptyRentStore: (state) => {
      state.product = null;
      state.numberOfDays = null;
    },
  },
});

export const { addToRentStore, emptyRentStore } = rentSlice.actions;
export default rentSlice.reducer;
