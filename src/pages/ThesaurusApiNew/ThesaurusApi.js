import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ThesaurusApi.scss";
import AdverbSyn from "../../components/Adverb/AdverbSyn";
import AdverbDef from "../../components/Adverb/AdverbDef";
import AdjectiveSyn from "../../components/Adjective/AdjectiveSyn";
import AdjectiveDef from "../../components/Adjective/AdjectiveDef";
import NounSyn from "../../components/Noun/NounSyn";
import NounDef from "../../components/Noun/NounDef";
import VerbSyn from "../../components/Verb/VerbSyn";
import VerbDef from "../../components/Verb/VerbDef";
import ConjunctionSyn from "../../components/Conjunction/ConjunctionSyn";
import ConjunctionDef from "../../components/Conjunction/ConjunctionDef";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchWord]);

  // console.log(id);

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
          // Console log all data for searched word
          console.log(response.data);

          // response.data.forEach((element) => {
          //   console.log(element.meta.syns);
          // });

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
          // If word doesn't exist it contains no "meta" in result and set data to wordList and reset setData to empty since word does not exist
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

  // Search word on handle change making it more dynamic
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
          <span className="label">What's Another Word For...</span>
          <span className="focus-bg"></span>
        </label>
      </div>

      {/*--------------------- RESULTS SECTION ----------------------------- */}
      {data
        ? data && (
            // IF WORD EXISTS
            <div className="displayResults">
              {/* SEARCHED WORD */}
              <h3 className="displayResults__word">{data[0].meta.id} </h3>
              {/*--------------------- SYNONYMS SECTION ---------------------------- */}
              {/* MAP SYNONYMS ARRAY */}

              {/* ADVERB (IF EXISTS) */}
              {adverbWord && <AdverbSyn adverbWord={adverbWord} />}

              {/* ADJECTIVE (IF EXISTS) */}
              {adjWord && <AdjectiveSyn adjWord={adjWord} />}

              {/* NOUN (IF EXISTS) */}
              {nounWord && <NounSyn nounWord={nounWord} />}

              {/* VERB (IF EXISTS) */}
              {verbWord && <VerbSyn verbWord={verbWord} />}

              {/* CONJUNCTION (IF EXISTS) */}
              {conjWord && <ConjunctionSyn conjWord={conjWord} />}

              {/*--------------------- DEFINITIONS SECTION ---------------------------- */}
              <section className="displayResults__definitions">
                {/* DEFINITIONS */}
                <h1 className="displayResults__header2">Definitions</h1>

                {/* ADVERB (IF EXISTS) */}
                {adverbWord && <AdverbDef adverbWord={adverbWord} />}

                {/* ADJECTIVE (IF EXISTS) */}
                {adjWord && <AdjectiveDef adjWord={adjWord} />}

                {/* NOUN (IF EXISTS) */}
                {nounWord && <NounDef nounWord={nounWord} />}

                {/* VERB (IF EXISTS) */}
                {verbWord && <VerbDef verbWord={verbWord} />}

                {/* CONJUNCTION (IF EXISTS) */}
                {conjWord && <ConjunctionDef conjWord={conjWord} />}
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
                  <Link className="otherResults__link" to={word}>
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
