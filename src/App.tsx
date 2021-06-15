import { Switch, Route, Redirect } from "react-router-dom";
import { Home } from "./pages/home";

const App = () => {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Redirect to="/" />
    </Switch>
  );
};

export default App;
