import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../shared/state/context";
import {login} from "../api";
import {useContext, useState } from "react";
export function Login() {
    const authState = useContext(AuthContext);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [successMessage, setSuccessMessage] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [apiProgress, setApiProgress] = useState(false);
    const navigate = useNavigate();
  
    const onSubmit = async (event) => {
      event.preventDefault();
      setApiProgress(true);
      setErrorMessage(null);
      setSuccessMessage(null);
      try {
        const response = await login({
          username: username,
          password: password
        });
        authState.onLoginSuccess(response.data.data);
        clearView();
        navigate("/home");
      } catch (err) {
        setErrorMessage(err?.response?.data?.message);
      } finally {
        setApiProgress(false);
      }
    };
    const clearView = () => {
      setUsername(null);
      document.getElementById("username").value = "";

      setPassword(null);
      document.getElementById("password").value = "";

    };

    return (
      <div className="container">
        <div className="col-lg-6 offset-lg-3 offset-sm-2">
          <form className="card" onSubmit={onSubmit}>
            <div className="text-center card-header">
              <h1>Login</h1>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  id="username"
                  className="form-control"
                  onChange={(event) => setUsername(event.target.value)}
                ></input>
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  id="password"
                  className="form-control"
                  type="password"
                  onChange={(event) => setPassword(event.target.value)}
                ></input>
              </div>


              {successMessage && (
                <div className="alert alert-success">{successMessage}</div>
              )}
              {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
              )}
              <div className="mb-3">
                <button
                  className="btn btn-primary"
                  disabled={
                    apiProgress || !password
                  }
                >
                  {apiProgress && (
                    <span
                      className="spinner-border spinner-border-sm"
                      aria-hidden="true"
                    ></span>
                  )}
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }