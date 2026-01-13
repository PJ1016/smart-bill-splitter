import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { msalInstance } from "../../auth/msalConfig";
import { loginRequest } from "../../auth/authConfig";

const graphBaseQuery = fetchBaseQuery({
  baseUrl: "https://graph.microsoft.com/v1.0",
  prepareHeaders: async (headers) => {
    const account =
      msalInstance.getActiveAccount() || msalInstance.getAllAccounts()[0];

    if (account) {
      try {
        const response = await msalInstance.acquireTokenSilent({
          ...loginRequest,
          account: account,
        });
        headers.set("Authorization", `Bearer ${response.accessToken}`);
      } catch (error) {
        console.error("Token acquisition failed", error);
        // Fallback to interaction if silent acquisition fails is complicated in a baseQuery
        // Typically handled by re-triggering login via UI
      }
    }
    return headers;
  },
});

export const graphApi = createApi({
  reducerPath: "graphApi",
  baseQuery: graphBaseQuery,
  endpoints: (builder) => ({
    getProfile: builder.query<any, void>({
      query: () => "/me",
    }),
  }),
});

export const { useGetProfileQuery } = graphApi;
