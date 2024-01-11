import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: undefined,
    password: undefined,
    role: undefined
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            state.user = action.payload.user;
            state.password = action.payload.password;
            state.role = action.payload.role;
        },
        userLoggedOut: (state) => {
            state.user = undefined;
            state.password = undefined;
            state.role = undefined;
        }
    }
});

export const {userLoggedIn, userLoggedOut} = authSlice.actions;
export default authSlice.reducer;