import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8800",
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