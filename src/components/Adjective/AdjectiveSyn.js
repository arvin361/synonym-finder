import React from "react";
import { Link } from "react-router-dom";

export default function AdjectiveSyn(props) {
  return (
    <article>
      <p className="displayResults__typeOfSyn">{props.adjWord[0].fl}</p>

      {/* MAP SYNONYMS */}
      <ul className="displayResults__synonyms">
        {props.adjWord[0].meta.syns[0].map((synonym, i) => (
          <Link className="displayResults__link" to={synonym} key={i}>
            <li className="displayResults__synonym">{synonym}</li>
          </Link>
        ))}
      </ul>
    </article>
  );
}
