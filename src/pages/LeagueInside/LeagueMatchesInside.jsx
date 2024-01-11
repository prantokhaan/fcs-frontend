import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { useDeleteSingleMatchMutation } from '../../features/match/matchApi';
import ErrorMessage from '../../components/ErrorMessage';
import { useGetSingleLeagueQuery } from '../../features/league/leagueApi';

const LeagueMatchesInside = ({team, leagueId}) => {
  const auth = localStorage.getItem("auth");
  const role = JSON.parse(auth);
    const [deleteSingleMatch] = useDeleteSingleMatchMutation();
    const {
      data: league,
      isLoading: leagueLoading,
      isError: leagueError,
      error: leagueErr,
    } = useGetSingleLeagueQuery(leagueId);

    const navigate = useNavigate();

    const handleGo = (e) => {
      e.preventDefault();
      console.log(league[0].leagueStatus);
      if (league[0].leagueStatus === "Running") {
        navigate(`/editMatches/${team.matchId}/${leagueId}`);
      } else if (league[0].leagueStatus === "Pending") {
        swal(
          "Started!",
          "League has started, you can't add team now!",
          "warning"
        );
      } else if (league[0].leagueStatus === "Completed") {
        swal("Finished!", "This league has been finished!", "warning");
      }
    };

    const handleDelete = (e) => {
      if (league[0].leagueStatus === "Running") {
        swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this team!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            deleteSingleMatch(team.matchId);
            swal("Poof! Deleted Successfully!", {
              icon: "success",
            });
          } else {
            swal("Your league is safe");
          }
        });
      } else if (league[0].leagueStatus === "Pending") {
        swal(
          "Not Started!",
          "League has not started, you can't add team now!",
          "warning"
        );
      } else if (league[0].leagueStatus === "Completed") {
        swal("Finished!", "This league has been finished!", "warning");
      }
    };

    let buttonContent = null;
    if (leagueLoading) buttonContent = <div>Loading...</div>;
    else if (!leagueLoading && leagueError) {
      buttonContent = <ErrorMessage message={leagueErr.error} />;
      console.log(leagueErr.error);
    } else if (!leagueLoading && !leagueError && league.length === 0)
      buttonContent = <ErrorMessage message="nothing found" />;
    else if (!leagueLoading && !leagueError && league.length > 0) {
      buttonContent = league.map((team) => (
        <>
          <button className="matchButton" onClick={handleGo}>
            Edit
          </button>
          <button className="matchButton me-3 mt-1" onClick={handleDelete}>
            Delete
          </button>
        </>
      ));
    }
    return (
      <div className="singleMatch mt-2">
        <h4 className="mt-2 ms-3">R{team.matchRound}</h4>
        <img
          src={team.teamOneLogo}
          alt=""
          height="40px"
          width="40px"
          className="ms-3 mt-1"
        />

        <h4 className="mt-2">{team.teamOneName}</h4>
        <h4 className="mt-2">-</h4>
        <h4 className="mt-2">{team.teamTwoName}</h4>

        <img
          src={team.teamTwoLogo}
          alt=""
          height="40px"
          width="40px"
          className="me-3 mt-1"
        />
        {role.role === "admin" &&  buttonContent }
      </div>
    );
};

export default LeagueMatchesInside;