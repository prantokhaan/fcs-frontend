import React, { useEffect, useState } from "react";
import { Col, DatePicker, Form, Input, Row } from "antd";
import PanelNav from "../PanelNav";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../../components/ErrorMessage";
import { useAddPlayerMutation } from "../../../features/player/playerApi";
import swal from "sweetalert";

const AddPlayers = () => {
  const [input, setInput] = useState({
    playerName: "",
    playerImage: "",
    playerDOB: "",
    playerPosition: ""
  });
  const [inError, setInError] = useState("");

  const [addPlayer, { isLoading, isError, error, data, isSuccess }] =
    useAddPlayerMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    addPlayer(input);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (error?.data) {
      setInError(error);
      console.log(error);
    }

    if (isSuccess) {
      swal("Wow!", "A new Player Added", "success");

      navigate("/players");
    }
  }, [data, error, navigate, isSuccess]);

  return (
    <div>
      <PanelNav />
      <div class="login-container">
        {/* <!-- code here --> */}
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
                onChange={(e) =>
                  setInput({ ...input, playerName: e.target.value })
                }
              />
              <label class="login-input-label">Player Name</label>
            </div>
            <div class="login-input">
              <input
                type="text"
                class="login-input-field"
                required
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
                onChange={(e) =>
                  setInput({ ...input, playerPosition: e.target.value })
                }
              >
                <option value="">Select Position</option>
                <option value="forward">Forward</option>
                <option value="midfielder">Midfielder</option>
                <option value="defender">Defender</option>
                <option value="goalkeeper">Goalkeeper</option>
              </select>
              <label className="login-input-label">Player Position</label>
            </div>

            <div class="login-input">
              <DatePicker
                onChange={(date, dateString) =>
                  setInput({ ...input, playerDOB: dateString })
                }
              />
              <label class="login-input-label">Player Date of Birth</label>
            </div>
            <div class="login-action">
              <button class="login-action-button">Get started</button>
            </div>
            {inError != "" && <ErrorMessage message={inError.data.error} />}
          </form>
          {/* <div class="login-card-info">
              <p>
                Already Registered? <Link to="/login">Login Here</Link>
              </p>
            </div> */}
        </div>
      </div>
    </div>
  );
};

export default AddPlayers;
