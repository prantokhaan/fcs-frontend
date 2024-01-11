import React, { useEffect, useState } from "react";
import { Col, Form, Input, Row } from "antd";
import { useAddTeamMutation, useGetSearchByLeagueTeamNameQuery, useGetSearchByTeamNameQuery } from "../../../features/team/teamApi";
import { useNavigate, useParams } from "react-router-dom";
import ErrorMessage from "../../../components/ErrorMessage";
import { useAddLeagueTeamsMutation } from "../../../features/league/leagueApi";
import PanelNav from "../../Panel/PanelNav";
import LeagueTabs from "../../../components/LeagueTabs";
import { useAddMatchMutation } from "../../../features/match/matchApi";
import AddLeagueMatchButton from "./AddLeagueMatchButton";

const AddLeagueMatch = () => {
  const { leagueId } = useParams();
  const [input, setInput] = useState({
    leagueId: leagueId,
    teamOneName: "",
    teamTwoName: "",
    matchRound: 0,
  });
  const [inError, setInError] = useState("");
  const [searchName, setSearchName] = useState("");
  const [teamNum, setTeamNum] = useState("");

  const {
    data: searchRes,
    error: searchErr,
    isLoading: searchLoading,
    isError: isSearchError,
  } = useGetSearchByTeamNameQuery(searchName);

  const [addMatch, { isLoading, isError, error, data, isSuccess }] =
    useAddMatchMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(input.teamOneName === input.teamTwoName){
        setInError("Two teams can not be same");
    }else{
        addMatch(input);
    }
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

      navigate(`/leagueMatches/${leagueId}`);
    }
  }, [data, error, navigate, isSuccess, leagueId]);

  let content = null;
  console.log(searchRes);

  if (searchLoading) content = <div>Loading...</div>;
  if (!searchLoading && isSearchError)
    content = <ErrorMessage message="no team found" />;
  if (!searchLoading && !isSearchError && searchRes?.length === 0)
    content = <ErrorMessage message="no team found" />;
  if (
    !searchLoading &&
    !isSearchError &&
    searchRes?.length > 0 &&
    searchName !== ""
  ) {
    console.log(searchName);
    content = searchRes.map((res) => (
      <AddLeagueMatchButton res={res} key={res.teamId} leagueId={leagueId} teamNum={teamNum} input={input} setInput={setInput} />
    ));
  }

  console.log(searchRes)

  const handleOneChange = e => {
    setSearchName(e.target.value);
    setInput({...input, teamOneName: e.target.value})
    setTeamNum("One");
  }
  const handleTwoChange = e => {
    setSearchName(e.target.value);
    setTeamNum("Two");
    setInput({ ...input, teamTwoName: e.target.value });
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
                value={input.teamOneName}
                onChange={handleOneChange
                
                }
              />
              <label class="login-input-label">Team One Name</label>
            </div>
            <div class="login-input">
              <input
                type="text"
                class="login-input-field"
                required
                value={input.teamTwoName}
                onChange={handleTwoChange}
              />
              <label class="login-input-label">Team Two Name</label>
            </div>
            <div class="login-input">
              <input
                type="number"
                class="login-input-field"
                required
                onChange={(e) =>
                  setInput({ ...input, matchRound: e.target.value })
                }
              />
              <label class="login-input-label">Match Round</label>
            </div>
            {content}

            <div class="login-action" onClick={handleSubmit}>
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

export default AddLeagueMatch;
