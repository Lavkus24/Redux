// store.js

import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../Slice/userSlice';
import cartSlice from '../Slice/cartSlice';

const  store = configureStore({
    reducer : {
        cart : cartSlice,
        form : userSlice,
    }
});

export default store


