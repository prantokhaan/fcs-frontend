import React from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useDeleteTeamPlayerMutation } from "../../../features/player/playerApi";

const TeamTrophiesInside = ({ team }) => {
  const [deleteTeamPlayer] = useDeleteTeamPlayerMutation();

  const handleDelete = (e) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this team!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteTeamPlayer(team.teamPlayerId);
        swal("Poof! Deleted Successfully!", {
          icon: "success",
        });
      } else {
        swal("Your league is safe");
      }
    });
  };
  return (
    <div className="memberInfoContainer">
      <div className="matches">
        <div className="singleMatch mt-2">
          <img
            src={team.teamLogo}
            alt=""
            height="40px"
            width="40px"
            className="ms-3 mt-1"
          />

          <h4 className="mt-2">{team.leagueName}</h4>
          <h4 className="mt-2"></h4>

          
        </div>
      </div>
    </div>
  );
};

export default TeamTrophiesInside;
