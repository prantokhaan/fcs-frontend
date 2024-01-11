import React, { useEffect, useState } from "react";
import ErrorMessage from "../../components/ErrorMessage";
import { Link } from "react-router-dom";
import PlayerDetails from "./PlayerDetails";
import { useGetAllPlayerQuery } from "../../features/player/playerApi";
import SearchFilter from "../Panel/Players/PlayerFilter/SearchFilter";
import PlayerFilter from "../Panel/Players/PlayerFilter/PlayerFilter";

const Players = () => {
  const auth = localStorage.getItem("auth");
  const role = JSON.parse(auth);
  const { data, isLoading, isError, error } = useGetAllPlayerQuery();
  const [content, setContent] = useState(null);
  const [input, setInput] = useState("");
  const [filterType, setFilterType] = useState("");



  useEffect(() => {
    if (input === "" && filterType === "") {
      if (isLoading) setContent(<div>Loading...</div>);
      else if (!isLoading && isError) {
        setContent(<ErrorMessage message={error.error} />);
        console.log(error.error);
      } else if (!isLoading && !isError && data.length === 0)
        setContent(<ErrorMessage message="nothing found" />);
      else if (!isLoading && !isError && data.length > 0) {
        setContent(
          data.map((player) => (
            <div className="memberInfoContainer">
              <PlayerDetails player={player} key={player.playerId} />
            </div>
          ))
        );
      }
    } else if (input !== "") {
      setContent(<SearchFilter input={input} />)
    } else if (filterType !== "") {
      setContent(<PlayerFilter input={filterType} />)
    }
  }, [input, data, isLoading, isError, error, filterType]);

  return (
    <div className="membersInfo">
      <div className="memberHeading d-flex justify-content-around">
        <input
          type="text"
          class="login-input-field"
          required
          placeholder="Search Player"
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="d-flex">
          <h2 className="memberTitle">All Players</h2>
          {role.role === "admin" && (
            <Link to={`/addPlayers`}>
              <button className="memberButton ms-5">Add New Player</button>
            </Link>
          )}
        </div>

        <div className="login-input">
          <select
            className="login-input-field"
            required
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">Filter Player</option>
            <option value="name_asc">Name (Ascending)</option>
            <option value="name_desc">Name (Descending)</option>
            <option value="age_asc">Age: Young to Old</option>
            <option value="age_desc">Age: Old to Young</option>
            <option value="forward">Only Forward</option>
            <option value="midfielder">Only Midfielder</option>
            <option value="defender">Only Defender</option>
            <option value="goalkeeper">Only Goalkeeper</option>
          </select>
        </div>
        {/* <h4>Total Member: {mess.totalMember}</h4> */}
      </div>
      {content}
    </div>
  );
};

export default Players;
