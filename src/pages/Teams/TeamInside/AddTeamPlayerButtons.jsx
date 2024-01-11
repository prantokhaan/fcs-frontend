import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../../../components/ErrorMessage';
import { useAddTeamPlayerMutation } from '../../../features/player/playerApi';

const AddTeamPlayerButtons = ({res, teamId}) => {
    const [input, setInput] = useState({
      teamId, 
      playerId: 0
    });
    const [inError, setInError] = useState("");
    const [addTeamPlayer, { isLoading, isError, error, data, isSuccess }] =
      useAddTeamPlayerMutation();

    const handleSubmit = (e) => {
      e.preventDefault();
      addTeamPlayer({teamId: teamId, playerId: res.playerId});
      
    };

    const navigate = useNavigate();

    useEffect(() => {
      if (error?.data) {
        setInError(error);
        console.log(error);
      }

      if (isSuccess) {
        console.log(data);

        navigate(`/teamPlayers/${teamId}`);
      }
    }, [data, error, navigate, isSuccess, teamId]);

    console.log(inError)
    return (
      <div>
        <div className="text-right my-2" onClick={handleSubmit}>
          <button className="memberButton">Add {res.playerName}?</button>
        </div>
        {inError != "" && <ErrorMessage message={inError.data.error} />}
      </div>
    );
};

export default AddTeamPlayerButtons;