import React from 'react';
import LeagueTabs from '../../components/LeagueTabs';
import { useParams } from 'react-router-dom';
import { useGetSingleLeagueQuery } from '../../features/league/leagueApi';
import ErrorMessage from '../../components/ErrorMessage';
import StartLeagueDetails from './StartLeagueDetails';

const StartLeague = () => {
    const {leagueId} = useParams();
    const {data, isLoading, isError, error} = useGetSingleLeagueQuery(leagueId);
    

    let content = null;
    if (isLoading) content = <div>Loading...</div>;
    else if (!isLoading && isError) {
      content = <ErrorMessage message={error.error} />;
      console.log(error.error);
    } else if (!isLoading && !isError && data.length === 0)
      content = <ErrorMessage message="nothing found" />;
    else if (!isLoading && !isError && data.length > 0) {
      content = data.map((league) => (
        <StartLeagueDetails league={league} key={league.leagueId} />
      ));
    }
    return (
        <div className='leagues'>
            <LeagueTabs />
            {content}
        </div>
    );
};

export default StartLeague;