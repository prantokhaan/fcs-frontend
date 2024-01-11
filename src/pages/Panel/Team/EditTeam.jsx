import React, { useEffect, useState } from "react";
import { Col, Form, Input, Row } from "antd";
import PanelNav from "../PanelNav";
import { teamApi, useAddTeamMutation, useGetSingleTeamQuery } from "../../../features/team/teamApi";
import { useNavigate, useParams } from "react-router-dom";
import ErrorMessage from "../../../components/ErrorMessage";
import EditTeamDetails from "./EditTeamDetails";

const EditTeam = () => {
    const {teamId} = useParams();
  const [input, setInput] = useState({
    teamName: "",
    teamLogo: "",
    teamRating: 0,
  });
  const [inError, setInError] = useState("");

  const [addTeam, { isLoading, isError, error, data, isSuccess }] =
    useAddTeamMutation();
  const {data: team, isLoading: teamLoading, isError: isTeamError, error: teamError} = useGetSingleTeamQuery(teamId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.teamRating > 0 && input.teamRating < 6) {
      addTeam(input);
    } else {
      setInError("Team Rating Must be within 0 to 5");
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

      navigate("/teams");
    }
  }, [data, error, navigate, isSuccess]);

  let content = null;
  if (teamLoading) content = <div>Loading...</div>;
  else if (!teamLoading && isTeamError) {
    content = <ErrorMessage message={error.error} />;
    console.log(error.error);
  } else if (!teamLoading && !isTeamError && team.length === 0)
    content = <ErrorMessage message="nothing found" />;
  else if (!teamLoading && !isTeamError && team.length > 0) {
    content = team.map((team) => (
      <div className="memberInfoContainer">
        <EditTeamDetails team={team} key={team.id} />
      </div>
    ));
  }

  return (
    <div>
      <PanelNav />
      {content}
    </div>
  );
};

export default EditTeam;
