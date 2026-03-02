import { createSlice } from "@reduxjs/toolkit";

interface User {
    username: string | null;
    userId?: string;
}

export interface UserState {
    user?: User;
}

const initialState: UserState = {
    user: undefined,
};


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser: (state, action) => {
            state.user = action.payload;
        },
        clearState: () => initialState
    },

});

export const { updateUser, clearState} = userSlice.actions;
export default userSlice.reducer;
