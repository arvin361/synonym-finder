import React from "react";
import { Link } from "react-router-dom";

export default function OtherResults(props) {
  return (
    <article className="otherResults">
      <p className="otherResults__notFound">Did you mean:</p>

      {/* MAP SUGGESTED WORDS */}
      <ul className="otherResults__notWordList">
        {props.wordList.map((word, i) => (
          <Link className="otherResults__link" to={word} key={i}>
            <li className="otherResults__notWord">{word}</li>
          </Link>
        ))}
      </ul>
    </article>
  );
}
