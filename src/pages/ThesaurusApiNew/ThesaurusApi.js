import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ThesaurusApi.scss";

function ThesaurusApi(props) {
  let { id } = useParams();
  // console.log(id);

  // Use react hook 'useState' to set up initial state for searched word
  const [data, setData] = useState("");
  const [wordList, setWordList] = useState("");
  const [searchWord, setSearchWord] = useState("");

  // Use react hook "useState" to set up initial state for parts of speech
  const [adjWord, setAdjWord] = useState("");
  const [nounWord, setNounWord] = useState("");
  const [adverbWord, setAdverbWord] = useState("");
  const [verbWord, setVerbWord] = useState("");

  // const getWord = () => {
  //   axios.get(
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

  // API KEY and URL
  const apiKey = "4a7d190a-e6c6-4c00-b595-a957035618a5";
  const apiURL = `
  https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${searchWord}?key=${apiKey}`;

  // Function to fetch information on search and set data accordingly
  const getSynonym = () => {
    // Reset all states and input field
    setData("");
    setAdjWord("");
    setNounWord("");
    setAdverbWord("");
    setVerbWord("");
    resetInputField();

    // AXIOS API CALL
    axios
      .get(apiURL)
      .then((response) => {
        // If word exists then it contains a "meta" value
        if (response.data[0].meta) {
          // Console log all data for searched word
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

          // Filtering through result to find if each has...
          // ADJECTIVES
          const adjective = response.data.filter(function (speech) {
            return speech.fl === "adjective";
          });
          // NOUNS
          const noun = response.data.filter(function (speech) {
            return speech.fl === "noun";
          });
          // ADVERBS
          const adverb = response.data.filter(function (speech) {
            return speech.fl === "adverb";
          });
          // VERBS
          const verb = response.data.filter(function (speech) {
            return speech.fl === "verb";
          });

          // Check to see if specific word has the following parts of speech and set variable to set state for...
          // ADJECTIVE
          if (adjective.length > 0) {
            const adjWord = adjective;
            setAdjWord(adjWord);
          }
          // NOUN
          if (noun.length > 0) {
            const nounWord = noun;
            setNounWord(nounWord);
          }
          // ADVERB
          if (adverb.length > 0) {
            const adverbWord = adverb;
            setAdverbWord(adverbWord);
          }
          // VERB
          if (verb.length > 0) {
            const verbWord = verb;
            setVerbWord(verbWord);
          }

          // If word exists set data
          setData(response.data);
        } else {
          // If word doesn't exist it contains no "meta" in result and set data to word list
          setWordList(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Refresh page function
  const refreshPage = () => {
    window.location.reload();
  };

  // Search word on handle change
  const handleChange = (e) => {
    setSearchWord(e.target.value);
  };

  // Search is triggered by the enter key and clears input field (only if there are values)
  const handleKeypress = (e) => {
    var key = e.keyCode || e.which;
    if (key === 13 && searchWord) {
      getSynonym();
      resetInputField();
    }
  };

  // Reset input field function
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
            name="search"
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
      </div>

      {/* RESULTS SECTION */}
      {data
        ? data && (
            // IF WORD EXISTS
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

                {/* ADJECTIVE (IF EXISTS) */}
                {adjWord && (
                  <article className="displayResults__typeResults">
                    <p className="displayResults__typeOf">{adjWord[0].fl}</p>

                    {/* MAP SHORT DEFINITIONS */}
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

                {/* NOUN (IF EXISTS) */}
                {nounWord && (
                  <article className="displayResults__typeResults">
                    <p className="displayResults__typeOf">{nounWord[0].fl}</p>

                    {/* MAP SHORT DEFINITIONS */}
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

                {/* ADVERB (IF EXISTS) */}
                {adverbWord && (
                  <article className="displayResults__typeResults">
                    <p className="displayResults__typeOf">{adverbWord[0].fl}</p>

                    {/* MAP SHORT DEFINITIONS */}
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

                {/* VERB (IF EXISTS) */}
                {verbWord && (
                  <article className="displayResults__typeResults">
                    <p className="displayResults__typeOf">{verbWord[0].fl}</p>

                    {/* MAP SHORT DEFINITIONS */}
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
            // WORD DOES NOT EXIST
            <div className="otherResults">
              <p className="otherResults__notFound">Did you mean:</p>

              {/* MAP SUGGESTED WORDS */}
              <ul className="otherResults__notWordList">
                {wordList.map((word, i) => (
                  <Link to={word}>
                    <li className="otherResults__notWord" key={i}>
                      {word}
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
