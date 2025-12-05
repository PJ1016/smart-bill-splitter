import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Memory, ExtractedData, UploadResponse, CreateMemoryRequest } from './types';

interface ChatResponse {
  responseText: string;
  matches: Memory[];
}

export const memoriesApi = createApi({
  reducerPath: 'memoriesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/api',
  }),
  tagTypes: ['Memory'],
  endpoints: (builder) => ({
    // Upload image file
    uploadImage: builder.mutation<UploadResponse, FormData>({
      query: (formData) => ({
        url: '/upload',
        method: 'POST',
        body: formData,
      }),
    }),

    // Extract details from uploaded image
    extractDetails: builder.mutation<ExtractedData, { imageUrl: string }>({
      query: (body) => ({
        url: '/extract',
        method: 'POST',
        body,
      }),
    }),

    // Save a new memory
    saveMemory: builder.mutation<Memory, CreateMemoryRequest>({
      query: (body) => ({
        url: '/memories',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Memory'],
    }),

    // Get all memories
    getMemories: builder.query<Memory[], void>({
      query: () => '/memories',
      providesTags: ['Memory'],
    }),

    // Search memories
    searchMemories: builder.query<Memory[], string>({
      query: (searchTerm) => `/memories?search=${encodeURIComponent(searchTerm)}`,
      providesTags: ['Memory'],
    }),

    // Chat query
    chatQuery: builder.mutation<ChatResponse, { message: string }>({
      query: (body) => ({
        url: '/chat',
        method: 'POST',
        body,
      }),
    }),
  }),
});

// Export hooks for usage in components
export const {
  useUploadImageMutation,
  useExtractDetailsMutation,
  useSaveMemoryMutation,
  useGetMemoriesQuery,
  useSearchMemoriesQuery,
  useChatQueryMutation,
} = memoriesApi;