import {
  Redirect,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import Signup from "./pages/Signup";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  return (
    <>
      <Switch>
        <Route path="/" exact>
          {loggedIn ? <Redirect to="/inbox" /> : <Redirect to="/login" />}
        </Route>
        <Route path="/compose-email" exact>
          {loggedIn ? <Home /> : <Redirect to="/login" />}
        </Route>
        <Route path="/inbox" exact>
          {loggedIn ? <Home /> : <Redirect to="/login" />}
        </Route>
        <Route path="/sent" exact>
          {loggedIn ? <Home /> : <Redirect to="/login" />}
        </Route>
        <Route path="/archive" exact>
          {loggedIn ? <Home /> : <Redirect to="/login" />}
        </Route>
        <Route path="/spam" exact>
          {loggedIn ? <Home /> : <Redirect to="/login" />}
        </Route>
        <Route path="/trash" exact>
          {loggedIn ? <Home /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login" exact>
          {!loggedIn ? <Login /> : <Redirect to="/inbox" />}
        </Route>
        <Route path="/signup" exact>
          {!loggedIn ? <Signup /> : <Redirect to="/inbox" />}
        </Route>
      </Switch>
    </>
  );
}

export default App;
