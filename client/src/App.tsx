import "./app.css";
import Home from "./pages/home/home";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Register } from "./pages/register/register";
import { Login } from "./pages/login/login";
import { Profile } from "./pages/profile/profile";
import axios from "axios";
import { AuthContext } from "./context/AuthContext";
import { useEffect, useContext } from "react";
import { clearUser, getUserInfo } from "./context/AuthActions";

const App = () => {

  const { user, isFetching, dispatch } = useContext(AuthContext);

  useEffect(() =>{
    const onRejected = (error: any) => {
      if(error.response) {
        const httpStatusCode = error.response.status;
        if(httpStatusCode === 401 || httpStatusCode === 403) {
          clearUser(dispatch!);
          window.location.href = "/login";
        }
      }
  
      throw error;
    }
  
    axios.interceptors.response.use(undefined, onRejected);
  }, [dispatch])
  

  useEffect(() => {
    if(!user && window.location.href.indexOf("/login") === -1 ) {
      getUserInfo(dispatch!);
    }
  }, [user, dispatch]);

  if(isFetching) {
    return <p>Loading User...</p>
  } else {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            { user ? <Home /> : <Login /> }
          </Route>
          <Route path="/login">
            { user ? <Redirect to="/" /> : <Login /> }
          </Route>
          <Route path="/register">
            { user ? <Redirect to="/" /> : <Register /> }
          </Route>
          <Route path="/profile/:username">
            { user ? <Profile /> : <Login /> }
          </Route>
        </Switch>
      </Router> 
    );
  }
}

export default App;
