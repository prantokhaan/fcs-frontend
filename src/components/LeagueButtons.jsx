import React from 'react';
import { Link } from 'react-router-dom';
import swal from "sweetalert";
import { useDeleteSingleLeagueMutation } from '../features/league/leagueApi';

const LeagueButtons = ({id}) => {
  const auth = localStorage.getItem("auth");
  const role = JSON.parse(auth);
  console.log(role);
  const [deleteSingleLeague, {isLoading, isError, isSuccess, error}] = useDeleteSingleLeagueMutation();
  const handleDelete = e => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this league!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteSingleLeague(id);
        swal("Poof! Deleted Successfully!", {
          icon: "success",
        });
      }else{
        swal("Your league is safe")
      }
    });
  }
    return (
      <div>
        <Link to={`/leagues/${id}`}>
          <button className="memberButton">View</button>
        </Link>

        {role.role === "admin" && (
          <button className="memberButton mt-2" onClick={handleDelete}>
            Delete
          </button>
        )}
      </div>
    );
};

export default LeagueButtons;