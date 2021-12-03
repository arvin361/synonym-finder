import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ThesaurusApi from "../src/pages/ThesaurusApiNew/ThesaurusApi";
import "./App.scss";

function App() {
  return (
    <Router>
      {/* <Switch> */}
      {/* <ThesaurusApi /> */}

      <Route>
        {/* <ThesaurusApi /> */}

        {/* <ThesaurusApi path="/" exact /> */}
        <ThesaurusApi path="/:id" />
      </Route>

      {/* <Route component={<ThesaurusApi />} /> */}
      {/* <Route component={<ThesaurusApi />} path="/" exact /> */}
      {/* </Switch> */}
    </Router>
  );
}

export default App;
