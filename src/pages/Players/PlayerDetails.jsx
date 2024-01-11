import React from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { Rate } from "antd";
import { useDeletePlayerMutation } from "../../features/player/playerApi";

const PlayerDetails = ({ player }) => {
  const auth = localStorage.getItem("auth");
  const role = JSON.parse(auth);
  const [deletePlayer, { isError, error }] = useDeletePlayerMutation();
  const handleDelete = (e) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this player!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deletePlayer(player.playerId);
        swal("Poof! Deleted Successfully!", {
          icon: "success",
        });
      } else {
        swal("Your player is safe");
      }
    });
  };
  return (
    <div className="teamBox">
      <img src={player.playerImage} alt="" height="100" width="100" style={{borderRadius: "30px"}} />
      <h2 className="memberName text-capitalize ms-5 mt-3">{player.playerName}<br />
        <h5 className="mt-2">{player.playerPosition} - {player.playerAge} years </h5>
      </h2>

      {/* <div className="mt-4">
        <Rate defaultValue={team.teamRating} disabled />
      </div> */}

      {role.role === "admin" ? <div className="mt-4">
        <Link to={`/editPlayers/${player.playerId}`}>
          <button className="memberButton">Edit</button>
        </Link>

        <button className="memberButton bg-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>: <div className="mt-4"></div>}
    </div>
  );
};

export default PlayerDetails;
