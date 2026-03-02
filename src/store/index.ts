import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user";



const rootReducer = {
    userSlice,
};

const store = configureStore({
    reducer: rootReducer
});



export default store;
