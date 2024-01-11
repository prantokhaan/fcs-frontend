import React from 'react';
import AllLeagueStat from './AllLeagueStat';
import AllLeagueName from "./AllLeagueName";
import LeagueButtons from '../../components/LeagueButtons';

const AllLeaguesDetails = ({league}) => {
    return (
      <div className="memberBox">
        <h2 className="memberName text-capitalize">{league?.leagueName}</h2>
        <hr className="w-50 mx-auto" />
        <div className="memberInfoDetail">
          <AllLeagueName league={league} />
          <AllLeagueStat league={league} />
        </div>
        <hr className="w-50 mx-auto" />
        {/* {user.role === "manager" ? (
          <div>
            <Link to={`addMeal/${_id}`}>
              <button className="memberButton">Add Meal</button>
            </Link>
            <Link to={`addDeposit/${_id}`}>
              <button className="memberButton mt-2">Add Deposit</button>
            </Link>
          </div>
        ) : (
          <div></div>
        )} */}

        {/* <AllMemberButtons id={member.id} messId={member.messId} /> */}
        <LeagueButtons id={league.leagueId} />
      </div>
    );
};

export default AllLeaguesDetails;