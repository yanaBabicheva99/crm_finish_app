import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {IProduct} from "../types/Product";


export const productsAPI = createApi({
  reducerPath: 'productsAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/'
  }),
  tagTypes: ['Product'],
  endpoints: (build) => ({
    getProduct: build.query<IProduct, string>({
      query: (id: string) => ({
        url: `products/get/${id}`,
        headers: {
          'authorization': JSON.parse(localStorage.getItem('userData') || '').token,
          'content-type': 'text/plain',
        }
      }),
      providesTags: (result) => ['Product'],
    }),
    getAllProducts: build.query<IProduct[], void>({
      query: () => ({
        url: 'products',
        headers: {
          'authorization': JSON.parse(localStorage.getItem('userData') || '').token,
          'content-type': 'text/plain',
        }
      }),
      providesTags: (result) => ['Product'],
    }),
    deleteProduct: build.mutation<IProduct, object>({
      query: (data: {id: string, content: Pick<IProduct, 'delete'>}) => ({
        url: `products/remove/${data.id}`,
        method: 'PATCH',
        headers: {
          'authorization': JSON.parse(localStorage.getItem('userData') || '').token,
        },
        body: data.content
      }),
      invalidatesTags: ['Product']
    }),
    addProduct: build.mutation<IProduct, Pick<IProduct, 'store' | 'price' | 'productName' | 'category' | 'remains' | 'weight' >>({
      query: (content) => ({
        url: 'products',
        method: 'POST',
        headers: {
          'authorization': JSON.parse(localStorage.getItem('userData') || '').token,
        },
        body: content
      }),
      invalidatesTags: ['Product']
    }),
    changeProduct: build.mutation<IProduct, object>({
      query: (data: {id: string, content: Omit<IProduct, '_id' | '__v'>}) => ({
        url: `products/change/${data.id}`,
        method: 'PUT',
        headers: {
          'authorization': JSON.parse(localStorage.getItem('userData') || '').token,
        },
        body: data.content
      }),
      invalidatesTags: ['Product']
    }),
    updateProduct: build.mutation<IProduct, object>({
      query: (data: {
        id: string,
        content: Pick<IProduct, 'remains' | 'quantity' | 'day' | 'lastSale' | 'lastSalePrice' | 'revenue'>
      }) => ({
        url: `products/update/${data.id}`,
        method: 'PATCH',
        headers: {
          'authorization': JSON.parse(localStorage.getItem('userData') || '').token,
        },
        body: data.content
      }),
      invalidatesTags: ['Product']
    })
  })
});

export const {
  useGetAllProductsQuery,
  useDeleteProductMutation,
  useAddProductMutation,
  useChangeProductMutation,
  useUpdateProductMutation,
  useGetProductQuery
} = productsAPI;