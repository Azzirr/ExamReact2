import { createSlice } from '@reduxjs/toolkit';

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    list: [],
    listContainer: [],
    selectedProducts: [],
    loadingState: 'initial',
    loadingStateMainProducts: 'initial',
    detailsSelectedProduct: []
  },
  reducers: {
    loadProducts: (state, value) => {
        state.list = value.payload;
        state.listContainer = value.payload;
    },
    loadShoppingProducts: (state, value) => {
        state.selectedProducts = value.payload;
    },
    setLoadingState: (state, value) => {
      state.loadingState = value.payload
    },
    setLoadingStateMainProducts: (state, value) => {
      state.loadingStateMainProducts = value.payload
    },
    filterProducts: (state, value) => {
      state.list = state.listContainer.filter(product => product.name.toLowerCase().includes(value.payload))
    },
    filterByIsFood: (state, value) => {
      state.list = state.listContainer.filter(product => product.isFood === true)
    },
    setDetailsSelectedProduct: (state, value) => {
      state.detailsSelectedProduct = value.payload;
    }
  }
})

// Action creators are generated for each case reducer function
export const { loadProducts, loadShoppingProducts, setLoadingState, setLoadingStateMainProducts, filterProducts, setDetailsSelectedProduct, filterByIsFood, setIsFoodState } = productsSlice.actions  

export default productsSlice.reducer