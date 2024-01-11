import React from 'react';
import LeagueTabs from '../../components/LeagueTabs';
import ErrorMessage from '../../components/ErrorMessage';
import { Link, useParams } from 'react-router-dom';
import { useGetAllCompletedMatchQuery } from '../../features/match/matchApi';
import LeagueCompletedMatchesInside from './LeagueCompletedMatchesInside';

const LeagueCompletedMatches = () => {
  const { leagueId } = useParams();
  const { data, isLoading, isError, error } = useGetAllCompletedMatchQuery(leagueId);

  console.log(data);

  let content = null;
  if (isLoading) content = <div>Loading...</div>;
  else if (!isLoading && isError) {
    content = <ErrorMessage message={error.error} />;
    console.log(error.error);
  } else if (!isLoading && !isError && data.length === 0)
    content = <ErrorMessage message="nothing found" />;
  else if (!isLoading && !isError && data.length > 0) {
    content = data.map((team) => (
      <LeagueCompletedMatchesInside team={team} leagueId={leagueId} key={team.matchId} />
    ));
  }
    return (
      <div className="leagues">
        <LeagueTabs />
        <div className="matches">
          {content}
        </div>
      </div>
    );
};

export default LeagueCompletedMatches;