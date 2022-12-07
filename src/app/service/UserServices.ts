import { createApi } from '@reduxjs/toolkit/dist/query/react';
import {IUser} from '../types/User';
import customFetchBase from "./middleware/Interceptor";

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: customFetchBase,
  tagTypes: ['User'],
  endpoints: (build) => ({
    getUser: build.query<IUser, string>({
      query: (id: string) => ({
        url: `auth/get`,
      }),
      providesTags: (result) => ['User'],
    }),
    updateUserInfo: build.mutation<IUser, object>({
      query: (data: {id: string, content: Omit<IUser, '_id' | '__v' | 'password'>}) => ({
        url: `auth/update`,
        method: 'PATCH',
        body: data.content
      }),
      invalidatesTags: ['User']
    }),
    changeUserInfo: build.mutation<IUser, object>({
      query: (data: {id: string, content: Omit<IUser, '_id' | '__v' >}) => ({
        url: `auth/change`,
        method: 'PUT',
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
} = userAPI;