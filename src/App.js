import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ThesaurusApi from "../src/pages/ThesaurusApiNew/ThesaurusApi";
import "./App.scss";

function App() {
  return (
    <Router>
      <ThesaurusApi />
    </Router>
  );
}

export default App;
