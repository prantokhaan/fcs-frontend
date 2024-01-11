import React, { useState } from 'react';
import swal from 'sweetalert';
import { useEditLeagueMutation, useGetAllLeagueTeamsQuery, useGetPointTableQuery } from '../../features/league/leagueApi';
import { useAddWinnerMutation, useDeleteWinnerMutation } from '../../features/winners/winnersApi';

const StartLeagueDetails = ({league}) => {

    const {data, isLoading} = useGetAllLeagueTeamsQuery(league.leagueId);
    const [deleteWinner] = useDeleteWinnerMutation();
    const [addWinner] = useAddWinnerMutation();

    const winnerTeam = localStorage.getItem("leagueWinnerTeamId");

    const [winner, setWinner] = useState({
        teamId: winnerTeam,
        leagueId: league.leagueId
    })

    const [input, setInput] = useState({
        ...league,
        leagueStatus: "",
    })

    const [editLeague] = useEditLeagueMutation();

    let len = 0;
    if(isLoading){
        len = 0;
    }else if(!isLoading){
        len = data.length;
    }

    console.log(len);

    const handleStart = e => {
        if(league.leagueStatus==="Pending" && league.leagueNoOfTeams === len){
          setInput({ ...league, leagueStatus: "Running" });
          editLeague({ ...league, leagueStatus: "Running" });
        //   console.log(input);
          swal("Good job!", "League has started!", "success");
        }else if(league.leagueNoOfTeams!=len){
            swal("Bad News!", "Add More Teams!", "error");
        }else{
            swal("Bad News!", "League is in starting mood already!", "error");
        }
    }
    const handleFinish = e => {
        if(league.leagueStatus==="Running" && league.leagueNoOfTeams === len){
          setInput({ ...league, leagueStatus: "Completed" });
          editLeague({ ...league, leagueStatus: "Completed" });
          addWinner(winner);
          swal("Good job!", "League has finished!", "success");
        }else if(league.leagueNoOfTeams!=len){
            swal("Bad News!", "Add More Teams!", "error");
        }else{
            swal("Bad News!", "League hasn't started yet!", "error");
        }
    }
    const handleResume = e => {
        if(league.leagueStatus==="Completed" && league.leagueNoOfTeams === len){
            setInput({ ...league, leagueStatus: "Running" });
            editLeague({ ...league, leagueStatus: "Running" });
            deleteWinner(league.leagueId);
            swal("Good job!", "League has resumed!", "success");
        }else if(league.leagueNoOfTeams!=len){
            swal("Bad News!", "Add More Teams!", "error");
        }else{
            swal("Bad News!", "Start the league", "error");
        }
    }
    return (
        <div>
            <button className='memberButton mt-5' onClick={handleStart}>Start the league</button>
            <button className='memberButton mt-5' onClick={handleFinish}>Finish the league</button>
            <button className='memberButton mt-5' onClick={handleResume}>Resume the league</button>
        </div>
    );
};

export default StartLeagueDetails;