import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isNavOpen: true
}

export const navController = createSlice({
    name: "navController",
    initialState,
    reducers: {
        ctrlNav: (state) => {
            if(window.innerWidth > 768){
                state.isNavOpen = !state.isNavOpen 
            }
        }
    }
})

export const { ctrlNav } = navController.actions;

export default navController.reducer