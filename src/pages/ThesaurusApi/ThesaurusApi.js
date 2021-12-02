import { React, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Axios from "axios";
import "./ThesaurusApi.scss";

function ThesaurusApi(props) {
  const { id } = useParams();
  console.log(id);
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
        // console.log(response.data[0].meta);
        // console.log(response.data[0].meta.id);
        // console.log(response.data[0].meta.shortdef);
        // console.log(response.data[0].meta.syns);

        // console.log(response.data[0].def[0].sseq[0].dt[1].t[0]);

        const synonymList = response.data[0].meta.syns;

        console.log(synonymList);

        const syn1 = response.data[0].meta.syns[0];
        const syn2 = response.data[0].meta.syns[1];

        const synList = syn1;

        if (synonymList.length === 1) {
          setWordList(synList);
        } else {
          let synList = [...syn1, ...syn2];
          setWordList(synList);
        }

        // let wordList =

        // let verbList =

        // console.log(synList);
        // console.log(response.data[0].shortdef);

        // console.log(wordList[0]);

        // setWordList(synList);
        setNotFound("blue");

        setData(response.data);
      } else {
        console.log(response.data);
        setWordList(response.data);
        setNotFound("red");
      }
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
      {/* HEADER */}
      <h1 className="thes__header">Synonyms</h1>

      {/* SEARCH SECTION */}
      <div className="thes__search">
        <label htmlFor="inp" className="inp">
          <input
            type="text"
            placeholder="&nbsp;"
            onChange={handleChange}
            onKeyPress={handleKeypress}
            // onClick={window.location.reload(true)}
          />
          <span className="label">Whats Another Word For...</span>
          <span className="focus-bg"></span>
        </label>

        <button className="thes__button" onClick={getSynonym} type="submit">
          SEARCH
        </button>
      </div>

      {/* RESULTS SECTION */}

      {data
        ? data && (
            <div className="thes__displayResults">
              {/* MAP SYNONYMS ARRAY */}
              <ul className="thes__synonyms">
                {wordList.map((synonym, i) => (
                  <Link to={synonym}>
                    <li className="thes__synonym" key={i}>
                      {synonym}
                    </li>
                  </Link>
                ))}
              </ul>

              {/* OTHER RESULTS */}
              <section className="thes__otherResults">
                {/* SEARCHED WORD */}
                <h2 className="thes__word">{data[0].meta.id} </h2>

                {/* DEFINITIONS */}
                <h1 className="thes__header2">Definitions</h1>

                <article className="thes__typeResults">
                  <p className="thes__typeOf">{data[0].fl}</p>

                  <section className="thes__typeDef">
                    <ol className="thes__shortDef">
                      {data[0].shortdef.map((def, i) => (
                        <li className="thes__define-result" key={i}>
                          {def}
                        </li>
                      ))}
                    </ol>

                    {/* <q className="thes__example">{data[0].def.sseq[0].dt[1]}</q> */}
                  </section>
                </article>

                <article className="thes__typeResults">
                  <p className="thes__typeOf">{data[1].fl}</p>

                  <section className="thes__typeDef">
                    <ol className="thes__shortDef">
                      {data[1].shortdef.map((def, i) => (
                        <li className="thes__define-result" key={i}>
                          {def}
                        </li>
                      ))}
                    </ol>

                    {/* <q className="thes__example">
                      {data.meanings[1].definitions[0].example}
                    </q> */}
                  </section>
                </article>
                <article className="thes__typeResults">
                  <p className="thes__typeOf">{data[2].fl}</p>

                  <section className="thes__typeDef">
                    <ol className="thes__shortDef">
                      {data[2].shortdef.map((def, i) => (
                        <li className="thes__define-result" key={i}>
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
            <div>
              <div className={notFound}>
                <p className="thes__notFound">Did you mean:</p>
              </div>

              <ul className="thes__notWordList">
                {wordList.map((synonym, i) => (
                  <Link to={synonym}>
                    <li className="thes__notWord" key={i}>
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
