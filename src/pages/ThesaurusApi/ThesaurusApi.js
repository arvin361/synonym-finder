import { React, useState } from "react";
import Axios from "axios";
import "./ThesaurusApi.scss";

function ThesaurusApi() {
  // Use react hook 'useState' to set up initial state
  const [data, setData] = useState("");
  const [searchWord, setSearchWord] = useState("");

  const apiURL = `
  https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${searchWord}?key=4a7d190a-e6c6-4c00-b595-a957035618a5`;

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

  return (
    <div className="thes">
      <h1 className="thes__header">Synonyms</h1>
      <div className="thes__search">
        <label htmlFor="inp" className="inp">
          <input
            type="text"
            placeholder="&nbsp;"
            onChange={handleChange}
            onKeyPress={handleKeypress}
          />
          <span className="label">Whats Another Word For...</span>
          <span className="focus-bg"></span>
        </label>

        <button className="thes__button" onClick={getSynonym} type="submit">
          SEARCH
        </button>
      </div>

      {data && (
        <div className="thes__displayResults">
          <h2 className="thes__word">{console.log(data.meta[0].id)} </h2>
          <h4 className="thes__subtitle">Synonyms:</h4>
          <ul>
            {data.meanings[1].definitions[0].synonyms.map((synonym, i) => (
              <li className="thes__synonym" key={i}>
                {synonym}
              </li>
            ))}
          </ul>
          <h4 className="thes__subtitle">Definition:</h4>
          <p>{data.meanings[0].definitions[0].definition}</p>
          <h4 className="thes__subtitle">Parts of speech:</h4>
          <p>{data.meanings[0].partOfSpeech}</p>
          <h4 className="thes__subtitle">Example:</h4>
          <p>{data.meanings[0].definitions[0].example}</p>
          {console.log(data.meanings[1].definitions[0].synonyms)}
          {/* <p>{data.meanings[1].definitions[0].synonyms}</p> */}
          {/* {data.meanings[1].definitions[0].synonyms}.map{} */}
        </div>
      )}
    </div>
  );
}

export default ThesaurusApi;
