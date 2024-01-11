import React, { useEffect, useState } from 'react';
import { Col, Form, Input, Row } from "antd";
import PanelNav from '../PanelNav';
import { useAddTeamMutation } from '../../../features/team/teamApi';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../../../components/ErrorMessage';

const AddTeam = () => {

    const [input, setInput] = useState({
        teamName: "",
        teamLogo: "",
        teamRating: 0
    });
    const [inError, setInError] = useState("");

    const [addTeam, {isLoading, isError, error, data, isSuccess}] = useAddTeamMutation();

    const handleSubmit = e => {
        e.preventDefault();
        if(input.teamRating > 0 && input.teamRating <6){
            addTeam(input);
        }else{
            setInError("Team Rating Must be within 0 to 5");
        }
    }

    const navigate = useNavigate();

    useEffect(() => {
      if (error?.data) {
        setInError(error);
        console.log(error);
      }

      if (isSuccess) {
        console.log(data);

        navigate("/teams");
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
                  onChange={(e) =>
                    setInput({ ...input, teamRating: e.target.value })
                  }
                />
                <label class="login-input-label">Team Rating (1-5)</label>
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

export default AddTeam;