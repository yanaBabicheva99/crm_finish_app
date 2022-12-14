import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import {IUser} from '../types/User'

export interface ISignIn {
    accessToken: string;
    refreshToken: string;
    userId: string
}

export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/auth/',
    }),
    endpoints: (build) => ({
        signUp: build.mutation<IUser, Omit<IUser, '_id' | '__v' | 'address'>>({
            query: (content) => ({
                url: 'register',
                method: 'POST',
                body: content,
            })
        }),
        signIn: build.mutation<ISignIn, Pick<IUser, 'email' | 'password'>>({
            query: (content) => ({
                url: 'login',
                method: 'POST',
                body: content,
                credentials: 'include',
                // mode: 'cors'
            })
        }),
        logout: build.mutation<string, void>({
            query: () => ({
                url: 'logout',
                method: 'POST',
                credentials: 'include',
            }),
        }),
    }),
});

export const { useSignUpMutation, useSignInMutation, useLogoutMutation } = authAPI;
