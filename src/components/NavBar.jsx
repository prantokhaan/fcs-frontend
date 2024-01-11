import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRightFromBracket,
  faBell,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLoggedOut } from '../features/auth/authSlice';

const NavBar = () => {

  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = (e) => {
    dispatch(userLoggedOut());
    localStorage.removeItem("user"); 
    setName("");
    navigate("/login");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setName(storedUser);
    }
  }, []);


  const {user} = useSelector(state => state.auth);

  
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", user);
      setName(user);
    }
  }, [user]);




    return (
      <div className="navbar">
        <div className="navContainer">
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            <span className="logo">
              FC<span className="logoPart">S</span>
            </span>
          </Link>

          <div className="navItems">
            {name !== "" && (
              <>
                <Link
                  to="/myProfile"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <button className="navButton text-uppercase">{name}</button>
                </Link>

                {/* if login  */}
                <button className="navButton" onClick={logout}>
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </button>
              </>
            )}

            {/* if not login  */}

            {name === "" && (
              <>
                <Link
                  to="/login"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <button className="navButton">Login</button>
                </Link>
                <Link
                  to="/register"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <button className="navButton">Register</button>
                </Link>
              </>
            )}

            {name !== "" && (
              <>
                <Link to="/teams" style={{ textDecoration: "none" }}>
                  <button className="navButton text-uppercase">Teams</button>
                </Link>
                <Link to="/allLeagues" style={{ textDecoration: "none" }}>
                  <button className="navButton text-uppercase">Leagues</button>
                </Link>
                <Link to="/players" style={{ textDecoration: "none" }}>
                  <button className="navButton text-uppercase">Players</button>
                </Link>
                <Link to="/managerPanel" style={{ textDecoration: "none" }}>
                  <button className="navButton">
                    <FontAwesomeIcon icon={faCircleInfo} />
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    );
};

export default NavBar;