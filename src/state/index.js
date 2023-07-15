import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: 'light',
  page: 'home',
  products: null,
  newProduct: false,
  productsHaveDone: {
    lastUpdatedId: ''
  },
  messageAlert: {
    type: '',
    message: '',
  },
  store: {
    storeId: '',
    number: null,
  },
  token: null,
}

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
    setNewProduct: (state) => {
      state.newProduct = !state.newProduct
    },
    setProductsHaveDone: (state, action) => {
      state.productsHaveDone = action.payload.productsHaveDone
    },
    setMessageAlert: (state, action) => {
      state.messageAlert.type = action.payload.type
      state.messageAlert.message = action.payload.message
    },
    setStore: (state, action) => {
      state.store = {
        storeId: action.payload.storeId,
        number: action.payload.number,
      }
      state.token = action.payload.token
    },
    setLogout: (state) => {
      state.store = {
        storeId: '',
        number: null,
      }
      state.token = null
    },
  }
})

export const {
  setMode,
  setPage,
  setProducts,
  setNewProduct,
  setProductsHaveDone,
  setMessageAlert,
  setStore,
  setLogout,
} = authSlice.actions
export default authSlice.reducer
