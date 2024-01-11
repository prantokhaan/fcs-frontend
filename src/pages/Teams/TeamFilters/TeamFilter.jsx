import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFilterTeamsQuery, useGetSearchByTeamNameQuery } from "../../../features/team/teamApi";
import TeamDetails from "../TeamDetails";
import ErrorMessage from "../../../components/ErrorMessage";

const TeamFilter = ({ input }) => {
  const { data, isLoading, isError, error } =
    useFilterTeamsQuery(input);
    console.log(input);
  const [content, setContent] = useState(null);

  useEffect(() => {
    if (isLoading) setContent(<div>Loading...</div>);
    else if (!isLoading && isError) {
      setContent(<ErrorMessage message={error.error} />);
      console.log(error.error);
    } else if (!isLoading && !isError && data.length === 0)
      setContent(<ErrorMessage message="Nothing found" />);
    else if (!isLoading && !isError && data.length > 0) {
      // Update the content state with JSX elements
      const teamElements = data.map((team) => (
        <div className="memberInfoContainer" key={team.id}>
          <TeamDetails team={team} />
        </div>
      ));
      setContent(teamElements);
    }
  }, [input, data, isLoading, isError, error]); // Added dependencies

  console.log(data);

  return <div className="membersInfo">{content}</div>;
};

export default TeamFilter;
