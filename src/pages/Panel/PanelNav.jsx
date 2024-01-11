import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const PanelNav = () => {
  const { user } = useSelector((state) => state.auth);
  
  return (
    <div style={{ textAlign: "center" }} className="managerNav">
      <div className="manNavList">
        <Link to={`/addTeam/`} style={{ textDecoration: "none" }}>
          <button className="manNavButton">Add New Team</button>
        </Link>
        <Link
          to={`/addLeagues/`}
          style={{ textDecoration: "none" }}
        >
          <button className="manNavButton">Add Leagues</button>
        </Link>
        <br />
        
        
        
        {/* {"manager" === "manager" ? (
          <>
            <Link
              to={`/addMember/`}
              style={{ textDecoration: "none" }}
            >
              <button className="manNavButton">Add Member</button>
            </Link>
            <Link to="/bazarDates" style={{ textDecoration: "none" }}>
              <button className="manNavButton">Add Date of Bazar</button>
            </Link>
          </>
        ) : (
          <div></div>
        )} */}
      </div>
    </div>
  );
};

export default PanelNav;
