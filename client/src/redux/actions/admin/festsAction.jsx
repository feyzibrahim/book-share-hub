import { createAsyncThunk } from "@reduxjs/toolkit";
import { commonReduxRequest } from "@common/api";
import { appJson } from "@common/configurations";

// Function to Create new Fest
export const createFest = createAsyncThunk(
  "fests/createFest",
  async (formData, { rejectWithValue }) => {
    return commonReduxRequest(
      "post",
      `/admin/fest`,
      formData,
      appJson,
      rejectWithValue
    );
  }
);

// Editing the existing fest
export const editFest = createAsyncThunk(
  "fests/editFest",
  async ({ id, formData }, { rejectWithValue }) => {
    return commonReduxRequest(
      "patch",
      `/admin/fest/${id}`,
      formData,
      appJson,
      rejectWithValue
    );
  }
);

export const getFests = createAsyncThunk(
  "fests/getFests",
  async (queries, { rejectWithValue }) => {
    return commonReduxRequest(
      "get",
      `/admin/fests${queries && `?${queries}`}`,
      null,
      appJson,
      rejectWithValue
    );
  }
);
