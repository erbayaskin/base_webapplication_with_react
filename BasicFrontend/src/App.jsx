import "./App.css";
import Home from "./pages/Home";
import { HashRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import User from "./pages/User";
import UserList from "./pages/UserList";
import Login from "./pages/Login";

import { AuthenticationContext } from "./shared/state/context";
import { NavBar } from "./shared/components/NavBar";
function App() {
  return (
    <AuthenticationContext>
      <HashRouter>
        <NavBar></NavBar>
        <div className="container mt-3">
          <Routes>
            <Route exact path="/" Component={Home} />
            <Route exact path="/home" Component={Home} />
            <Route path="/userlist" Component={UserList} />
            <Route path="/signup" Component={SignUp} />
            <Route path="/login" Component={Login} />
            <Route path="/user/:id" Component={User} />
            <Route path="*" Component={Home} />
          </Routes>
        </div>
      </HashRouter>
    </AuthenticationContext>
  );
}

export default App;
