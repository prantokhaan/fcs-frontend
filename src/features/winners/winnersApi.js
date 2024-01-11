import { apiSlice } from "../api/apiSlice";

export const winnersApi  = apiSlice.injectEndpoints({
    endpoints: builder => ({
        addWinner: builder.mutation({
            query: data => ({
                url: "/addWinner",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["winners"],
        }),
        getAllLeagueWinners: builder.query({
            query: leagueId => ({
                url: `/getAllLeagueWinners/${leagueId}`
            }),
            providesTags: ["winners"]
        }),
        deleteWinner: builder.mutation({
            query: leagueId => ({
                url: `/deleteWinner/${leagueId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["winners"]
        })
    })
});

export const {useAddWinnerMutation, useDeleteWinnerMutation, useGetAllLeagueWinnersQuery} = winnersApi;