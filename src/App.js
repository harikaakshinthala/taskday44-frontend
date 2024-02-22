import React from "react";
import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./Components/UserEntry/Login";
import Signup from "./Components/UserEntry/Signup";
import Forgot from "./Components/UserEntry/Forgot/Forgot";
import MainDash from "./Components/DashBoard/MainDash/MainDash";
import AccountActivation from "./Components/UserEntry/AccountActivation";
import ResetPassword from "./Components/UserEntry/Forgot/ResetPassword";
import Nopage from "./Components/NoPage/Nopage";

function App() {
  

  return (
    <div className="App">
      <Switch>
        <Route path="/maindash">
          <MainDash />
        </Route>
        <Route exact path="/">
             <Redirect to="/maindash"/>
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/activate">
          <AccountActivation />
        </Route>
        <Route path="/forgot">
          <Forgot />
        </Route>
        <Route path="/resetpassword">
          <ResetPassword />
        </Route>

        <Route path="**">
          <Nopage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
