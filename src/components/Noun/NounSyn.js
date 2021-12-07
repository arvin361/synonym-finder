import React from "react";
import { Link } from "react-router-dom";

export default function NounSyn(props) {
  return (
    <article>
      <p className="displayResults__typeOfSyn">{props.nounWord[0].fl}</p>

      {/* MAP SYNONYMS */}
      <ul className="displayResults__synonyms">
        {props.nounWord[0].meta.syns[0].map((synonym, i) => (
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
