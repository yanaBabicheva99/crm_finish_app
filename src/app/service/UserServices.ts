import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import {IUser} from '../types/User';

interface ISignIn {
  token: string;
  userId: string
}

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/auth/'
  }),
  tagTypes: ['User'],
  endpoints: (build) => ({
    signUp: build.mutation<IUser, Omit<IUser, '_id' | '__v' | 'address'>>({
     query: (content) => ({
       url: 'register',
       method: 'POST',
       body: content
     })
    }),
    signIn: build.mutation<ISignIn, Pick<IUser, 'email' | 'password'>>({
      query: (content) => ({
        url: 'login',
        method: 'POST',
        body: content
      })
    }),
    getUser: build.query<IUser, string>({
      query: (id: string) => ({
        url: `get/${id}`,
        headers: {
          'authorization': JSON.parse(localStorage.getItem('userData') || '').token,
          'content-type': 'text/plain',
        },
      }),
      providesTags: (result) => ['User'],
    }),
    updateUserInfo: build.mutation<IUser, object>({
      query: (data: {id: string, content: Omit<IUser, '_id' | '__v' | 'password'>}) => ({
        url: `update/${data.id}`,
        method: 'PATCH',
        headers: {
          'authorization': JSON.parse(localStorage.getItem('userData') || '').token,
        },
        body: data.content
      }),
      invalidatesTags: ['User']
    }),
    changeUserInfo: build.mutation<IUser, object>({
      query: (data: {id: string, content: Omit<IUser, '_id' | '__v' >}) => ({
        url: `change/${data.id}`,
        method: 'PUT',
        headers: {
          'authorization': JSON.parse(localStorage.getItem('userData') || '').token,
        },
        body: data.content
      }),
      invalidatesTags: ['User']
    }),
  })
})
export const {
  useGetUserQuery,
  useUpdateUserInfoMutation,
  useChangeUserInfoMutation,
  useSignInMutation,
  useSignUpMutation
} = userAPI;