import React from "react";
import { Link } from "react-router-dom";

export default function AdverbSyn(props) {
  return (
    <article>
      <p className="displayResults__typeOfSyn">{props.adverbWord[0].fl}</p>

      {/* MAP SYNONYMS */}
      <ul className="displayResults__synonyms">
        {props.adverbWord[0].meta.syns[0].map((synonym, i) => (
          <Link className="displayResults__link" to={synonym}>
            <li className="displayResults__synonym" key={i}>
              {synonym}
            </li>
          </Link>
        ))}
      </ul>
    </article>
  );
}
