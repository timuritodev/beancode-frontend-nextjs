/* eslint-disable @typescript-eslint/no-unused-vars */
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  IOrderStatus,
  IOrderStatusResponse,
} from "../../../../types/OrderStatus.types";
import { fetchGetStatus } from "./orderStatusAPI";

export const getStatusApi = createAsyncThunk(
  "@@orderStatus/get",
  async (data: IOrderStatus, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await fetchGetStatus(data);
      const json = await response.json();
      return fulfillWithValue(json);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export interface IOrderStatusState {
  status: "idle" | "success" | "loading" | "failed";
  error: unknown;
  response: IOrderStatusResponse;
}

const initialState: IOrderStatusState = {
  status: "idle",
  error: null,
  response: {
    expiration: 0,
    cardholderName: "",
    depositAmount: 0,
    currency: 0,
    approvalCode: 0,
    authCode: 0,
    clientId: 0,
    bindingId: "",
    ErrorCode: 0,
    ErrorMessage: "",
    OrderStatus: 0,
    OrderNumber: "",
    Pan: "",
    Amount: 0,
  },
};

const orderStatusSlice = createSlice({
  name: "@@orderStatus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStatusApi.fulfilled, (state, action) => {
        state.status = "success";
        state.response = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.payload.statusText;
        }
      );
  },
});

export const orderStatusReducer = orderStatusSlice.reducer;
