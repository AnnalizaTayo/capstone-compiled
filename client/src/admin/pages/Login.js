import React, { /* useEffect, */ useState } from "react";
import '../../assets/styles/admin/login.scss';
//import auth from '../../utils/auth/auth';
//import checkAuth from "../../utils/auth/authChecker";
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';

const Login = () => {
  const [email, /* setEmail */] = useState("");
  const [password,/*  setPassword */] = useState("");
  const [isError, /* setError */] = useState("");
  //const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  /* useEffect(() => {
    setIsAuthenticated(checkAuth());
    console.log('user is authenticated: '+isAuthenticated);
    if(isAuthenticated){
      window.location.href = '/';
    }
  }, [isAuthenticated]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setError('');
    console.log(email);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setError('');
    console.log(password);
  }; */

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  /* const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const emailInput = e.target.email.value;
        const passwordInput = e.target.password.value;

        // Call the login function with the provided email and password
        const response = await auth(emailInput, passwordInput);

        const { error } = response;

        if (error) {
          setError(error.message);
        } else {
          // Login successful, clear the input fields
          setEmail("");
          setPassword("");
          setError("");
    
          // Redirect to the desired page after successful login
          window.location.href = '/';
        }

    } catch (error) {
        //console.error('Handle Login error:', error.message);
        setError(error.message);
    }
  }; */

  return (
    <main className="auth container">
      <div className="content">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Login</h2>
            {isError && <p className="error-message" style={{ color: 'red' }}>{isError}</p>}
            <form /* onSubmit={handleLogin} */>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  /* onChange={handleEmailChange} */
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  className="form-control"
                  id="password"
                  value={password}
                  /* onChange={handlePasswordChange} */
                  required
                />
                <span className="eye-icon" onClick={togglePasswordVisibility} >
                  {passwordVisible ? <RiEyeLine /> : <RiEyeOffLine />}
                </span>
              </div>
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
  
};

export default Login;
