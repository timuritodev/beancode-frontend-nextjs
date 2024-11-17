import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMachines } from "./machineAPI";
import { IMachineState } from "@/types/Machine.types";

export const getMachinesApi = createAsyncThunk(
  "@@machine/get",
  async (__, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await getMachines();
      return fulfillWithValue(response);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

const initialState: IMachineState = {
  status: "idle",
  error: "",
  products: [
    {
      id: 0,
      title: "",
      description: "",
      price: "",
      h_picture: "",
      v_picture: "",
      big_description: "",
    },
  ],
};

export const machineSlice = createSlice({
  name: "@@machine",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMachinesApi.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload;
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

export const machineReducer = machineSlice.reducer;
