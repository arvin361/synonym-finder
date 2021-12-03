import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Axios from "axios";
import "./ThesaurusApi.scss";

function ThesaurusApi(props) {
  let { id } = useParams();
  // console.log(id);

  // Use react hook 'useState' to set up initial state
  const [data, setData] = useState("");
  const [wordList, setWordList] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [notFound, setNotFound] = useState("");

  // Use hooks to initalize parts of speech
  const [adjWord, setAdjWord] = useState("");
  const [nounWord, setNounWord] = useState("");
  const [adverbWord, setAdverbWord] = useState("");
  const [verbWord, setVerbWord] = useState("");

  // const getWord = () => {
  //   Axios.get(
  //     `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${id}?key=${apiKey}`
  //   )
  //     .then((response) => {
  //       setSearchWord(response.data[0].meta);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  useEffect(() => {
    setSearchWord();
  }, [id]);

  // API KEY AND URL
  const apiKey = "4a7d190a-e6c6-4c00-b595-a957035618a5";
  const apiURL = `
  https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${searchWord}?key=${apiKey}`;

  // Function to fetch information on search and set data accordingly
  const getSynonym = () => {
    setData("");
    resetInputField();
    Axios.get(apiURL)
      .then((response) => {
        if (response.data[0].meta) {
          console.log(response.data);

          const synonymList = response.data[0].meta.syns;

          console.log(synonymList);

          const syns1 = response.data[0].meta.syns[0];
          const syns2 = response.data[0].meta.syns[1];
          const syns3 = response.data[0].meta.syns[2];

          const synList = syns1;

          if (synonymList.length === 1) {
            setWordList(synList);
          } else {
            let synList = [...syns1, ...syns2, ...syns3];
            setWordList(synList);
          }

          console.log(synList);

          const adjective = response.data.filter(function (speech) {
            return speech.fl === "adjective";
          });
          const noun = response.data.filter(function (speech) {
            return speech.fl === "noun";
          });
          const adverb = response.data.filter(function (speech) {
            return speech.fl === "adverb";
          });
          const verb = response.data.filter(function (speech) {
            return speech.fl === "verb";
          });

          // console.log(adjective);
          // console.log(noun);
          // console.log(verb);

          if (adjective.length > 0) {
            const adjWord = adjective;
            setAdjWord(adjWord);
          }
          // console.log(adjWord[0].fl);
          // console.log(adjWord[0].shortdef[0]);

          if (noun.length > 0) {
            const nounWord = noun;
            setNounWord(nounWord);
          }

          if (adverb.length > 0) {
            const adverbWord = adverb;
            setAdverbWord(adverbWord);
          }

          if (verb.length > 0) {
            const verbWord = verb;
            setVerbWord(verbWord);
          }

          setNotFound("blue");

          setData(response.data);
        } else {
          // console.log(response.data);
          setWordList(response.data);
          setNotFound("red");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Refresh page in order to avoid false words being true
  const refreshPage = () => {
    window.location.reload();
  };

  // Search word on change
  const handleChange = (e) => {
    setSearchWord(e.target.value);
  };

  // Function that triggers by pressing the enter key
  const handleKeypress = (e) => {
    var key = e.keyCode || e.which;
    if (key === 13 && searchWord) {
      getSynonym();
      resetInputField();
    }
  };

  // Reset Input Field handler
  const resetInputField = () => {
    setSearchWord("");
  };

  return (
    <div className="thes">
      {/* HEADER */}
      <h1 className="thes__header" onClick={refreshPage}>
        Synonyms
      </h1>

      {/* SEARCH SECTION */}
      <div className="thes__search">
        <label htmlFor="inp" className="inp">
          <input
            type="text"
            value={searchWord}
            placeholder="&nbsp;"
            onChange={handleChange}
            onKeyPress={handleKeypress}
          />
          <span className="label">Whats Another Word For...</span>
          <span className="focus-bg"></span>
        </label>

        <button
          disabled={!searchWord}
          className="thes__button"
          onClick={getSynonym}
          type="submit"
        >
          SEARCH
        </button>
        {/* <button className="thes__button" type="submit">
          Reset
        </button> */}
      </div>

      {/* RESULTS SECTION */}

      {data
        ? data && (
            <div className="displayResults">
              {/* SEARCHED WORD */}
              <h3 className="displayResults__word">{data[0].meta.id} </h3>
              {/* MAP SYNONYMS ARRAY */}
              <ul className="displayResults__synonyms">
                {wordList.map((synonym, i) => (
                  <Link
                    className="displayResults__link"
                    // onClick={getSynonym(pathname)}
                    to={synonym}
                  >
                    <li className="displayResults__synonym" key={i}>
                      {synonym}
                    </li>
                  </Link>
                ))}
              </ul>

              {/* DEFINITIONS RESULTS */}
              <section className="displayResults__definitions">
                {/* DEFINITIONS */}
                <h1 className="displayResults__header2">Definitions</h1>

                {/* ADJECTIVE */}
                {adjWord && (
                  <article className="displayResults__typeResults">
                    <p className="displayResults__typeOf">{adjWord[0].fl}</p>

                    <section className="displayResults__typeDef">
                      <ol className="displayResults__shortDef">
                        {adjWord[0].shortdef.map((def, i) => (
                          <li className="displayResults__define-result" key={i}>
                            {def}
                          </li>
                        ))}
                      </ol>
                    </section>
                  </article>
                )}

                {nounWord && (
                  <article className="displayResults__typeResults">
                    <p className="displayResults__typeOf">{nounWord[0].fl}</p>

                    <section className="displayResults__typeDef">
                      <ol className="displayResults__shortDef">
                        {nounWord[0].shortdef.map((def, i) => (
                          <li className="displayResults__define-result" key={i}>
                            {def}
                          </li>
                        ))}
                      </ol>
                    </section>
                  </article>
                )}

                {adverbWord && (
                  <article className="displayResults__typeResults">
                    <p className="displayResults__typeOf">{adverbWord[0].fl}</p>

                    <section className="displayResults__typeDef">
                      <ol className="displayResults__shortDef">
                        {adverbWord[0].shortdef.map((def, i) => (
                          <li className="displayResults__define-result" key={i}>
                            {def}
                          </li>
                        ))}
                      </ol>
                    </section>
                  </article>
                )}

                {verbWord && (
                  <article className="displayResults__typeResults">
                    <p className="displayResults__typeOf">{verbWord[0].fl}</p>

                    <section className="displayResults__typeDef">
                      <ol className="displayResults__shortDef">
                        {verbWord[0].shortdef.map((def, i) => (
                          <li className="displayResults__define-result" key={i}>
                            {def}
                          </li>
                        ))}
                      </ol>
                    </section>
                  </article>
                )}
              </section>
            </div>
          )
        : wordList && (
            <div className="otherResults">
              <div className={notFound}>
                <p className="otherResults__notFound">Did you mean:</p>
              </div>

              <ul className="otherResults__notWordList">
                {wordList.map((synonym, i) => (
                  <Link to={synonym}>
                    <li className="otherResults__notWord" key={i}>
                      {synonym}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          )}
    </div>
  );
}

export default ThesaurusApi;
