import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFilterPlayersQuery } from "../../../../features/player/playerApi";
import ErrorMessage from "../../../../components/ErrorMessage";
import PlayerDetails from "../../../Players/PlayerDetails";

const PlayerFilter = ({ input }) => {
  const { data, isLoading, isError, error } = useFilterPlayersQuery(input);
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
          <PlayerDetails player={team} />
        </div>
      ));
      setContent(teamElements);
    }
  }, [input, data, isLoading, isError, error]); // Added dependencies

  console.log(data);

  return <div className="membersInfo">{content}</div>;
};

export default PlayerFilter;
