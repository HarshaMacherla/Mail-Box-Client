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
          {loggedIn ? <Home /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login" exact>
          {!loggedIn ? <Login /> : <Redirect to="/" />}
        </Route>
        <Route path="/signup" exact>
          {!loggedIn ? <Signup /> : <Redirect to="/" />}
        </Route>
      </Switch>
    </>
  );
}

export default App;
