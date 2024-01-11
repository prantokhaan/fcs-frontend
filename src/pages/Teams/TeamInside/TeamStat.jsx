import React, { useState } from "react";
import TeamTabs from "../../../components/TeamTabs";
import TeamMatchesInside from "./TeamMatchesInside";
import { useParams } from "react-router-dom";
import ErrorMessage from "../../../components/ErrorMessage";
import { useGetTeamMatchesQuery } from "../../../features/match/matchApi";
import TeamStateInside from "./TeamStateInside";
import TeamTrophies from "./TeamTrophies";

const TeamStat = () => {
  const { teamId } = useParams();
  const { data, isLoading, isError, error } = useGetTeamMatchesQuery(teamId);
  const [stats, setStats] = useState({
    played: 0,
    win: 0,
    draw: 0,
    goalScored: 0,
    goalConceded: 0,
    teamName: ""
  });

  console.log(data);

  let content = null;
  let statContent = null;
  if (isLoading) statContent = <div>Loading...</div>;
  else if (!isLoading && isError) {
    content = <ErrorMessage message={error.error} />;
    console.log(error.error);
  } else if (!isLoading && !isError && data.length === 0)
    content = <ErrorMessage message="nothing found" />;
  else if (!isLoading && !isError && data.length > 0) {
    content = data.map((team) => (
      <TeamStateInside
        team={team}
        teamId={teamId}
        key={team.matchId}
        played={data.length}
        stats={stats}
        setStats={setStats}
      />
    ));
    statContent = (
      <>
        <h2 className="text-center memberName">{stats.teamName}</h2>
        <hr />
        <div className="memberInfoDetail">
          <div className="memberInfoName">
            <h3 className="memberNameItem">Played - </h3>
            <h3 className="memberNameItem">Win - </h3>
            <h3 className="memberNameItem">Lose - </h3>
            <h3 className="memberNameItem">Draw - </h3>
            <h3 className="memberNameItem">Goal Scored - </h3>
            <h3 className="memberNameItem">Goal Conceded - </h3>
            <h3 className="memberNameItem">Goal Scoring Ratio - </h3>
            <h3 className="memberNameItem">Goal Conceding Ratio - </h3>
            <h3 className="memberNameItem">Win Ratio - </h3>
          </div>
          <div className="memberInfoStat">
            <h3 className="memberStatItem">{stats.played / 2}</h3>
            <h3 className="memberStatItem">{stats.win / 2}</h3>
            <h3 className="memberStatItem">
              {stats.played/2 - (stats.win/2 + stats.draw/2)}
            </h3>
            <h3 className="memberStatItem">{stats.draw/2}</h3>
            <h3 className="memberStatItem">{stats.goalScored / 2}</h3>
            <h3 className="memberStatItem">{stats.goalConceded / 2}</h3>
            <h3 className="memberStatItem">
              {(stats.goalScored / 2 / stats.played).toFixed(2)}
            </h3>
            <h3 className="memberStatItem">
              {(stats.goalConceded / 2 / stats.played).toFixed(2)}
            </h3>
            <h3 className="memberStatItem">
              {((stats.win / stats.played) * 100).toFixed(2)}%
            </h3>
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="leagues">
      <TeamTabs />
      <div className="matches">{content}</div>
      {statContent}

    </div>
  );
};

export default TeamStat;
