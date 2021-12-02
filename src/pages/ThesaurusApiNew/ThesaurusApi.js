import { React, useState } from "react";
// import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Axios from "axios";
import "./ThesaurusApi.scss";

function ThesaurusApi(props) {
  // const { id } = useParams();
  // console.log(id);
  // Use react hook 'useState' to set up initial state
  const [data, setData] = useState("");
  const [wordList, setWordList] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [notFound, setNotFound] = useState("");

  const apiKey = "4a7d190a-e6c6-4c00-b595-a957035618a5";
  const apiURL = `
  https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${searchWord}?key=${apiKey}`;

  // Function to fetch information on button
  // click, and set the data accordingly
  const getSynonym = (e) => {
    Axios.get(apiURL).then((response) => {
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

        setNotFound("blue");

        setData(response.data);
      } else {
        // console.log(response.data);
        setWordList(response.data);
        setNotFound("red");
      }
    });
  };

  const refreshPage = () => {
    window.location.reload();
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
      {/* HEADER */}
      <h1 className="thes__header" onClick={refreshPage}>
        Synonyms
      </h1>

      {/* SEARCH SECTION */}
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
        {/* <button className="thes__button" type="submit">
          Reset
        </button> */}
      </div>

      {/* RESULTS SECTION */}

      {data
        ? data && (
            <div className="displayResults">
              {/* MAP SYNONYMS ARRAY */}
              <ul className="displayResults__synonyms">
                {wordList.map((synonym, i) => (
                  <Link
                    className="displayResults__link"
                    // onClick={getSynonym}
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
                {/* SEARCHED WORD */}
                <h2 className="displayResults__word">{data[0].meta.id} </h2>

                {/* DEFINITIONS */}
                <h1 className="displayResults__header2">Definitions</h1>

                <article className="displayResults__typeResults">
                  <p className="displayResults__typeOf">{data[0].fl}</p>

                  <section className="displayResults__typeDef">
                    <ol className="displayResults__shortDef">
                      {data[0].shortdef.map((def, i) => (
                        <li className="displayResults__define-result" key={i}>
                          {def}
                        </li>
                      ))}
                    </ol>
                  </section>
                </article>
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
