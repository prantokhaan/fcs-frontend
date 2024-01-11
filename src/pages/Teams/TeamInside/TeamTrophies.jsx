import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import ErrorMessage from "../../../components/ErrorMessage";
import TeamTabs from "../../../components/TeamTabs";
import { useGetAllTeamPlayersQuery } from "../../../features/player/playerApi";
import TeamPlayersInside from "./TeamPlayersInside";
import { useGetAllLeagueWinnersQuery } from "../../../features/winners/winnersApi";
import TeamTrophiesInside from "./TeamTrophiesInside";

const TeamTrophies = () => {
  const { teamId } = useParams();
  const { data, isLoading, isError, error } = useGetAllLeagueWinnersQuery(teamId);
  

  const navigate = useNavigate();

  //   const handleGo = (e) => {
  //     e.preventDefault();
  //     console.log(league[0].leagueStatus);
  //     if (league[0].leagueStatus === "Pending") {
  //       navigate(`/addLeagueTeams/${leagueId}`);
  //     } else if (league[0].leagueStatus === "Running") {
  //       swal(
  //         "Started!",
  //         "League has started, you can't add team now!",
  //         "warning"
  //       );
  //     } else if (league[0].leagueStatus === "Completed") {
  //       swal("Finished!", "This league has been finished!", "warning");
  //     }
  //   };

  let content = null;
  let count = null;
  if (isLoading) content = <div>Loading...</div>;
  else if (!isLoading && isError) {
    content = <ErrorMessage message={error.error} />;
    console.log(error.error);
  } else if (!isLoading && !isError && data.length === 0)
    count = (
      <h2 className="memberName text-center mt-5">Total Trophies: {data.length}</h2>
    );
  else if (!isLoading && !isError && data.length > 0) {
    count = <h2 className="memberName text-center mt-2">Total Trophies: {data.length}</h2>
    content = data.map((team) => (
      <TeamTrophiesInside team={team} key={team.leagueTeamId} />
    ));
  }


  return (
    <div className="leagues">
      <TeamTabs />

      {count}

      {/* {buttonContent} */}

      {content}
    </div>
  );
};

export default TeamTrophies;
