import React from 'react';
import LeagueButtons from '../../components/LeagueButtons';
import RunningLeagueName from './RunningLeagueName';
import RunningLeagueStat from './RunningLeagueStat';

const RunningLeagueDetails = () => {
    return (
      <div className="memberBox">
        <h2 className="memberName text-capitalize">UEFA Champions League</h2>
        <hr className="w-50 mx-auto" />
        <div className="memberInfoDetail">
          <RunningLeagueName />
          <RunningLeagueStat />
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
        <LeagueButtons />
      </div>
    );
};

export default RunningLeagueDetails;