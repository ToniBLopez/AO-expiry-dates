import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  products: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState, // Defines the initial state of the slice
  reducers: { // Is an object that defines the reducer functions that will be used to update the state of the slice.
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
    },
    setLogin: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    setLogout: (state) => {
      state.user = null
      state.token = null
    },
    setProducts: (state) => {
      state.products = action.payload.products
    },
  }
})

export const {
  setMode,
  setLogin,
  setLogout,
  setProducts
} = authSlice.actions;
export default authSlice.reducer;