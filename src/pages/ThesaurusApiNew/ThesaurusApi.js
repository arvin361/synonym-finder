import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ThesaurusApi.scss";

function ThesaurusApi(props) {
  const { id } = useParams();

  // Use react hook 'useState' to set up initial state for searched word
  const [data, setData] = useState("");
  const [wordList, setWordList] = useState("");
  const [searchWord, setSearchWord] = useState("");

  // Use react hook "useState" to set up initial state for parts of speech
  const [adjWord, setAdjWord] = useState("");
  const [nounWord, setNounWord] = useState("");
  const [adverbWord, setAdverbWord] = useState("");
  const [verbWord, setVerbWord] = useState("");
  const [conjWord, setConjWord] = useState("");

  useEffect(() => {
    setSearchWord(id);
  }, [id]);

  useEffect(() => {
    getSynonym();
  }, [searchWord]);

  console.log(id);

  // API KEY and URL
  const apiKey = "4a7d190a-e6c6-4c00-b595-a957035618a5";
  const apiURL = `
  https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${searchWord}?key=${apiKey}`;

  // Function to fetch information on search and set data accordingly
  const getSynonym = () => {
    if (!searchWord) {
      return;
    }

    // Reset all states accordingly
    setAdjWord("");
    setNounWord("");
    setAdverbWord("");
    setVerbWord("");
    setConjWord("");

    // AXIOS GET API CALL
    axios
      .get(apiURL)
      .then((response) => {
        // If word exists then it contains a "meta" value
        if (response.data[0].meta) {
          // Set response.data to variable rd
          const rd = response.data;

          // Console log all data for searched word
          console.log(rd);

          const synonymList = rd[0].meta.syns;

          console.log(synonymList);

          const syns1 = response.data[0].meta.syns[0];
          const syns2 = response.data[0].meta.syns[1];

          response.data.forEach((element) => {
            console.log(element.meta.syns);
          });

          console.log(response.data[0]);

          const synList = syns1;

          if (synonymList.length === 1) {
            setWordList(synList);
          } else {
            let synList = [...syns1, ...syns2];
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
          // CONJUCTIONS
          const conjunction = response.data.filter(function (speech) {
            return speech.fl === "conjunction";
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
            console.log(nounWord);
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

          // CONJUNCTION
          if (conjunction.length > 0) {
            const conjWord = conjunction;
            setConjWord(conjWord);
          }

          // If word exists set data
          setData(response.data);
        } else {
          // If word doesn't exist it contains no "meta" in result and set data to word list
          setData("");
          setWordList(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /*--------------------- FUNCTIONS ----------------------------------- */

  // Refresh page and go to home function
  const refreshPage = () => {
    window.location.replace("/index.html");
  };

  // Search word on handle change
  const handleChange = (e) => {
    setSearchWord(e.target.value);
  };

  // Reset input field on click function
  const reset = () => {
    setSearchWord("");
  };

  /*--------------------- RETURN ----------------------------------- */

  return (
    <div className="thes">
      {/* HEADER */}
      <Link
        className="thes__header--link"
        to="/index.html"
        onClick={refreshPage}
      >
        <h1 className="thes__header">Synonyms</h1>
      </Link>

      {/*--------------------- SEARCH SECTION ----------------------------- */}
      <div className="thes__search">
        <label htmlFor="inp" className="inp">
          <input
            name="search"
            type="text"
            value={searchWord}
            placeholder="&nbsp;"
            onChange={handleChange}
            onClick={reset}
          />
          <span className="label">Whats Another Word For...</span>
          <span className="focus-bg"></span>
        </label>
      </div>

      {/*--------------------- RESULTS SECTION ----------------------------- */}
      {data
        ? data && (
            // IF WORD EXISTS
            <div className="displayResults">
              {/* SEARCHED WORD */}
              {/*--------------------- SYNONYMS SECTION ---------------------------- */}
              {/* MAP SYNONYMS ARRAY */}

              {/* ADVERB (IF EXISTS) */}
              {adverbWord && (
                <article>
                  <p className="displayResults__typeOfSyn">
                    {adverbWord[0].fl}
                  </p>

                  {/* MAP SYNONYMS */}
                  <ul className="displayResults__synonyms">
                    {adverbWord[0].meta.syns[0].map((synonym, i) => (
                      <Link className="displayResults__link" to={synonym}>
                        <li className="displayResults__synonym" key={i}>
                          {synonym}
                        </li>
                      </Link>
                    ))}
                  </ul>
                </article>
              )}

              {/* ADJECTIVE (IF EXISTS) */}
              {adjWord && (
                <article>
                  <p className="displayResults__typeOfSyn">{adjWord[0].fl}</p>

                  {/* MAP SYNONYMS */}
                  <ul className="displayResults__synonyms">
                    {adjWord[0].meta.syns[0].map((synonym, i) => (
                      <Link className="displayResults__link" to={synonym}>
                        <li className="displayResults__synonym" key={i}>
                          {synonym}
                        </li>
                      </Link>
                    ))}
                  </ul>
                </article>
              )}

              {/* NOUN (IF EXISTS) */}
              {nounWord && (
                <article>
                  <p className="displayResults__typeOfSyn">{nounWord[0].fl}</p>

                  {/* MAP SYNONYMS */}
                  <ul className="displayResults__synonyms">
                    {nounWord[0].meta.syns[0].map((synonym, i) => (
                      <Link className="displayResults__link" to={synonym}>
                        <li className="displayResults__synonym" key={i}>
                          {synonym}
                        </li>
                      </Link>
                    ))}
                  </ul>
                </article>
              )}

              {/* VERB (IF EXISTS) */}
              {verbWord && (
                <article>
                  <p className="displayResults__typeOfSyn">{verbWord[0].fl}</p>

                  {/* MAP SYNONYMS */}
                  <ul className="displayResults__synonyms">
                    {verbWord[0].meta.syns[0].map((synonym, i) => (
                      <Link className="displayResults__link" to={synonym}>
                        <li className="displayResults__synonym" key={i}>
                          {synonym}
                        </li>
                      </Link>
                    ))}
                  </ul>
                </article>
              )}

              {/* CONJUNCTION (IF EXISTS) */}
              {conjWord && (
                <article>
                  <p className="displayResults__typeOfSyn">{conjWord[0].fl}</p>

                  {/* MAP SYNONYMS */}
                  <ul className="displayResults__synonyms">
                    {conjWord[0].meta.syns[0].map((synonym, i) => (
                      <Link className="displayResults__link" to={synonym}>
                        <li className="displayResults__synonym" key={i}>
                          {synonym}
                        </li>
                      </Link>
                    ))}
                  </ul>
                </article>
              )}

              {/*--------------------- DEFINITIONS SECTION ---------------------------- */}
              <section className="displayResults__definitions">
                {/* DEFINITIONS */}
                <h1 className="displayResults__header2">Definitions</h1>

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

                {/* CONJUNCTION (IF EXISTS) */}
                {conjWord && (
                  <article className="displayResults__typeResults">
                    <p className="displayResults__typeOf">{conjWord[0].fl}</p>

                    {/* MAP SHORT DEFINITIONS */}
                    <section className="displayResults__typeDef">
                      <ol className="displayResults__shortDef">
                        {conjWord[0].shortdef.map((def, i) => (
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
