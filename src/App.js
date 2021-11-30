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

  return (
    <div className="page">
      {/* HEADER */}
      <h1 className="page__header">Synonyms</h1>

      {/* SEARCH SECTION */}
      <div className="page__search">
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

        <button className="page__button" onClick={getSynonym} type="submit">
          SEARCH
        </button>
      </div>

      {/* RESULTS SECTION */}
      {data && (
        <div className="page__displayResults">
          {/* MAP SYNONYMS ARRAY */}
          <ul className="page__synonyms">
            {data.meanings[0].definitions[0].synonyms.map((synonym, i) => (
              <li className="page__synonym" key={i}>
                {synonym}
              </li>
            ))}
            {data.meanings[1].definitions[0].synonyms.map((synonym, i) => (
              <li className="page__synonym" key={i}>
                {synonym}
              </li>
            ))}
          </ul>

          {/* OTHER RESULTS */}
          <section className="page__otherResults">
            {/* SEARCHED WORD */}
            <h2 className="page__word">{data.word} </h2>

            {/* DEFINITIONS */}
            <h1 className="page__header2">Definitions</h1>

            <article className="page__typeResults">
              <p className="page__typeOf">{data.meanings[0].partOfSpeech}</p>

              <section className="page__typeDef">
                <p className="page__define-result">
                  {data.meanings[0].definitions[0].definition}
                </p>

                <q className="page__example">
                  {data.meanings[0].definitions[0].example}
                </q>
              </section>
            </article>

            <article className="page__typeResults">
              <p className="page__typeOf">{data.meanings[1].partOfSpeech}</p>

              <section className="page__typeDef">
                <p className="page__define-result">
                  {data.meanings[1].definitions[0].definition}
                </p>

                <q className="page__example">
                  {data.meanings[1].definitions[0].example}
                </q>
              </section>
            </article>
            <article className="page__typeResults">
              <p className="page__typeOf">{data.meanings[2].partOfSpeech}</p>

              <section className="page__typeDef">
                <p className="page__define-result">
                  {data.meanings[2].definitions[0].definition}
                </p>

                <q className="page__example">
                  {data.meanings[2].definitions[0].example}
                </q>
              </section>
            </article>
          </section>

          {console.log(data.meanings[0].definitions[0].synonyms)}
          {console.log(data.meanings[1].definitions[0].synonyms)}
        </div>
      )}
    </div>
  );
}

export default App;
