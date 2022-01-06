import "./App.scss";
import Login from "./Pages/Login";
import Home from "./Home/Home";
import Watch from "./Pages/Watch";
import Register from "./Pages/Register";
import { useContext } from "react";
import { userContext } from "./ContextApi/userContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  const { user } = useContext(userContext);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {user ? <Home /> : <Redirect to="/register" />}
          </Route>
          <Route path="/movies">
            {user ? <Home type="movies" /> : <Redirect to="/register" />}
          </Route>
          <Route path="/series">
            {user ? <Home type="series" /> : <Redirect to="/register" />}
          </Route>
          <Route path="/watch">
            {user ? <Watch /> : <Redirect to="/register" />}
          </Route>
          <Route path="/login">{!user ? <Login /> : <Redirect to="/" />}</Route>
          <Route path="/register">
            {!user ? <Register /> : <Redirect to="/" />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
