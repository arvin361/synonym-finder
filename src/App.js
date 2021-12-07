import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ThesaurusApi from "../src/pages/ThesaurusApiNew/ThesaurusApi";
import "./App.scss";

function App() {
  return (
    <Router>
      <Switch>
        {/* <ThesaurusApi /> */}
        <Route component={ThesaurusApi} path="/" exact />
        <Route component={ThesaurusApi} path="/:id" />
      </Switch>
    </Router>
  );
}

export default App;
