import React, { useEffect, useState } from "react";
import ErrorMessage from "../../../components/ErrorMessage";
import swal from "sweetalert";
import EditPlayersInside from "./EditPlayersInside";
import { useGetSinglePlayerQuery } from "../../../features/player/playerApi";
import { useParams } from "react-router-dom";

const EditPlayers = () => {
    const {playerId} = useParams();
  const [input, setInput] = useState({
    playerName: "",
    playerImage: "",
    playerDOB: "",
    playerPosition: "",
  });
  const [inError, setInError] = useState("");

  const {data, isLoading, isError, error, isSuccess} = useGetSinglePlayerQuery(playerId);

  console.log(playerId);




  

  let content = null;
  if(isLoading) content = <div>Loading...</div>
  else if(!isLoading && isError) content = <ErrorMessage message={error.data.error} />
  else if(!isLoading && !isError && data.length === 0) content = <ErrorMessage message="Nothing Found" />
  else if(!isLoading && !isError && data.length> 0){
    content = data.map((player) => (
      <EditPlayersInside player={player} key={player.playerId} />
    ));
  }

  return (
    <div>
      <div class="login-container">
        {/* <!-- code here --> */}
        {content}
      </div>
    </div>
  );
};

export default EditPlayers;
