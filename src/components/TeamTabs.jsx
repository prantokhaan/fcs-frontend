import React from 'react';
import { Link, useParams } from 'react-router-dom';

const TeamTabs = () => {
    const {teamId} = useParams();
    return (
      <div className="tabs">
        <Link to={`/teamPlayers/${teamId}`}>
          <button className="tabsButton">Players</button>
        </Link>
        <Link to={`/teamTrophies/${teamId}`}>
          <button className="tabsButton">Trophies</button>
        </Link>
        <Link to={`/teamStat/${teamId}`}>
          <button className="tabsButton">Stats</button>
        </Link>
        <Link to={`/teamMatches/${teamId}`}>
          <button className="tabsButton">Matches</button>
        </Link>
      </div>
    );
};

export default TeamTabs;