import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SynonymFinder from "../src/pages/SynonymFinder/SynonymFinder";
import "./App.scss";

function App() {
  return (
    <Router>
      <Switch>
        <Route component={SynonymFinder} path="/" exact />
        <Route component={SynonymFinder} path="/index.html" />
        <Route component={SynonymFinder} path="/:id" />
      </Switch>
    </Router>
  );
}

export default App;
