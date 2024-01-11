import { apiSlice } from "../api/apiSlice";

export const matchApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addMatch: builder.mutation({
      query: (data) => ({
        url: "/addMatch",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["matches"],
    }),
    getAllMatch: builder.query({
      query: (id) => ({
        url: `/getAllMatch/${id}`,
      }),
      providesTags: ["matches"],
    }),
    getAllCompletedMatch: builder.query({
      query: (id) => ({
        url: `/getAllCompletedMatch/${id}`,
      }),
      providesTags: ["matches"],
    }),
    getSingleMatch: builder.query({
      query: (id) => ({
        url: `/getSingleMatch/${id}`,
      }),
      providesTags: ["singleMatch"],
    }),
    editMatchResult: builder.mutation({
      query: (data) => ({
        url: `/editMatchResult`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["matches", "points", "leagueTeams", "leagues"],
    }),
    deleteSingleMatch: builder.mutation({
      query: (matchId) => ({
        url: `/deleteMatch/${matchId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["matches", "points", "leagueTeams", "leagues"],
    }),
    getTeamMatches: builder.query({
      query: (id) => ({
        url: `/getTeamMatches/${id}`,
      }),
      providesTags: ["teamMatches"]
    }),
  }),
});

export const {useAddMatchMutation, useGetAllMatchQuery, useGetAllCompletedMatchQuery, useGetSingleMatchQuery, useEditMatchResultMutation, useDeleteSingleMatchMutation, useGetTeamMatchesQuery} = matchApi;
