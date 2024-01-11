import { apiSlice } from "../api/apiSlice";

export const playerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addPlayer: builder.mutation({
      query: (data) => ({
        url: "/addPlayer",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["players"],
    }),
    getAllPlayer: builder.query({
      query: () => ({
        url: "/getAllPlayer",
      }),
      providesTags: ["players"],
    }),
    deletePlayer: builder.mutation({
      query: (playerId) => ({
        url: `/deletePlayer/${playerId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["players"],
    }),
    getAllTeamPlayers: builder.query({
      query: (teamId) => ({
        url: `/getAllTeamPlayers/${teamId}`,
      }),
      providesTags: ["teamPlayers"],
    }),
    addTeamPlayer: builder.mutation({
      query: (data) => ({
        url: `/addTeamPlayer`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["teamPlayers"],
    }),
    searchPlayer: builder.query({
      query: (name) => ({
        url: `/searchPlayer/${name}`,
      }),
    }),
    deleteTeamPlayer: builder.mutation({
      query: (teamPlayerId) => ({
        url: `/deleteTeamPlayer/${teamPlayerId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["teamPlayers", "teams"],
    }),
    getSinglePlayer: builder.query({
      query: (playerId) => ({
        url: `/getSinglePlayer/${playerId}`,
      }),
      providesTags: ["singlePlayer"],
    }),
    editSinglePlayer: builder.mutation({
      query: (data) => ({
        url: `/editSinglePlayer/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["singlePlayer", "players"],
    }),
    filterPlayers: builder.query({
      query: (filterType) => ({
        url: `/filterPlayers/${filterType}`,
      }),
    }),
    getSearchByPlayerName: builder.query({
      query: (name) => ({
        url: `/getSearchByPlayerName/${name}`,
      }),
    }),
  }),
});

export const {useAddPlayerMutation, useGetAllPlayerQuery, useDeletePlayerMutation, useAddTeamPlayerMutation, useGetAllTeamPlayersQuery, useSearchPlayerQuery, useDeleteTeamPlayerMutation, useEditSinglePlayerMutation, useGetSinglePlayerQuery, useFilterPlayersQuery, useGetSearchByPlayerNameQuery} = playerApi;