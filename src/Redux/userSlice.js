import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

const initialState = {
    statusLogin : 'idle',
    statusUpdate : 'idle',
    user : {},
    errorUser : '',
    token : ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIdleUser: (state) => {
            state.statusLogin = "idle"
            state.statusUpdate = "idle"
        },
    },
    extraReducers: builder => {
        builder
        .addCase(loginUser.pending, (state) => {
            state.statusLogin = 'loading'
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.statusLogin = 'succeeded'
            state.token = action.payload.token
            state.user = action.payload.user
            return state
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.statusLogin = 'failed'
            if(action.error?.message) state.errorUser = action.error.message
        })
        .addCase(updateUser.pending, (state) => {
            state.statusUpdate = 'loading'
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            state.statusUpdate = 'succeeded'
        })
        .addCase(updateUser.rejected, (state, action) => {
            state.statusUpdate = 'failed'
            if(action.error?.message) state.errorUser = action.error.message
        })
    }
})

export const { setIdleUser } = userSlice.actions

export const loginUser = createAsyncThunk('loginUser', async (data) => {
    try{
        const response = await axios.post('https://fakestoreapi.com/auth/login', 
        {
            username: data.username,
            password: data.password
        })
        if (response.data.token) {
            localStorage.setItem("token",  response.data.token)
        }
        const responseUser = await axios.get('https://fakestoreapi.com/users')
        const dataUser = responseUser.data
        const filter = dataUser.filter(x => x.username === data.username && x.password === data.password)
        localStorage.setItem("user", JSON.stringify(filter[0]))
        return {
            token : response.data.token,
            user : filter[0]
        }
    }
    catch(err){
        throw err
    }
})

export const updateUser = createAsyncThunk('updateUser', async (data) => {
    try{
        const response = await axios(`https://fakestoreapi.com/users/${data.id}`, {
            method:"PUT",
            body:JSON.stringify({
                    email: data.email,
                    username: data.username,
                    password: data.password,
                    name:{
                        firstname: data.firstname,
                        lastname: data.lastname
                    },
                    address:{
                        city: data.city,
                        street: data.street,
                        number: data.number,
                        zipcode: data.zipcode,
                        geolocation:{
                            lat: data.lat,
                            long: data.long
                        }
                    },
                    phone: data.phone
            })
        })
        return response
    }
    catch(err){
        throw err
    }
})

export default userSlice.reducer
