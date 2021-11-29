import { React, useState } from "react";
import Axios from "axios";
import "./App.scss";

function App() {
  // Use react hook 'useState' to set up initial state
  const [data, setData] = useState("");
  const [searchWord, setSearchWord] = useState("");

  const apiURL = `https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}`;

  // Function to fetch information on button
  // click, and set the data accordingly
  const getSynonym = (e) => {
    Axios.get(apiURL).then((response) => {
      setData(response.data[0]);
    });
  };

  const handleChange = (e) => {
    setSearchWord(e.target.value);
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    var key = e.keyCode || e.which;
    if (key === 13) {
      getSynonym();
    }
  };

  // const Synonym = ({ searchWord }) => <li>{searchWord}</li>;

  return (
    <div className="page">
      <h1 className="page__header">Synonyms</h1>
      <div className="page__search">
        <label for="inp" className="inp">
          <input
            type="text"
            placeholder="&nbsp;"
            onChange={handleChange}
            onKeyPress={handleKeypress}
          />
          <span className="label">Whats Another Word For...</span>
          <span className="focus-bg"></span>
        </label>

        <button className="page__button" onClick={getSynonym} type="submit">
          GO
        </button>
      </div>

      {data && (
        <div className="page__displayResults">
          <h2 className="page__word">{data.word} </h2>
          <h4 className="page__subtitle">Synonyms:</h4>
          <ul>
            {data.meanings[1].definitions[0].synonyms.map((synonym, i) => (
              <li className="page__synonym" key={i}>
                {synonym}
              </li>
            ))}
          </ul>
          <h4 className="page__subtitle">Definition:</h4>
          <p>{data.meanings[0].definitions[0].definition}</p>
          <h4 className="page__subtitle">Parts of speech:</h4>
          <p>{data.meanings[0].partOfSpeech}</p>
          <h4 className="page__subtitle">Example:</h4>
          <p>{data.meanings[0].definitions[0].example}</p>
          {console.log(data.meanings[1].definitions[0].synonyms)}
          {/* <p>{data.meanings[1].definitions[0].synonyms}</p> */}
          {/* {data.meanings[1].definitions[0].synonyms}.map{} */}

          {/* <ul>
            {data.meanings[1].definitions[0].synonyms.map((searchWord, i) => (
              <Synonym query={searchWord} key={i} />
            ))}
          </ul> */}
        </div>
      )}
    </div>
  );
}

export default App;
