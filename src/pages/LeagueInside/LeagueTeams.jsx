import React from 'react';
import LeagueTabs from '../../components/LeagueTabs';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDeleteLeagueTeamMutation, useGetAllLeagueTeamsQuery, useGetSingleLeagueQuery } from '../../features/league/leagueApi';
import ErrorMessage from '../../components/ErrorMessage';
import swal from 'sweetalert';
import LeagueTeamsInside from './LeagueTeamsInside';

const LeagueTeams = () => {
  const auth = localStorage.getItem("auth");
  const role = JSON.parse(auth);
    const {leagueId} = useParams();
    const { data, isLoading, isError, error } = useGetAllLeagueTeamsQuery(leagueId);
    const [deleteLeagueTeam, {isSuccess}] = useDeleteLeagueTeamMutation();
    const {
      data: league,
      isLoading: leagueLoading,
      isError: leagueError,
      error: leagueErr,
    } = useGetSingleLeagueQuery(leagueId);

    const navigate = useNavigate();

    const handleGo = (e) => {
      e.preventDefault();
      console.log(league[0].leagueStatus);
      if (league[0].leagueStatus === "Pending") {
        navigate(`/addLeagueTeams/${leagueId}`);
      } else if (league[0].leagueStatus === "Running") {
        swal("Started!", "League has started, you can't add team now!", "warning");
      } else if (league[0].leagueStatus === "Completed") {
        swal("Finished!", "This league has been finished!", "warning");
      }
    };

    let content = null;
    if (isLoading) content = <div>Loading...</div>;
    else if (!isLoading && isError) {
      content = <ErrorMessage message={error.error} />;
      console.log(error.error);
    } else if (!isLoading && !isError && data.length === 0)
      content = <ErrorMessage message="nothing found" />;
    else if (!isLoading && !isError && data.length > 0) {
      content = data.map((team) => (
        <LeagueTeamsInside team={team} key={team.leagueTeamId} />
      ));
    }

    let buttonContent = null;
    if (leagueLoading) buttonContent = <div>Loading...</div>;
    else if (!leagueLoading && leagueError) {
      buttonContent = <ErrorMessage message={leagueErr.error} />;
      console.log(leagueErr.error);
    } else if (!leagueLoading && !leagueError && league.length === 0)
      buttonContent = <ErrorMessage message="nothing found" />;
    else if (!leagueLoading && !leagueError && league.length > 0) {
      buttonContent = league.map((team) => (
        <button className="tabsButton" onClick={handleGo}>
          Add Team
        </button>
      ));
    }

    
    return (
      <div className="leagues">
        <LeagueTabs />

        {role.role === "admin" && buttonContent}

        {content}
      </div>
    );
};

export default LeagueTeams;