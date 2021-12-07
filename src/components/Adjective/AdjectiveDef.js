import React from "react";

export default function AdjectiveDef(props) {
  return (
    <article className="displayResults__typeResults">
      <p className="displayResults__typeOf">{props.adjWord[0].fl}</p>

      {/* MAP SHORT DEFINITIONS */}
      <section className="displayResults__typeDef">
        <ol className="displayResults__shortDef">
          {props.adjWord[0].shortdef.map((def, i) => (
            <li className="displayResults__define-result" key={i}>
              {def}
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}
