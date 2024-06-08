import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    name: '',
    email: '',
    password: '',  // Corrected the property name
}

export const formSlice = createSlice({
    name: 'form',   
    initialState,
    reducers: {
        setData: (state, action) => {
        //    console.log(' action.payload user', action.payload)
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.password = action.payload.password;  // Corrected the property name
        }
    }
});

export const { setData } = formSlice.actions;
export default formSlice.reducer;
