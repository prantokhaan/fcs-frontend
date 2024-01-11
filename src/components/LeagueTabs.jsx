import React from 'react';
import { Link, useParams } from 'react-router-dom';

const LeagueTabs = () => {
  const auth = localStorage.getItem("auth");
  const role = JSON.parse(auth);
  const {leagueId} = useParams();
    return (
      <>
        {role.role === "admin" ? (
          <div className="tabs">
            <Link to={`/startLeague/${leagueId}`}>
              <button className="tabsButton">Start</button>
            </Link>
            <Link to={`/leaguePointsTable/${leagueId}`}>
              <button className="tabsButton">Points Table</button>
            </Link>
            <Link to={`/leagueTeams/${leagueId}`}>
              <button className="tabsButton">Teams</button>
            </Link>
            <Link to={`/leagueMatches/${leagueId}`}>
              <button className="tabsButton">Matches</button>
            </Link>
            <Link to={`/leagueCompletedMatches/${leagueId}`}>
              <button className="tabsButton">Completed</button>
            </Link>
          </div>
        ) : (
          <div className="tabs">
            <Link to={`/leaguePointsTable/${leagueId}`}>
              <button className="tabsButton">Points Table</button>
            </Link>
            <Link to={`/leagueTeams/${leagueId}`}>
              <button className="tabsButton">Teams</button>
            </Link>
            <Link to={`/leagueMatches/${leagueId}`}>
              <button className="tabsButton">Matches</button>
            </Link>
            <Link to={`/leagueCompletedMatches/${leagueId}`}>
              <button className="tabsButton">Completed</button>
            </Link>
          </div>
        )}
      </>
    );
};

export default LeagueTabs;