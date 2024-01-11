import React, { useEffect, useState } from 'react';
import { useAddLeagueTeamsMutation } from '../../../features/league/leagueApi';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../../../components/ErrorMessage';

const AddLeagueTeamsButton = ({res, leagueId}) => {
    const [input, setInput] = useState({
      leagueId: leagueId,
      teamName: res.teamName,
    });
    const [inError, setInError] = useState("");
    const [addLeagueTeams, { isLoading, isError, error, data, isSuccess }] =
      useAddLeagueTeamsMutation();

    const handleSubmit = (e) => {
      e.preventDefault();
      addLeagueTeams(input);
      console.log(input);
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

    console.log(inError)
    return (
      <div>
        <div className="text-right my-2" onClick={handleSubmit}>
          <button className="memberButton">Add {res.teamName}?</button>
        </div>
        {inError != "" && <ErrorMessage message={inError.data.error} />}
      </div>
    );
};

export default AddLeagueTeamsButton;