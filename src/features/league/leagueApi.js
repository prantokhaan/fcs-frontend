import { apiSlice } from "../api/apiSlice";

export const leagueApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addLeague: builder.mutation({
      query: (data) => ({
        url: "/addLeague",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["leagues"],
    }),
    addLeagueTeams: builder.mutation({
      query: (data) => ({
        url: "/addLeagueTeams",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["leagueTeams"],
    }),
    getPointTable: builder.query({
      query: (id) => ({
        url: `/getPointTable/${id}`,
      }),
      providesTags: ["points"],
    }),
    getAllLeague: builder.query({
      query: () => ({
        url: "/getAllLeague",
      }),
      providesTags: ["leagues"],
    }),
    getAllRunningLeague: builder.query({
      query: () => ({
        url: "/getAllRunningLeague",
      }),
      providesTags: ["leagues"],
    }),
    getAllPendingLeague: builder.query({
      query: () => ({
        url: "/getAllPendingLeague",
      }),
      providesTags: ["pendingLeague"]
    }),
    getAllLeagueTeams: builder.query({
      query: (id) => ({
        url: `/getAllLeagueTeams/${id}`,
      }),
      providesTags: ["leagueTeams"],
    }),
    getSingleLeague: builder.query({
      query: (leagueId) => ({
        url: `/getSingleLeague/${leagueId}`,
      }),
      providesTags: ["singleLeague"]
    }),
    editLeague: builder.mutation({
      query: (data) => ({
        url: "/editLeague",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["leagues", "leagueTeams", "singleLeague"],
    }),
    deleteSingleLeague: builder.mutation({
      query: (leagueId) => ({
        url: `/deleteLeague/${leagueId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["leagues", "leagueTeams", "singleLeague" ],
    }),
    deleteLeagueTeam: builder.mutation({
      query: (leagueTeamId) => ({
        url: `/deleteLeagueTeam/${leagueTeamId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["points", "leagueTeams", "leagues", "teams"],
    }),
    getAllCompletedLeague: builder.query({
      query: () => ({
        url: `/getAllCompletedLeague`,
      }),
    }),
  }),
});

export const {useAddLeagueMutation, useGetAllLeagueQuery, useGetAllRunningLeagueQuery, useAddLeagueTeamsMutation,useGetAllLeagueTeamsQuery, useGetPointTableQuery, useDeleteSingleLeagueMutation, useDeleteLeagueTeamMutation, useGetAllPendingLeagueQuery, useGetSingleLeagueQuery, useEditLeagueMutation, useGetAllCompletedLeagueQuery} = leagueApi;