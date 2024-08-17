import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProductbyid } from "./productbyidAPI";
import { IProductbyIdState } from "../../../../types/Product.types";

export const getProductbyidApi = createAsyncThunk(
  "@@productbyid/get",
  async (productId: number, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await getProductbyid(productId);
      const json = await response;
      return fulfillWithValue(json);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

const initialState: IProductbyIdState = {
  status: "idle",
  error: "",
  product: {
    id: 0,
    title: "",
    description: "",
    price: "",
    weight: "",
    h_picture: "",
    v_picture: "",
    acidity: 0,
    density: 0,
    big_description: "",
    low_price: "",
    low_weight: "",
    country: "",
    additional_pictures: [],
  },
};

export const productbyidSlice = createSlice({
  name: "@@productbyid",
  initialState,
  reducers: {
    resetProductbyid: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductbyidApi.fulfilled, (state, action) => {
        state.status = "success";
        state.product = action.payload;
      })
      .addCase(getProductbyidApi.pending, (state) => {
				state.status = 'loading';
			})
      // .addMatcher(
      //   (action) => action.type.endsWith("/rejected"),
      //   (state, action) => {
      //     state.status = "failed";
      //     state.error = action.payload.statusText;
      //   }
      // );
  },
});

export const { resetProductbyid } = productbyidSlice.actions;

export const productbyidReducer = productbyidSlice.reducer;
