import { createAsyncThunk } from "@reduxjs/toolkit";
import { commonReduxRequest } from "@common/api";
import { appJson } from "@common/configurations";

export const createFest = createAsyncThunk(
  "fest/createFest",
  async (formData, { rejectWithValue }) => {
    return commonReduxRequest(
      "post",
      `/user/fest`,
      formData,
      appJson,
      rejectWithValue
    );
  }
);

export const getFests = createAsyncThunk(
  "fest/getFests",
  async (_, { rejectWithValue }) => {
    return commonReduxRequest(
      "get",
      `/user/fests`,
      null,
      appJson,
      rejectWithValue
    );
  }
);

export const updateFest = createAsyncThunk(
  "fest/updateFest",
  async ({ id, formData }, { rejectWithValue }) => {
    return commonReduxRequest(
      "patch",
      `/user/fest/${id}`,
      formData,
      appJson,
      rejectWithValue
    );
  }
);
