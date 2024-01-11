import React, { useEffect, useState } from "react";
import { useAddLeagueMutation, useAddLeagueTeamsMutation } from "../../../features/league/leagueApi";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../../components/ErrorMessage";
import { useAddMatchMutation } from "../../../features/match/matchApi";

const AddLeagueMatchButton = ({ res, leagueId, teamNum, input, setInput }) => {
  
  const [inError, setInError] = useState("");
  const [addMatch, { isLoading, isError, error, data, isSuccess }] =
    useAddMatchMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(teamNum==="One"){
        setInput({...input, teamOneName: res.teamName});
    }else if(teamNum==="Two"){
        setInput({...input, teamTwoName: res.teamName});
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (error?.data) {
      setInError(error);
      console.log(error);
    }

    if (isSuccess) {
      console.log(data);

      navigate(`/leagueTeams/${leagueId}`);
    }
  }, [data, error, navigate, isSuccess, leagueId]);

  console.log(inError);
  return (
    <div>
      <div className="text-right my-2" onClick={handleSubmit}>
        <button className="memberButton">Add {res.teamName}?</button>
      </div>
      {inError != "" && <ErrorMessage message={inError.data.error} />}
    </div>
  );
};

export default AddLeagueMatchButton;
