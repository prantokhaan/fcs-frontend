import React, { useState } from 'react';
import LeagueTabs from '../../components/LeagueTabs';
import { useParams } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';
import { useEditMatchResultMutation, useGetSingleMatchQuery } from '../../features/match/matchApi';
import MatchEditDetails from './MatchEditDetails';

const MatchEdit = () => {
  const {matchId} = useParams();

  const { data, isLoading, isError, error } = useGetSingleMatchQuery(matchId);
  

  

  let leagueId = 0;

  console.log(data);

  let content = null;
  if (isLoading) content = <div>Loading...</div>;
  else if (!isLoading && isError) {
    content = <ErrorMessage message={error.error} />;
    console.log(error.error);
  } else if (!isLoading && !isError && data.length === 0)
    content = <ErrorMessage message="nothing found" />;
  else if (!isLoading && !isError && data.length > 0) {
    leagueId = data[0].leagueId;
    content = data.map((team) => (
      <MatchEditDetails team={team} key={team.matchId} leagueId = {leagueId} />
    ));
  }
    return (
      <div className="leagues">
        <LeagueTabs />
        {content}
      </div>
    );
};

export default MatchEdit;