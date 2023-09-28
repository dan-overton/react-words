import React from "react";
import Guess from "../Guess";

function GuessList({ guesses }) {
  return (
    <div className="guess-results">
      {guesses.map((guess) => (
        <Guess key={guess.id} guess={guess}></Guess>
      ))}
    </div>
  );
}

export default GuessList;
