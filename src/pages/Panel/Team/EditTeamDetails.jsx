import React, { useEffect, useState } from 'react';
import { useEditSingleTeamMutation } from '../../../features/team/teamApi';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../../../components/ErrorMessage';

const EditTeamDetails = ({team}) => {
    const [editTeam, {data, isLoading, isError, error, isSuccess}] = useEditSingleTeamMutation();
    const [input, setInput] = useState({
        teamName: team.teamName,
        teamLogo: team.teamLogo,
        teamRating: team.teamRating,
        teamId: team.teamId
    });
    const [inError, setInError] = useState("");

    const handleSubmit = e => {
        e.preventDefault()
        editTeam(input);
    }

    const navigate = useNavigate();

    useEffect(() => {
      if (error?.data) {
        setInError(error);
        console.log(error);
      }

      if (isSuccess) {
        console.log(data);

        navigate(`/teams/`)
      }
    }, [data, error, navigate, isSuccess, team.teamId]);
    return (
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
                value={input.teamName}
                onChange={(e) =>
                  setInput({ ...input, teamName: e.target.value })
                }
              />
              <label class="login-input-label">Team Name</label>
            </div>
            <div class="login-input">
              <input
                type="text"
                class="login-input-field"
                required
                value={input.teamLogo}
                onChange={(e) =>
                  setInput({ ...input, teamLogo: e.target.value })
                }
              />
              <label class="login-input-label">Team Logo</label>
            </div>
            <div class="login-input">
              <input
                type="number"
                class="login-input-field"
                required
                value={input.teamRating}
                onChange={(e) =>
                  setInput({ ...input, teamRating: e.target.value })
                }
              />
              <label class="login-input-label">Team Rating (1-5)</label>
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
      </div>
    );
};

export default EditTeamDetails;