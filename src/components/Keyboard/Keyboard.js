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

  const getStatus = (letter) => {
    //if letter was ever correct, it is correct
    // if letter was ever misplaced, it is misplaced
    // if used ever, incorrect
    // not used

    const matches = allGuessStatuses.filter((g) => g.letter === letter);

    if (matches.length === 0) {
      return "";
    }

    if (matches.find((g) => g.status === "correct")) {
      return "correct";
    }

    if (matches.find((g) => g.status === "misplaced")) {
      return "misplaced";
    }

    return "incorrect";
  };

  return (
    <div className="keyboard-wrapper">
      {letterRows.map((row) => (
        <div className="keyboard-row" key={row[0]}>
          {row.map((letter) => (
            <button
              className={`keyboard-letter ${getStatus(letter)}`}
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
