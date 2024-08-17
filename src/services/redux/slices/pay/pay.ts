/* eslint-disable @typescript-eslint/no-unused-vars */
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPayData, IResponse } from "../../../../types/Pay.types";
import { fetchPay } from "./payAPI";

export const payApi = createAsyncThunk(
  "@@pay/register",
  async (data: IPayData, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await fetchPay(data);
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const text = await response.text();
      const json = JSON.parse(text);
      return fulfillWithValue(json);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An error occurred");
      }
    }
  }
);

export interface IPayState {
  status: "idle" | "success" | "loading" | "failed";
  error: unknown;
  response: IResponse;
}

const initialState: IPayState = {
  status: "idle",
  error: null,
  response: {
    orderId: "",
    formUrl: "",
    errorCode: "",
    errorMessage: "",
  },
};

const paySlice = createSlice({
  name: "@@pay",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(payApi.fulfilled, (state, action) => {
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

export const payReducer = paySlice.reducer;

// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { IPayData, IResponse } from "../../../../types/Pay.types";
// import { fetchPay } from "./payApi";

// export const payApi = createAsyncThunk(
//   "@@pay/register",
//   async (data: IPayData, { fulfillWithValue, rejectWithValue }) => {
//     try {
//       const response = await fetchPay(data);
//       console.log(response, 'response')
//       const json = await response.json();
//       console.log(json, 'json')
//       return fulfillWithValue(json);
//     } catch (error: unknown) {
//       return rejectWithValue(error);
//     }
//   }
// );

// export interface IPayState {
//   status: "idle" | "success" | "loading" | "failed";
//   error: unknown;
//   response: IResponse;
// }

// const initialState: IPayState = {
//   status: "idle",
//   error: null,
//   response: {
//     orderId: "",
//     formUrl: "",
//     mdOrder: "",
//   },
// };

// const paySlice = createSlice({
//   name: "@@pay",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(payApi.fulfilled, (state, action) => {
//         state.status = "success";
//         // state.response.formUrl = action.payload.formUrl;
//         state.response = action.payload;
//       })
//       .addMatcher(
//         (action) => action.type.endsWith("/rejected"),
//         (state, action) => {
//           state.status = "failed";
//           state.error = action.payload.statusText;
//         }
//       );
//   },
// });

// export const payReducer = paySlice.reducer;
