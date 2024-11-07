import { useContext, useEffect, useState } from "react";
import { getUser, updateUser, deleteUserInfos } from "../api";
import { useParams } from "react-router-dom";
import { Spinner, Alert } from "react-bootstrap";
import { AuthContext } from "../../../shared/state/context";
import { useNavigate } from "react-router-dom";
import { Col, Form } from "react-bootstrap";

export function User() {
  const [userInfos, setUserInfos] = useState();
  const [apiProgress, setApiProgress] = useState(false);
  const [error, setError] = useState();
  let params = useParams();
  const authState = useContext(AuthContext);
  const [editMod, setEditMod] = useState(false);
  const navigate = useNavigate();

  let optionsRoles = [
    { id: 1, role_name: "ROLE_ADMIN", label: "Admin" },
    { id: 2, role_name: "ROLE_USER", label: "User" },
    { id: 3, role_name: "ROLE_CLIENTSIGNER", label: "Client Signer" },
  ];

  const getUserInfos = async (id) => {
    try {
      setApiProgress(true);
      setError(null);
      setEditMod(false);
      let response = await getUser(id);
      console.log("getUserInfos", response);
      setUserInfos(response.data.data);
    } catch (e) {
      console.log("Error:", e);
      setError(e.response ? e.response.data.message : e.message);
    }
    setApiProgress(false);
  };
  const deleteUserById = async (id) => {
    try {
      setApiProgress(true);
      const result = confirm("Are you sure?");
      if (result) {
        setError(null);
        setEditMod(false);
        let response = await deleteUserInfos(id);
        console.log("deleteUserById", response);
        navigate("/UserList");
      }
    } catch (e) {
      console.log("Error:", e);
      setError(e.response ? e.response.data.message : e.message);
    }
    setApiProgress(false);
  };
  useEffect(() => {
    getUserInfos(params.id);
  }, [params.id]);
  const onSubmit = async (event) => {
    event.preventDefault(); // sayfa yenilenmemesi için
    try {
      setApiProgress(true);
      setError(null);
      const response = await updateUser(userInfos);
      console.log("updateUserInfos", response);
      setEditMod(false);
    } catch (e) {
      console.log("Error:", e);
      setError(e.response ? e.response.data.message : e.message);
    }
    setApiProgress(false);
  };
  function canselButtonClick() {
    getUserInfos(userInfos.id);
    changeEditMod();
  }
  function changeEditMod() {
    setEditMod(!editMod);
  }
  function deleteUser() {
    deleteUserById(userInfos.id);
  }
  return (
    <form className="card" onSubmit={onSubmit}>
      <div className="card-header text-center">
        <span>Kullanıcı Bilgileri</span>
      </div>
      <div className="card-body text-center">
        {!editMod && (
          <span className="fs-3 d-block">
            User name : {userInfos && userInfos.username}
          </span>
        )}
        {editMod && (
          <>
            <div className="m-2">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                id="username"
                className="form-control"
                defaultValue={userInfos.username}
                onChange={(event) =>
                  setUserInfos({ ...userInfos, username: event.target.value })
                }
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                E-mail
              </label>
              <input
                id="email"
                className="form-control"
                defaultValue={userInfos.email}
                onChange={(event) =>
                  setUserInfos({ ...userInfos, email: event.target.value })
                }
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                className="form-control"
                defaultValue={userInfos.password}
                type="password"
                onChange={(event) =>
                  setUserInfos({ ...userInfos, password: event.target.value })
                }
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="selectRole" className="form-label">
                Role(s)
              </label>
              <div
                className={`custom-dropdown-menu card mb-2`}
                aria-labelledby="multiSelectDropdown"
              >
                {optionsRoles.map((option) => (
                  <Form.Check
                    className={`custom-checkbox card d-flex flex-row-reverse justify-content-between mb-3 p-3 float-left  ${
                      userInfos.roles.some((f) => f.id === option.id)
                        ? `bg-info`
                        : `bg-warning`
                    }`}
                    style={{
                      height: "80px",
                      display: "flex",
                      alignItems: "center",
                      width: "50%",
                    }}
                    key={option.id}
                    type="checkbox"
                    id={`option_${option.id}`}
                    label={option.label}
                    checked={userInfos.roles.some((f) => f.id === option.id)}
                    onChange={(event) => {
                      let sameRoleHas = false;
                      userInfos.roles.map((e) => {
                        if (e.id === optionsRoles[event.target.value - 1].id)
                          sameRoleHas = true;
                      });
                      if (!sameRoleHas)
                        setUserInfos({
                          ...userInfos,
                          roles: [
                            ...userInfos.roles,
                            optionsRoles[event.target.value - 1],
                          ],
                        });
                      else {
                        let newRoles = userInfos.roles.filter(
                          (r) => r.id != optionsRoles[event.target.value - 1].id
                        );
                        setUserInfos({
                          ...userInfos,
                          roles: newRoles,
                        });
                      }
                    }}
                    value={option.id}
                  />
                ))}
              </div>
              <label className="text-center">* Alternatif çözüm</label>
              <Form.Control
                as="select"
                multiple
                value={userInfos.roles.map((e) => e.id)}
                onClick={(event) => {
                  let sameRoleHas = false;
                  userInfos.roles.map((e) => {
                    if (e.id === optionsRoles[event.target.value - 1].id)
                      sameRoleHas = true;
                  });
                  if (!sameRoleHas)
                    setUserInfos({
                      ...userInfos,
                      roles: [
                        ...userInfos.roles,
                        optionsRoles[event.target.value - 1],
                      ],
                    });
                  else {
                    let newRoles = userInfos.roles.filter(
                      (r) => r.id != optionsRoles[event.target.value - 1].id
                    );
                    setUserInfos({
                      ...userInfos,
                      roles: newRoles,
                    });
                  }
                }}
              >
                <option value={optionsRoles[0].id}>Admin</option>
                <option value={optionsRoles[1].id}>User</option>
                <option value={optionsRoles[2].id}>Client Signer</option>
              </Form.Control>
            </div>
          </>
        )}
        {editMod && authState?.user?.roles[0].id === optionsRoles[0].id && (
          <>
            <button className="btn btn-primary" type="submit">
              Save
            </button>
            <div className="d-inline m-2"></div>
            <button
              className="btn btn-danger"
              onClick={canselButtonClick}
              type="button"
            >
              Cancel
            </button>
          </>
        )}
        {!editMod && authState?.user?.roles[0].id === optionsRoles[0].id && (
          <>
            <button onClick={changeEditMod} className="btn btn-primary">
              Edit
            </button>
            <div className="d-inline m-1"></div>
            <button onClick={deleteUser} className="btn btn-danger">
              Delete
            </button>
          </>
        )}
        {apiProgress && (
          <Alert styleType="secondary" center>
            <Spinner />
          </Alert>
        )}
        {error && (
          <Alert variant="danger" center>
            {error}
          </Alert>
        )}
      </div>
    </form>
  );
}
