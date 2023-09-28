import React from "react";

const letterRows = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

function Keyboard({ guesses, onAddLetter, disabled }) {
  const allGuessStatuses = guesses.reduce(
    (prev, curr) => [...prev, ...(curr.status || [])],
    []
  );

  const guessStatusMap = allGuessStatuses.reduce((prev, curr) => {
    if (curr.status === "correct") {
      prev[curr.letter] = "correct";
    } else if (curr.status === "misplaced" && prev[curr.letter] !== "correct") {
      prev[curr.letter] = "misplaced";
    } else if (prev[curr.letter] === undefined) {
      prev[curr.letter] = "incorrect";
    }

    return prev;
  }, {});

  return (
    <div className="keyboard-wrapper">
      {letterRows.map((row) => (
        <div className="keyboard-row" key={row[0]}>
          {row.map((letter) => (
            <button
              className={`keyboard-letter ${guessStatusMap[letter] || ""}`}
              key={`row-${row[0]}-${letter}}`}
              onClick={() => onAddLetter(letter)}
              disabled={disabled}
            >
              {letter}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
