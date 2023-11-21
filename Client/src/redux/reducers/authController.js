import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null
}

export const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        setToken: (state, payload) => {
            state.token = localStorage.getItem('jwtToken') || null;
        },
        removeToken: (state)=>{
            localStorage.removeItem('jwtToken');
            state.token = null;
        }
    }
})

export const { setToken, removeToken } = authSlice.actions;

export default authSlice.reducer