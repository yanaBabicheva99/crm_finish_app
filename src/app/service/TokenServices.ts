import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { DispatchType, InitStateToken, StateType } from '../types/index';
import { ISignIn } from "./AuthService";

const initialState: InitStateToken = {
    tokenValue: localStorage.getItem("token") || null,
    userId: localStorage.getItem("userId") || null,
};

const authSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        created(state, action: PayloadAction<ISignIn>) {
            if (!state.userId) {
                localStorage.setItem('token', action.payload.accessToken);
                localStorage.setItem('userId', action.payload.userId);

                state.tokenValue = action.payload.accessToken;
                state.userId = action.payload.userId;
            } else {
                localStorage.setItem('token', action.payload.accessToken);
                state.tokenValue = action.payload.accessToken;
            }
        },
        removed(state) {
            localStorage.removeItem('token');
            state.tokenValue = null;
        }
    }
})

const { actions, reducer: tokenReducer } = authSlice;
const { created, removed } = actions;

export const createToken = (data: ISignIn) => (dispatch: DispatchType) => {
    dispatch(created(data));
}
export const removeToken = () => (dispatch: DispatchType) => {
    dispatch(removed());
}

export const getToken = () => (state: StateType) => state.token.tokenValue;
export const getUserId = () => (state: StateType) => state.token.userId;
export default tokenReducer;