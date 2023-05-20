import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  changeProducts: 2
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
   
    setProducts: (state, action) => {
      state.products = action.payload
    },
    setChangeProducts: (state, action) => {
      state.changeProducts = action.payload
    },

  },
})

// Action creators are generated for each case reducer function
export const { setProducts, setChangeProducts } = productsSlice.actions

export default productsSlice.reducer