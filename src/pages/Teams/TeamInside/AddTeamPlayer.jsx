import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ErrorMessage from "../../../components/ErrorMessage";
import LeagueTabs from "../../../components/LeagueTabs";
import AddTeamPlayerButtons from "./AddTeamPlayerButtons";
import { useAddTeamPlayerMutation, useSearchPlayerQuery } from "../../../features/player/playerApi";
import TeamTabs from "../../../components/TeamTabs";

const AddTeamPlayer = () => {
  const { teamId } = useParams();
  const [input, setInput] = useState({
    teamId: teamId,
    playerId: 0,
  });
  const [searchName, setSearchName] = useState("");
  const [inError, setInError] = useState("");

  const {
    data: searchRes,
    error: searchErr,
    isLoading: searchLoading,
    isError: isSearchError,
  } = useSearchPlayerQuery(searchName);

  

 

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
    searchRes.length > 0 &&
    searchName !== ""
  ) {
    console.log(searchName);
    content = searchRes.map((res) => (
      <AddTeamPlayerButtons res={res} key={res.teamId} teamId={teamId} />
    ));
  }

  return (
    <div>
      <TeamTabs />
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
                onChange={(e) => setSearchName(e.target.value)}
              />
              <label class="login-input-label">Player Name</label>
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

export default AddTeamPlayer;
