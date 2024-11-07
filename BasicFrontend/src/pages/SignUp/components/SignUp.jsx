import { useState } from "react";
import { signUp } from "../api";

export function SignUp() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [repeatPassword, setRepeatPassword] = useState();
  const [selectedUserRole, setSelectedUserRole] = useState({
    id: 3,
    role_name: "ROLE_CLIENTSIGNER",
  });
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [apiProgress, setApiProgress] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setApiProgress(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      const response = await signUp({
        username: username,
        password: password,
        email: email,
        enabled: true,
        roles: [selectedUserRole],
      });
      setSuccessMessage(response.data.data);
      clearView();
    } catch (err) {
      setErrorMessage("API error : " + err.response?.data?.message);
    } finally {
      setApiProgress(false);
    }
  };
  const clearView = () => {
    setUsername(null);
    document.getElementById("username").value = "";
    setEmail(null);
    document.getElementById("email").value = "";
    setPassword(null);
    document.getElementById("password").value = "";
    setRepeatPassword(null);
    document.getElementById("passwordRepeat").value = "";
  };
  const selectRole = (index) => {
    if (index === 0)
      setSelectedUserRole({ id: 3, role_name: "ROLE_CLIENTSIGNER" });
    else if (index === 1)
      setSelectedUserRole({ id: 1, role_name: "ROLE_ADMIN" });
    else if (index === 2)
      setSelectedUserRole({ id: 2, role_name: "ROLE_USER" });
  };
  return (
    <div className="container">
      <div className="col-lg-6 offset-lg-3 offset-sm-2">
        <form className="card" onSubmit={onSubmit}>
          <div className="text-center card-header">
            <h1>Sign Up</h1>
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
              <label htmlFor="email" className="form-label">
                E-mail
              </label>
              <input
                id="email"
                className="form-control"
                onChange={(event) => setEmail(event.target.value)}
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
            <div className="mb-3">
              <label htmlFor="passwordRepeat" className="form-label">
                Password Repeat
              </label>
              <input
                id="passwordRepeat"
                className="form-control"
                type="password"
                onChange={(event) => setRepeatPassword(event.target.value)}
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="selectRole" className="form-label">
                Select Role
              </label>
              <select
                id="selectRole"
                className="form-control"
                value={selectedUserRole.role_name}
                onChange={(event) => selectRole(event.target.selectedIndex)}
              >
                <option value="ROLE_CLIENTSIGNER">Client Signer</option>
                <option value="ROLE_ADMIN">Admin</option>
                <option value="ROLE_USER">User</option>
              </select>
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
                  apiProgress || !password || password !== repeatPassword
                }
              >
                {apiProgress && (
                  <span
                    className="spinner-border spinner-border-sm"
                    aria-hidden="true"
                  ></span>
                )}
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
