import React, { useEffect } from "react";
import { useGetPointTableQuery, useGetSingleLeagueQuery } from "../../features/league/leagueApi";
import { useParams } from "react-router-dom";
import LeagueTabs from "../../components/LeagueTabs";
import ErrorMessage from "../../components/ErrorMessage";


const LeaguePointTable = () => {
  const { leagueId } = useParams();
  const { data, isLoading, isError, error } =
    useGetPointTableQuery(leagueId);

  const {
    data: league,
    isLoading: leagueLoading,
    isError: leagueError,
    error: leagueErr,
  } = useGetSingleLeagueQuery(leagueId);

  let content = null;
  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (!isLoading && isError) {
    content = <div>Error: {isError}</div>;
  } else if (!isLoading && data.length === 0) {
    content = <div>No data available</div>;
  } else if (!isLoading && data.length > 0) {
    localStorage.setItem("leagueWinnerTeamId", data[0].teamId);
    content = (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Rank</th>
            <th scope="col">Logo</th>
            <th scope="col">Name</th>
            <th scope="col">Played</th>
            <th scope="col">Won</th>
            <th scope="col">Lost</th>
            <th scope="col">Drawn</th>
            <th scope="col">Points</th>
            <th scope="col">Goals For</th>
            <th scope="col">Goals Against</th>
            <th scope="col">Goal Difference</th>
          </tr>
        </thead>
        <tbody>
          {data.map((team, index) => (
            <tr key={team.teamId}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={team.teamLogo}
                  alt={team.teamName}
                  height="20px"
                  width="20px"
                />
              </td>
              <td>{team.teamName}</td>
              <td>{team.played}</td>
              <td>{team.wins}</td>
              <td>{team.loses}</td>
              <td>{team.draws}</td>
              <td>{team.points}</td>
              <td>{team.goalsFor}</td>
              <td>{team.goalsAgainst}</td>
              <td>{team.goalDifference}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  let buttonContent = null;
  if (leagueLoading) buttonContent = <div>Loading...</div>;
  else if (!leagueLoading && leagueError) {
    buttonContent = <ErrorMessage message={leagueErr.error} />;
    console.log(leagueErr.error);
  } else if (!leagueLoading && !leagueError && league.length === 0)
    buttonContent = <ErrorMessage message="nothing found" />;
  else if (
    !leagueLoading &&
    !leagueError &&
    league[0].leagueStatus === "Completed" &&
    !isLoading &&
    data.length > 0
  ) {
    buttonContent = league.map((team) => (
      <button className="tabsButton">
        League Winner is {data[0].teamName}
      </button>
    ));
  }

  return (
    <>
      <div className="leagues">
        <LeagueTabs />
        {buttonContent}
        {content}</div>;
    </>
  );
};

export default LeaguePointTable;
