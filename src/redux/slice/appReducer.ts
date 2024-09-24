import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AppStateType, LprSessionData } from "../../types";
import { blobToBase64 } from "../../utils";
import request from "../../utils/request";

export const fetchViolation = createAsyncThunk<LprSessionData[], string>(
  "fetchViolation",
  async (notice) => {
    const { data } = await request({
      method: "GET",
      url: `/violation/${notice}`,
    });
    return data;
  }
);

export const fetchViolations = createAsyncThunk<LprSessionData[], string>(
  "fetchViolations",
  async (plate) => {
    const { data } = await request({
      method: "GET",
      url: `/violations/${plate}`,
    });
    return data;
  }
);

export const fetchTemplePdfFile = createAsyncThunk<string, void>(
  "fetchTemplePdfFile",
  async () => {
    try {
      const { data } = await request({
        method: "GET",
        url: `/getTemplePdfFile`,
        responseType: "blob", // Ensuring the response is treated as a Blob
      });
      const base64 = await blobToBase64(data);
      return base64;
    } catch (error) {
      console.error("Failed to fetch PDF file:", error);
      throw error; // Rethrow the error to handle it in the extraReducers
    }
  }
);

export const getClientSecret = createAsyncThunk<string, number>(
  "clientSecret",
  async (amount) => {
    try {
      const { data } = await request({
        method: "POST",
        url: "/create-payment-intent",
        data: { amount },
      });
      return data.clientSecret;
    } catch (error) {
      console.error("Failed to fetch clientSecret:", error);
      throw error; // Rethrow the error to handle it in the extraReducers
    }
  }
);

interface PayForParkingRes {
  success: boolean;
}

interface PayForParkingParams {
  ids: string[];
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
}

export const payForParking = createAsyncThunk<
  PayForParkingRes,
  PayForParkingParams
>("payforparking", async (info) => {
  try {
    console.log(info);

    const { data } = await request({
      method: "POST",
      url: "/pay-for-parking",
      data: info,
    });
    return data;
  } catch (error) {
    return { success: false }; // Return an object with an empty clientSecret in case of an error
  }
});

const initialState: AppStateType = {
  violations: [],
  notice: "",
  plate: "",
  state: "",
  pdf: "",
  clientSecret: "",
};

const appReducer = createSlice({
  name: "app",
  initialState,
  reducers: {
    setNotice: (state, action: PayloadAction<string>) => {
      state.notice = action.payload;
    },
    setPlate: (state, action: PayloadAction<string>) => {
      state.plate = action.payload;
    },
    setState: (state, action: PayloadAction<string>) => {
      state.state = action.payload;
    },
    setPdf: (state, action: PayloadAction<Blob>) => {
      // Convert Blob to Base64 and store in state
      blobToBase64(action.payload).then((base64) => {
        state.pdf = base64;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchViolation.fulfilled, (state, action) => {
      state.violations = action.payload;
    });
    builder.addCase(fetchViolation.rejected, (state, action) => {
      state.violations = [];
      console.error("Failed to fetch violations:", action.error);
    });
    builder.addCase(fetchViolations.fulfilled, (state, action) => {
      state.violations = action.payload;
    });
    builder.addCase(fetchViolations.rejected, (state, action) => {
      state.violations = [];
      console.error("Failed to fetch violations:", action.error);
    });
    builder.addCase(fetchTemplePdfFile.fulfilled, (state, action) => {
      state.pdf = action.payload; // Update state with the Base64 string
    });
    builder.addCase(fetchTemplePdfFile.rejected, (state, action) => {
      state.pdf = "";
      console.error("Failed to fetch PDF file:", action.error);
    });
    builder.addCase(getClientSecret.fulfilled, (state, action) => {
      state.clientSecret = action.payload; // Update state with the Base64 string
    });
    builder.addCase(getClientSecret.rejected, (state, action) => {
      state.clientSecret = "";
      console.error("Failed to fetch clientSecret:", action.error);
    });
  },
});

export const { setNotice, setPlate, setState } = appReducer.actions;

export default appReducer.reducer;
