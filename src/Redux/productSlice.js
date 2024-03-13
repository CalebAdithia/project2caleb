import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit"
import axios from "axios"

const productAdapter = createEntityAdapter()

const initialState = productAdapter.getInitialState({
  status: "idle",
  statusAdd: "idle",
  statusDelete: "idle",
  statusUpdate: "idle",
  statusSingle : "idle",
  error: "",
})

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setIdle: (state) => {
      state.status = "idle"
      state.statusAdd = "idle"
      state.statusDelete = "idle"
      state.statusUpdate = "idle"
      state.statusSingle = 'idle'
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded"
        productAdapter.setAll(state, action.payload)
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed"
        if (action.error?.message) state.error = action.error.message
      })

      .addCase(addProducts.pending, (state) => {
        state.statusAdd = "loading"
      })
      .addCase(addProducts.fulfilled, (state, action) => {
        state.statusAdd = "succeeded"
        // productAdapter.upsertOne(state, action.payload)
      })
      .addCase(addProducts.rejected, (state, action) => {
        state.statusAdd = "failed"
        if (action.error?.message) state.error = action.error.message
      })

      .addCase(deleteProducts.pending, (state) => {
        state.statusDelete = "loading"
      })
      .addCase(deleteProducts.fulfilled, (state, action) => {
        state.statusDelete = "succeeded"
        // productAdapter.removeOne(state, action.payload)
      })
      .addCase(deleteProducts.rejected, (state, action) => {
        state.statusDelete = "failed"
        if (action.error?.message) state.error = action.error.message
      })
      
      .addCase(updateProducts.pending, (state) => {
        state.statusUpdate = "loading"
      })
      .addCase(updateProducts.fulfilled, (state, action) => {
        state.statusUpdate = "succeeded"
        // productAdapter.upsertOne(state, action.payload)
      })
      .addCase(updateProducts.rejected, (state, action) => {
        state.statusUpdate = "failed"
        if (action.error?.message) state.error = action.error.message
      })
      
      .addCase(fetchSingleProducts.pending, (state) => {
        state.statusSingle = "loading"
      })
      .addCase(fetchSingleProducts.fulfilled, (state, action) => {
        state.statusSingle = "succeeded"
      })
      .addCase(fetchSingleProducts.rejected, (state, action) => {
        state.statusSingle = "failed"
        if (action.error?.message) state.error = action.error.message
      })
      
  },
})

export const { setIdle } = productSlice.actions

export const { selectAll: selectAllProducts, selectById: selectProductById, selectIds: selectProductIds } = productAdapter.getSelectors((state) => state.products)

export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products")
    const sorted = response.data.sort((a, b) => a.title.localeCompare(b.title))
    return sorted
  } catch (err) {
    throw err
  }
})

export const addProducts = createAsyncThunk("addProducts", async (data) => {
  const newdata = {
    ...data,
    image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
  }
  try {
    const response = await axios("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify({
        title: newdata.title,
        price: newdata.price,
        description: newdata.desc,
        image: newdata.image,
        category: newdata.category,
      }),
    })
    if (response.ok) return newdata
  } catch (err) {
    throw err
  }
})

export const deleteProducts = createAsyncThunk("deleteProducts", async (data) => {
  try {
    const response = await axios.delete(`https://fakestoreapi.com/products/${data}`)
    return response
  } catch (err) {
    throw err
  }
})

export const updateProducts = createAsyncThunk("updateProducts", async (data) => {
  try {
    const response = await axios(`https://fakestoreapi.com/products/${data.id}`,{
      method:"PUT",
      body:JSON.stringify(
          {
              title: data.title,
              price: data.price,
              description: data.desc,
              image: data.image,
              category: data.category
          }
      )
    })
    return response
  } catch (err) {
    console.log('error')
    throw err
  }
})

export const fetchSingleProducts = createAsyncThunk("fetchSingleProducts", async (data) => {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/${data}`)
    return response
  } catch (err) {
    throw err
  }
})

export const fetchCateProducts = createAsyncThunk("fetchCateProducts", async () => {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/categories`)
    return response
  } catch (err) {
    throw err
  }
})

export default productSlice.reducer
