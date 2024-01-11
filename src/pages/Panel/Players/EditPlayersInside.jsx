import { DatePicker } from 'antd';
import React, { useEffect, useState } from 'react';
import ErrorMessage from '../../../components/ErrorMessage';
import { useEditSinglePlayerMutation } from '../../../features/player/playerApi';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const EditPlayersInside = ({player}) => {
    const [input, setInput] = useState({
        playerId: player.playerId,
        playerName: player.playerName,
        playerImage: player.playerImage,
        playerPosition: player.playerPosition
    })
    const [editSinglePlayer, {isLoading, isError, isSuccess, error}] = useEditSinglePlayerMutation();
    const [inError, setInError] = useState("");
    const handleSubmit = (e) => {
      e.preventDefault();
      editSinglePlayer(input);
    // console.log(input)
    };
const navigate = useNavigate();

useEffect(() => {
  if (error?.data) {
    setInError(error);
    console.log(error);
  }

  if (isSuccess) {
    swal("Wow!", "Player Edited", "success");

    navigate("/players");
  }
}, [error, navigate, isSuccess]);




  return (
    <div class="login-card">
      {/* <div class="login-card-image">
              <h2 class="login-card-heading">
                Get started
                <small>Let us create your account</small>
              </h2>
            </div> */}
      <form class="login-card-form" onSubmit={handleSubmit}>
        <div class="login-input">
          <input
            type="text"
            class="login-input-field"
            required
            value={input.playerName}
            onChange={(e) => setInput({ ...input, playerName: e.target.value })}
          />
          <label class="login-input-label">Player Name</label>
        </div>
        <div class="login-input">
          <input
            type="text"
            class="login-input-field"
            required
            value={input.playerImage}
            onChange={(e) =>
              setInput({ ...input, playerImage: e.target.value })
            }
          />
          <label class="login-input-label">Player Image</label>
        </div>
        <div className="login-input">
          <select
            className="login-input-field"
            required
            value={input.playerPosition}
            onChange={(e) =>
              setInput({ ...input, playerPosition: e.target.value })
            }
          >
            <option value="">Select Position</option>
            <option value="Forward">Forward</option>
            <option value="Midfielder">Midfielder</option>
            <option value="Defender">Defender</option>
            <option value="Goalkeeper">Goalkeeper</option>
          </select>
          <label className="login-input-label">Player Position</label>
        </div>

        <div class="login-action">
          <button class="login-action-button">Edit</button>
        </div>
        {inError != "" && <ErrorMessage message={inError.data.error} />}
      </form>
      {/* <div class="login-card-info">
              <p>
                Already Registered? <Link to="/login">Login Here</Link>
              </p>
            </div> */}
    </div>
  );
};

export default EditPlayersInside;