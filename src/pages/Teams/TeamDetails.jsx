import React from 'react';
import LeagueButtons from '../../components/LeagueButtons';
import { Link } from 'react-router-dom';
import { useDeleteSingleLeagueMutation } from '../../features/league/leagueApi';
import { useDeleteSingleTeamMutation } from '../../features/team/teamApi';
import swal from 'sweetalert';
import Rating from "react-rating";
import { Rate } from 'antd';

const TeamDetails = ({team}) => {
  const auth = localStorage.getItem("auth");
  const role = JSON.parse(auth);
  const [deleteSingleTeam, {isError, error}] = useDeleteSingleTeamMutation();
  const handleDelete = (e) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this team!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteSingleTeam(team.teamId);
        swal("Poof! Deleted Successfully!", {
          icon: "success",
        });
      } else {
        swal("Your league is safe");
      }
    });
  };
    return (
      <div className="teamBox">
        <img src={team.teamLogo} alt="" height="100" width="100" />
        <h2 className="memberName text-capitalize ms-5 mt-4">
          {team.teamName}
        </h2>

        <div className="mt-4">
          <Rate value={team.teamRating} disabled />
        </div>

        {role.role === "admin" ? (
          <div className="mt-4">
            <Link to={`/viewTeam/${team.teamId}`}>
              <button className="memberButton">View</button>
            </Link>
            <Link to={`/editTeam/${team.teamId}`}>
              <button className="memberButton">Edit</button>
            </Link>

            <button className="memberButton bg-danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
        ) : (
          <div className="mt-4">
            <Link to={`/viewTeam/${team.teamId}`}>
              <button className="memberButton">View</button>
            </Link>
            
          </div>
        )}
      </div>
    );
};

export default TeamDetails;