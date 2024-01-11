import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../features/auth/authApi';
import ErrorMessage from '../../components/ErrorMessage';

const Login = () => {
  const [input, setInput] = useState({
    user: "",
    password: "",
  });

  const [inError, setInError] = useState("");

  const [login, {isLoading, isError, error, data, isSuccess}] = useLoginMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if(error?.data){
      setInError(error);
      console.log(error);
    }
    if(data?.user){
      console.log(data);
      navigate("/");
    }
  }, [data, error, navigate]);


  const handleSubmit = e => {
    e.preventDefault();
    login(input);
  }


    return (
      <div>
        <div class="login-container">
          {/* <!-- code here --> */}
          <div class="login-card">
            <div class="login-card-image">
              <h2 class="login-card-heading">
                Yay!
                <small>Login to your account</small>
              </h2>
            </div>
            <form class="login-card-form" onSubmit={handleSubmit}>
              <div class="login-input">
                <input
                  type="text"
                  class="login-input-field"
                  required
                  onChange={(e) => setInput({ ...input, user: e.target.value })}
                />
                <label class="login-input-label">Username</label>
              </div>
              <div class="login-input">
                <input
                  type="password"
                  class="login-input-field"
                  required
                  onChange={(e) => setInput({ ...input, password: e.target.value })}
                />
                <label class="login-input-label">Password</label>
              </div>
              <div class="login-action">
                <button class="login-action-button">Get started</button>
              </div>
              {inError != "" && <ErrorMessage message={inError.data.error} />}
            </form>
            <div class="login-card-info">
              <p>
                Not Registered? <Link to="/register">Register Here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Login;