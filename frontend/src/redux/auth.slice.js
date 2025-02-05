import { createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        auth: JSON.parse(localStorage.getItem('auth')) || false,
        isLoggedIn: localStorage.getItem('auth') ? true : false,
    },

    reducers: {
        login: (state) => {
            state.auth = true;
            state.isLoggedIn =true;
        },

        logout: (state, actions) => {
            localStorage.clear()
            state.auth = false,
                state.isLoggedIn = false;
        },
        setAuth: (state, action) => {
            state.auth = action.payload
        }
        
    }
})

export const { login,logout,setAuth } = authSlice.actions;
export default authSlice.reducer