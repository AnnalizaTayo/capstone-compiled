import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/admin/login.scss';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/reducers/authReducer';
import useAuth from '../utils/useAuth';

const Login = () => {
  const { isAuthenticated } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  // eslint-disable-next-line
  const [accessToken, setAccessToken] = useState(null);
  // eslint-disable-next-line
  const [refreshToken, setRefreshToken] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isError, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      // Redirect to login page if not authenticated
      navigate('/admin-dashboard');
    } 
  }, [isAuthenticated, navigate]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, rememberMe  })
        });
        const data = await response.json();
        console.log(data);
        
        if (response.ok) {
            // Successful login, store user and tokens in sessionStorage
            dispatch(loginSuccess(data.user, data.accessToken, data.refreshToken));
            navigate('/admin-dashboard');
        } else {
            // Handle login error.
            console.log(data.message);
            setError(data.message);
        }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <main className="auth container">
      <div className="content">
        <div className="squareTilt"></div>
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Login</h2>
            {isError? (<p className="error-message" style={{ color: 'red' }}>{isError}</p>) : ''}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  autoComplete="off"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  className="form-control"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
                <span className="eye-icon" onClick={togglePasswordVisibility} >
                  {passwordVisible ? <RiEyeLine /> : <RiEyeOffLine />}
                </span>
              </div>
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                /> Remember Me
              </label>
              <br/>
              <br/>
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
  
};

export default Login;
