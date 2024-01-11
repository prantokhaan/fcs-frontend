import React, { useEffect, useState } from "react";
import { Col, Form, Input, Row } from "antd";
import PanelNav from "../PanelNav";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../../components/ErrorMessage";
import { useAddLeagueMutation } from "../../../features/league/leagueApi";

const AddLeagues = () => {
  const [input, setInput] = useState({
    leagueName: "",
    leagueType: "",
    leagueNoOfTeams: 0,
    leagueStatus: "Pending"
  });
  const [inError, setInError] = useState("");

  const [addLeague, { isLoading, isError, error, data, isSuccess }] =
    useAddLeagueMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(input.leagueNoOfTeams>1){
        addLeague(input);
    }else{
        setInError({
          data: {
            ...data,
            error: "League Teams Number must be greater than 1",
          },
        });
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

      navigate("/");
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
                  setInput({ ...input, leagueName: e.target.value })
                }
              />
              <label class="login-input-label">League Name</label>
            </div>
            <div class="login-input">
              <input
                type="text"
                class="login-input-field"
                required
                onChange={(e) =>
                  setInput({ ...input, leagueType: e.target.value })
                }
              />
              <label class="login-input-label">League Type</label>
            </div>
            <div class="login-input">
              <input
                type="number"
                class="login-input-field"
                required
                onChange={(e) =>
                  setInput({ ...input, leagueNoOfTeams: e.target.value })
                }
              />
              <label class="login-input-label">Number of Teams (Min 1)</label>
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

export default AddLeagues;
