import { createAsyncThunk } from "@reduxjs/toolkit";
import { commonReduxRequest } from "@common/api";
import { appJson, multiForm } from "@common/configurations";

// Function to Create new Customer
export const createNewCustomer = createAsyncThunk(
  "customers/createNewCustomer",
  async (formData, { rejectWithValue }) => {
    return commonReduxRequest(
      "post",
      `/admin/customer`,
      formData,
      multiForm,
      rejectWithValue
    );
  }
);

export const getCustomers = createAsyncThunk(
  "customers/getCustomers",
  async (queries, { rejectWithValue }) => {
    return commonReduxRequest(
      "get",
      `/admin/customers${queries && `?${queries}`}`,
      null,
      appJson,
      rejectWithValue
    );
  }
);
export const getRenters = createAsyncThunk(
  "customers/getRenters",
  async (queries, { rejectWithValue }) => {
    return commonReduxRequest(
      "get",
      `/admin/renters${queries && `?${queries}`}`,
      null,
      appJson,
      rejectWithValue
    );
  }
);
export const getPublishers = createAsyncThunk(
  "customers/getPublishers",
  async (queries, { rejectWithValue }) => {
    return commonReduxRequest(
      "get",
      `/admin/publishers${queries && `?${queries}`}`,
      null,
      appJson,
      rejectWithValue
    );
  }
);
export const getSellers = createAsyncThunk(
  "customers/getSellers",
  async (queries, { rejectWithValue }) => {
    return commonReduxRequest(
      "get",
      `/admin/sellers${queries && `?${queries}`}`,
      null,
      appJson,
      rejectWithValue
    );
  }
);

export const blockOrUnBlock = createAsyncThunk(
  "customers/blockOrUnBlock",
  async ({ id, isActive }, { rejectWithValue }) => {
    return commonReduxRequest(
      "patch",
      `/admin/customer-block-unblock/${id}`,
      { isActive },
      appJson,
      rejectWithValue
    );
  }
);
