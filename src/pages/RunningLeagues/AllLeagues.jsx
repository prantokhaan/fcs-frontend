import React from "react";
import ErrorMessage from "../../components/ErrorMessage";
import { useGetAllCompletedLeagueQuery, useGetAllLeagueQuery } from "../../features/league/leagueApi";
import AllLeaguesDetails from "./AllLeaguesDetails";
import { Link } from "react-router-dom";

const AllLeagues = () => {
  const { data, isLoading, isError, error } = useGetAllCompletedLeagueQuery();

  console.log(data);

  let content = null;
  if (isLoading) content = <div>Loading...</div>;
  else if (!isLoading && isError) {
    content = <ErrorMessage message={error.error} />;
    console.log(error.error);
  } else if (!isLoading && !isError && data.length === 0)
    content = <ErrorMessage message="nothing found" />;
  else if (!isLoading && !isError && data.length > 0) {
    content = data.map((league) => (
      <div className="memberInfoContainer">
        <AllLeaguesDetails league={league} key={league.leagueId} />
      </div>
    ));
  }

  return (
    <div className="membersInfo">
      <div className="memberHeading d-flex justify-content-center">
        <Link to={`/`}>
          <button className="memberButton ms-5">Running Leagues</button>
        </Link>
        <h2 className="memberTitle">Completed Leagues</h2>
        <Link to={`/pendingLeagues`}>
          <button className="memberButton ms-5">Pending Leagues</button>
        </Link>
        <Link to={`/addLeagues`}>
          <button className="memberButton ms-5">Add New League</button>
        </Link>
        {/* <h4>Total Member: {mess.totalMember}</h4> */}
      </div>
      {content}
    </div>
  );
};

export default AllLeagues;
