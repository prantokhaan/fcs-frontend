import React, { useEffect, useState } from "react";
import { Col, Form, Input, Row } from "antd";
import { useAddTeamMutation, useGetSearchByTeamNameQuery } from "../../../features/team/teamApi";
import { useNavigate, useParams } from "react-router-dom";
import ErrorMessage from "../../../components/ErrorMessage";
import { useAddLeagueTeamsMutation } from "../../../features/league/leagueApi";
import PanelNav from "../../Panel/PanelNav";
import LeagueTabs from "../../../components/LeagueTabs";
import AddLeagueTeamsButton from "./AddLeagueTeamsButton";

const AddLeagueTeams = () => {
    const {leagueId} = useParams();
  const [input, setInput] = useState({
    leagueId: leagueId,
    teamName: "",
  });
  const [searchName, setSearchName] = useState("");
  const [inError, setInError] = useState("");

  const {data: searchRes, error: searchErr, isLoading: searchLoading, isError: isSearchError} = useGetSearchByTeamNameQuery(searchName);

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


  let content = null;
  console.log(searchRes);


  if (searchLoading) content = <div>Loading...</div>;
  if ((!searchLoading && isSearchError))
    content = <ErrorMessage message="no team found" />;
  if (
    (!searchLoading && !isSearchError && searchRes?.length === 0)
  )
    content = <ErrorMessage message="no team found" />;
  if ((!searchLoading && !isSearchError && searchRes?.length >0) &&
    searchName !== ""){
      console.log(searchName);
      content = searchRes.map((res) => (
        <AddLeagueTeamsButton res={res} key={res.teamId} leagueId={leagueId} />
      ));
    }
    

  return (
    <div>
      <LeagueTabs />
      <div class="login-container">
        {/* <!-- code here --> */}
        <div class="login-card">
          {/* <div class="login-card-image">
              <h2 class="login-card-heading">
                Get started
                <small>Let us create your account</small>
              </h2>
            </div> */}
          <form class="login-card-form">
            <div class="login-input">
              <input
                type="text"
                class="login-input-field"
                required
                onChange={(e) =>
                  setSearchName(e.target.value)
                }
              />
              <label class="login-input-label">Team Name</label>
            </div>
            {content}
            
            {/* <div class="login-action">
              <button class="login-action-button">Get started</button>
            </div> */}
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

export default AddLeagueTeams;
