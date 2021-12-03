import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ThesaurusApi from "../src/pages/ThesaurusApiNew/ThesaurusApi";
import "./App.scss";

function App() {
  return (
    <Router>
      <Switch>
        <ThesaurusApi />

        {/* <Route path="/:id">
          <ThesaurusApi />
        </Route> */}

        {/* <Route component={<ThesaurusApi />} /> */}
      </Switch>
    </Router>
  );
}

export default App;
