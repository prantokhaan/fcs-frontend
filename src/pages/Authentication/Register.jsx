import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation, useRegisterMutation } from '../../features/auth/authApi';
import ErrorMessage from '../../components/ErrorMessage';

const Register = () => {
  const [login, setLogin] = useState({
    user: "",
    password: "",
    role: "user"
  });

  const [input, setInput] = useState({
    user: "",
    password: "",
    role: "user"
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [inError, setInError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, {isLoading, isError, error, isSuccess, data}] = useRegisterMutation();


  useEffect(() => {
    if(error?.data){
      console.log(error);
      setInError(error);
    }

    if(isSuccess){
      console.log(data);

      navigate("/");
    }
  }, [data, error, navigate, isSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(login.password === confirmPassword){
      register(login);
      console.log(login);
    }else{
      setInError("Password don't match");
    }
  }

    return (
      <div class="login-container">
        {/* <!-- code here --> */}
        <div class="login-card">
          <div class="login-card-image">
            <h2 class="login-card-heading">
              Get started
              <small>Let us create your account</small>
            </h2>
          </div>
          <form class="login-card-form" onSubmit={handleSubmit}>
             
            <div class="login-input">
              <input
                type="text"
                class="login-input-field"
                required
                onChange={(e) => setLogin({ ...login, user: e.target.value })}
              />
              <label class="login-input-label">Username</label>
            </div>
            <div class="login-input">
              <input
                type="password"
                class="login-input-field"
                required
                onChange={(e) =>
                  setLogin({ ...login, password: e.target.value })
                }
              />
              <label class="login-input-label">Password</label>
            </div>
            <div class="login-input">
              <input
                type="password"
                class="login-input-field"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label class="login-input-label">Confirm Password</label>
            </div>
            <div class="login-action">
              <button class="login-action-button">Get started</button>
            </div>
            {inError != "" && <ErrorMessage message={inError.data.error} />}
          </form>
          <div class="login-card-info">
            <p>
              Already Registered? <Link to="/login">Login Here</Link>
            </p>
          </div>
        </div>
      </div>
    );
};

export default Register;