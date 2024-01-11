import React from 'react';
import { useDeleteLeagueTeamMutation } from '../../features/league/leagueApi';
import swal from 'sweetalert';

const LeagueTeamsInside = ({team}) => {
  const auth = localStorage.getItem("auth");
  const role = JSON.parse(auth);
    const [deleteLeagueTeam] = useDeleteLeagueTeamMutation();

    const handleDelete = (e) => {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this team!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          deleteLeagueTeam(team.leagueTeamId);
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

            <h4 className="mt-2">{team.teamName}</h4>

            {role.role === "admin" ? (
              <button className="matchButton me-3 mt-1" onClick={handleDelete}>
                Delete
              </button>
            ) : <div></div>}
          </div>
        </div>
      </div>
    );
};

export default LeagueTeamsInside;