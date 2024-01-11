import React from 'react';
import { leagueApi } from '../../features/league/leagueApi';

const AllLeagueStat = ({league}) => {
    return (
      <div className="memberInfoStat">
        <h3 className="memberStatItem">{league.leagueNoOfTeams}</h3>
        <h3 className="memberStatItem">{league.leagueType}</h3>
      </div>
    );
};

export default AllLeagueStat;