import React, { useEffect, useState } from 'react';
import TeamDetails from './TeamDetails';
import { useGetAllTeamQuery, useGetSearchByTeamNameQuery } from '../../features/team/teamApi';
import ErrorMessage from '../../components/ErrorMessage';
import { Link } from 'react-router-dom';
import SearchFilter from './TeamFilters/SearchFilter';
import TeamFilter from './TeamFilters/TeamFilter';

const Teams = () => {
  const auth = localStorage.getItem("auth");
  const role = JSON.parse(auth);
  const { data, isLoading, isError, error } = useGetAllTeamQuery();
  const [input, setInput] = useState("");
  const [filterType, setFilterType] = useState("");
  const [content, setContent] = useState(null);

  useEffect(() => {
    if (input === "" && filterType==="") {
      if (isLoading) setContent(<div>Loading...</div>);
      else if (!isLoading && isError) {
        setContent(<ErrorMessage message={error.error} />);
        console.log(error.error);
      } else if (!isLoading && !isError && data.length === 0)
        setContent(<ErrorMessage message="Nothing found" />);
      else if (!isLoading && !isError && data.length > 0) {
        // Update the content state with JSX elements
        const teamElements = data.map((team) => (
          <div className="memberInfoContainer" key={team.id}>
            <TeamDetails team={team} />
          </div>
        ));
        setContent(teamElements);
      }
    }else if(input!==""){
      setContent(<SearchFilter input={input} />)
    }else if(filterType!==""){
      setContent(<TeamFilter input={filterType} />)
    }
  }, [input, data, isLoading, isError, error, filterType]); // Added dependencies

  console.log(data);

  return (
    <div className="membersInfo">
      <div className="memberHeading d-flex justify-content-around">
        <input
          type="text"
          class="login-input-field"
          required
          placeholder="Search Team"
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="d-flex">
          <h2 className="memberTitle">All Teams</h2>
          {role.role === "admin" && (
            <Link to={`/addTeam`}>
              <button className="memberButton ms-5">Add New Team</button>
            </Link>
          )}
        </div>
        <div className="login-input">
          <select
            className="login-input-field"
            required
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">Filter Teams</option>
            <option value="name_asc">Name (Ascending)</option>
            <option value="name_desc">Name (Descending)</option>
            <option value="rating_asc">Rating: Low to High</option>
            <option value="rating_desc">Rating: High to Low</option>
          </select>
        </div>
        {/* <h4>Total Member: {mess.totalMember}</h4> */}
      </div>
      {content}
    </div>
  );
};

export default Teams;