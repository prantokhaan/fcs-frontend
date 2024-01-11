import React from 'react';
import LeagueTabs from '../../components/LeagueTabs';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetAllMatchQuery } from '../../features/match/matchApi';
import ErrorMessage from '../../components/ErrorMessage';
import LeagueMatchesInside from './LeagueMatchesInside';
import { useGetSingleLeagueQuery } from '../../features/league/leagueApi';
import swal from 'sweetalert';

const LeagueMatches = () => {
  const auth = localStorage.getItem("auth");
  const role = JSON.parse(auth);
  const { leagueId } = useParams();
  const { data, isLoading, isError, error } =
    useGetAllMatchQuery(leagueId);
  const {data: league, isLoading: leagueLoading, isError: leagueError, error: leagueErr} = useGetSingleLeagueQuery(leagueId);

  const navigate = useNavigate();

  const handleGo = (e) => {
    e.preventDefault();
    if (league[0].leagueStatus === "Running") {
      navigate(`/addLeagueMatch/${leagueId}`);
    }else if(league[0].leagueStatus === "Pending"){
      swal("Start!", "Start the league first!", "warning");
    }else if(league[0].leagueStatus === "Completed"){
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
      <LeagueMatchesInside team={team} key={team.matchId} leagueId={leagueId} />
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
      
        <button className="tabsButton" onClick={handleGo}>Add Match</button>
      
    ));
  }

  


    return (
      <div className="leagues">
        <LeagueTabs />
        {role.role === "admin" && buttonContent }
        <div className="matches">{content}</div>
      </div>
    );
};

export default LeagueMatches;