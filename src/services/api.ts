import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { TIngredientsResponse, TOrderRequest, TOrderResponse } from './types';
import type { TIngredient } from '@/utils/types';

const API_URL = 'https://new-stellarburgers.education-services.ru/api';

export const ingredientsApi = createApi({
  reducerPath: 'ingredientsApi',
  tagTypes: ['INGREDIENTS'],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (builder) => ({
    getIngredients: builder.query<TIngredient[], void>({
      query: () => ({
        url: '/ingredients',
      }),
      transformResponse: (response: TIngredientsResponse) => {
        return response.data.map((item) => ({ ...item, counter: 0 }));
      },
      providesTags: ['INGREDIENTS'],
    }),
    orders: builder.mutation<TOrderResponse, TOrderRequest>({
      query: (body) => ({
        url: `/orders`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['INGREDIENTS'],
    }),
  }),
});

export const { useGetIngredientsQuery, useOrdersMutation } = ingredientsApi;
