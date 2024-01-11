import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PlayerDetails from "../../../Players/PlayerDetails";
import { useGetSearchByPlayerNameQuery } from "../../../../features/player/playerApi";
import ErrorMessage from "../../../../components/ErrorMessage";

const SearchFilter = ({ input }) => {
  const { data, isLoading, isError, error } =
    useGetSearchByPlayerNameQuery(input);

  const [content, setContent] = useState(null);

  useEffect(() => {
    if (isLoading) setContent(<div>Loading...</div>);
    else if (!isLoading && isError) {
      setContent(<ErrorMessage message={error.error} />);
      console.log(error.error);
    } else if (!isLoading && !isError && data.length === 0)
      setContent(<ErrorMessage message="Nothing found" />);
    else if (!isLoading && !isError && data.length > 0) {
      const teamElements = data.map((team) => (
        <div className="memberInfoContainer" key={team.id}>
          <PlayerDetails player={team} />
        </div>
      ));
      setContent(teamElements);
    }
  }, [input, data, isLoading, isError, error]);

  return <div className="membersInfo">{content}</div>;
};

export default SearchFilter;
