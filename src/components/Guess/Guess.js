import React from "react";
import { range } from "../../utils";

function Guess({ guess }) {
  return (
    <p className="guess">
      {range(5).map((idx) => (
        <span
          key={idx}
          className={`cell${guess.text ? ` ${guess.status[idx].status}` : ""}`}
        >
          {guess.text ? guess.text[idx] : ""}
        </span>
      ))}
    </p>
  );
}

export default Guess;
