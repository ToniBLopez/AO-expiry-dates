import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: 'light',
  page: '',
  products: [],
  // user: null,
  // token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState, // Defines the initial state of the slice
  reducers: { // Is an object that defines the reducer functions that will be used to update the state of the slice.
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
    },
    setPage: (state, action) => {
      state.page = action.payload.page
    },
    setProducts: (state, action) => {
      state.products = action.payload.products
    },
    // setLogin: (state, action) => {
    //   state.user = action.payload.user
    //   state.token = action.payload.token
    // },
    // setLogout: (state) => {
    //   state.user = null
    //   state.token = null
    // },
  }
})

export const {
  setMode,
  setPage,
  setProducts,
  // setLogin,
  // setLogout,
} = authSlice.actions;
export default authSlice.reducer;