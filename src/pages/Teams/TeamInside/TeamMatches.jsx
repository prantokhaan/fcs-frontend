import React from 'react';
import TeamTabs from '../../../components/TeamTabs';
import TeamMatchesInside from './TeamMatchesInside';
import { useParams } from 'react-router-dom';
import { useGetTeamMatchesQuery } from '../../../features/match/matchApi';
import ErrorMessage from '../../../components/ErrorMessage';

const TeamMatches = () => {
    const { teamId } = useParams();
    const { data, isLoading, isError, error } =
      useGetTeamMatchesQuery(teamId);

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
        <TeamMatchesInside
          team={team}
          teamId={teamId}
          key={team.matchId}
        />
      ));
    }
    return (
      <div className="leagues">
        <TeamTabs />
        <div className="matches">{content}</div>
      </div>
    );
};

export default TeamMatches;