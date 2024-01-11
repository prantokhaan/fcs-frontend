import { apiSlice } from "../api/apiSlice";

export const teamApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addTeam: builder.mutation({
      query: (data) => ({
        url: "/addTeam",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["teams"],
    }),
    getAllTeam: builder.query({
      query: () => ({
        url: "/getAllTeam",
      }),
      providesTags: ["teams"],
    }),
    deleteSingleTeam: builder.mutation({
      query: (teamId) => ({
        url: `/deleteTeam/${teamId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["teams"],
    }),
    getSearchByTeamName: builder.query({
        query: (name) => ({
            url: `/getSearchByTeamName/${name}`,
        })
    }),
    getSearchByLeagueTeamName: builder.query({
        query: (name) => ({
            url: `/getSearchByLeagueTeamName/${name}`,
        })
    }),
    getSingleTeam: builder.query({
      query: (teamId) => ({
        url: `/getSingleTeam/${teamId}`,
      }),
      providesTags: ["singleTeam"]
    }),
    editSingleTeam: builder.mutation({
      query: data => ({
        url: "/editSingleTeam",
        method: "POST",
        body: data
      }),
      invalidatesTags: ['teams', "leagueTeams", "singleTeam"]
    }),
    filterTeams: builder.query({
      query: filterType => ({
        url: `/filterTeams/${filterType}`,
      })
    })
  }),
});

export const {useAddTeamMutation, useGetAllTeamQuery,useDeleteSingleTeamMutation, useGetSearchByTeamNameQuery,useGetSearchByLeagueTeamNameQuery, useGetSingleTeamQuery, useEditSingleTeamMutation, useFilterTeamsQuery} = teamApi;