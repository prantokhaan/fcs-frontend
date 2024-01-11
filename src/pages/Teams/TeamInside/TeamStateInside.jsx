import React, { useEffect } from "react";

const TeamStateInside = ({ team, teamId, played, stats, setStats }) => {

  useEffect(() => {
    if (team.scoreOne !== null && team.scoreTwo !== null) {
      if (teamId == team.teamOneId) {
        if (team.scoreOne > team.scoreTwo) {
          setStats((prevStats) => ({
            ...prevStats,
            win: prevStats.win + 1,
            played: prevStats.played + 1,
            goalScored: prevStats.goalScored + team.scoreOne,
            goalConceded: prevStats.goalConceded + team.scoreTwo,
          }));
        } else if (team.scoreOne == team.scoreTwo) {
          setStats((prevStats) => ({
            ...prevStats,
            draw: prevStats.draw + 1,
            played: prevStats.played + 1,
            goalScored: prevStats.goalScored + team.scoreOne,
            goalConceded: prevStats.goalConceded + team.scoreTwo,
          }));
        } else {
          setStats((prevStats) => ({
            ...prevStats,
            played: prevStats.played + 1,
            goalScored: prevStats.goalScored + team.scoreOne,
            goalConceded: prevStats.goalConceded + team.scoreTwo,
          }));
        }
        setStats((prev) => ({
            ...prev,
            teamName: team.teamOneName
        }))
      } else if (teamId == team.teamTwoId) {
        if (team.scoreTwo > team.scoreOne) {
          setStats((prevStats) => ({
            ...prevStats,
            win: prevStats.win + 1,
            played: prevStats.played + 1,
            goalScored: prevStats.goalScored + team.scoreTwo,
            goalConceded: prevStats.goalConceded + team.scoreOne,
          }));
        } else if (team.scoreOne == team.scoreTwo) {
          setStats((prevStats) => ({
            ...prevStats,
            draw: prevStats.draw + 1,
            played: prevStats.played + 1,
            goalScored: prevStats.goalScored + team.scoreTwo,
            goalConceded: prevStats.goalConceded + team.scoreOne,
          }));
        } else {
          setStats((prevStats) => ({
            ...prevStats,
            played: prevStats.played + 1,
            goalScored: prevStats.goalScored + team.scoreTwo,
            goalConceded: prevStats.goalConceded + team.scoreOne,
          }));
        }
        setStats((prev) => ({
          ...prev,
          teamName: team.teamTwoName,
        }));
      }

    }
  }, [
    team.scoreOne,
    team.scoreTwo,
    setStats,
    team.teamOneId,
    team.teamTwoId,
    teamId,
    team.teamOneName,
    team.teamTwoName
  ]);

  

  return <div className="mt-2"></div>;
};

export default TeamStateInside;
