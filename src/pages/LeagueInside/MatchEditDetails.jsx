import React, { useEffect, useState } from 'react';
import { useEditMatchResultMutation } from '../../features/match/matchApi';
import ErrorMessage from '../../components/ErrorMessage';
import { useNavigate } from 'react-router-dom';

const MatchEditDetails = ({team, leagueId}) => {
    const [input, setInput] = useState({
        matchId: team.matchId,
        scoreOne: team.scoreOne || 0,
        scoreTwo: team.scoreTwo || 0,
    })
    const [editMatchResult, {error, isLoading, isError, isSuccess, data}] = useEditMatchResultMutation();
    const [inError, setInError] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        if(input.scoreOne>-1 && input.scoreTwo>-1){
            editMatchResult(input);
        }else{
            setInError("Goals can't be negative");
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

        navigate(`/leagueMatches/${leagueId}`);
      }
    }, [data, error, navigate, isSuccess, leagueId]);

    const randomNumber = (e) => {
      e.preventDefault();
      let rand = Math.floor(Math.random() * 7);
      let randt = Math.floor(Math.random() * 7);

      setInput({
        ...input,
        scoreOne: rand,
        scoreTwo: randt,
      });
    };

    return (
      <div className="matchEdit">
        <div className="singleMatchEdit mt-2">
          <h4 className="mt-2 ms-3">R{team.matchRound}</h4>
          <img
            src={team.teamOneLogo}
            alt=""
            height="40px"
            width="40px"
            className="ms-3 mt-1"
          />

          <h4 className="mt-2">{team.teamOneName}</h4>
          <h4 className="mt-2">-</h4>
          <h4 className="mt-2">{team.teamTwoName}</h4>

          <img
            src={team.teamTwoLogo}
            alt=""
            height="40px"
            width="40px"
            className="me-3 mt-1"
          />
        </div>
        <form class="login-card-form w-50 mx-auto">
          <div class="login-input">
            <input
              type="number"
              class="login-input-field"
              required
              value={input.scoreOne}
              onChange={(e) => setInput({ ...input, scoreOne: e.target.value })}
            />
            <label class="login-input-label">{team.teamOneName}</label>
          </div>
          <div class="login-input">
            <input
              type="number"
              class="login-input-field"
              required
              value={input.scoreTwo}
              onChange={(e) => setInput({ ...input, scoreTwo: e.target.value })}
            />
            <label class="login-input-label">{team.teamTwoName}</label>
          </div>
          <div class="login-action" onClick={handleSubmit}>
            <button class="login-action-button">Update Match</button>
          </div>
          <div class="login-action">
            <button class="login-action-button" onClick={randomNumber}>
              Simulate
            </button>
          </div>

          {inError != "" && <ErrorMessage message={inError} />}
        </form>
      </div>
    );
};

export default MatchEditDetails;