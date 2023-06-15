import { createSlice } from '@reduxjs/toolkit';

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    list: [],
    selectedProducts: [],
    loadingState: 'initial'
  },
  reducers: {
    loadProducts: (state, value) => {
        state.list = value.payload;
    },
    loadShoppingProducts: (state, value) => {
        state.selectedProducts = value.payload;
    },
    setLoadingState: (state, value) => {
      state.loadingState = value.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { loadProducts, loadShoppingProducts, setLoadingState } = productsSlice.actions  

export default productsSlice.reducer