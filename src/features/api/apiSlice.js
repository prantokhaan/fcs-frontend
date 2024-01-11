import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fcs-server-o8a9.onrender.com/",
  }),
  tagTypes: [
    "login",
    "teams",
    "leagues",
    "leagueTeams",
    "matches",
    "points",
    "teamMatches",
    "singleTeam",
    "players",
    "teamPlayers",
    "singlePlayer",
    "winners",
    "pendingLeague",
    "singleLeague",
  ],
  endpoints: (builder) => ({}),
});