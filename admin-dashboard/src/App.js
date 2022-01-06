import "./App.css";
import React, { useContext } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Homepage from "./Pages/Homepage/Homepage";
import Userspage from "./Pages/UsersPage/Userspage";
import SingleUserPage from "./Pages/Single User Page/SingleUserPage";
import NewUserPage from "./Pages/New User Page/NewUserPage";
import MoviesPage from "./Pages/MoviesPage/MoviesPage";
import SingleMoviePage from "./Pages/SingleMoviePage/SingleMoviePage";
import NewMoviePage from "./Pages/NewMoviePage/NewMoviePage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import { authContext } from "./Context/Auth/AuthContext";
import Lists from "./Pages/ListsPage/Lists";
import SingleListPage from "./Pages/SingleListPage/SingleList";
import NewListPage from "./Pages/NewListPage/NewList";

function App() {
  const { user } = useContext(authContext);
  return (
    <Router>
      <Switch>
        <Route path="/login">
          {!user ? <LoginPage /> : <Redirect to="/" />}
        </Route>
        {user ? (
          <>
            <Navbar />
            <div className="container">
              <Sidebar />
              <Route exact path="/">
                <Homepage />
              </Route>
              <Route path="/users">
                <Userspage />
              </Route>
              <Route path="/user">
                <SingleUserPage />
              </Route>
              <Route path="/newUser">
                <NewUserPage />
              </Route>
              <Route path="/movies">
                <MoviesPage />
              </Route>
              <Route path="/movie">
                <SingleMoviePage />
              </Route>
              <Route path="/newMovie">
                <NewMoviePage />
              </Route>
              <Route path="/lists">
                <Lists />
              </Route>
              <Route path="/list">
                <SingleListPage />
              </Route>
              <Route path="/newList">
                <NewListPage />
              </Route>
            </div>
          </>
        ) : (
          <Redirect to="/login" />
        )}
      </Switch>
    </Router>
  );
}

export default App;
