import React from 'react';

const TeamMatchesInside = ({team, teamId}) => {
    return (
      <div className="singleMatch mt-2">
        <h4 className="mt-2 ms-3">{team.leagueName}</h4>

        <img
          src={team.teamOneLogo}
          alt=""
          height="40px"
          width="40px"
          className="ms-3 mt-1"
        />

        <h4 className="mt-2">{team.teamOneName}</h4>
        <h4 className="mt-2">
          {team.scoreOne}-{team.scoreTwo}
        </h4>
        <h5 className="mt-2">{team.teamTwoName}</h5>

        <img
          src={team.teamTwoLogo}
          alt=""
          height="40px"
          width="40px"
          className="me-3 mt-1"
        />
      </div>
    );
};

export default TeamMatchesInside;