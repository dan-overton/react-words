import React from "react";

import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import { WORDS } from "../../data";
import { checkGuess } from "../../game-helpers";
import { sample } from "../../utils";
import EndBanner from "../EndBanner";
import GuessInput from "../GuessInput";
import GuessList from "../GuessList";
const getNumGuesses = (guesses) => {
  const lastGuessIndex = guesses.findLastIndex((g) => g.text !== "");

  return lastGuessIndex === -1 ? 0 : lastGuessIndex + 1;
};

function getGameStatus(guesses) {
  const numGuesses = getNumGuesses(guesses);

  if (numGuesses > 0) {
    if (guesses[numGuesses - 1].status.every((s) => s.status === "correct")) {
      return "won";
    }

    if (numGuesses === NUM_OF_GUESSES_ALLOWED) {
      return "lost";
    }
  }

  return "playing";
}

function initGuesses() {
  return Array.from({ length: NUM_OF_GUESSES_ALLOWED }).map(() => ({
    id: crypto.randomUUID(),
    text: "",
    status: "",
  }));
}

function Game() {
  const [answer, setAnswer] = React.useState(() => sample(WORDS));
  const [guesses, setGuesses] = React.useState(initGuesses);

  const numGuesses = getNumGuesses(guesses);
  const gameStatus = getGameStatus(guesses);

  const onGuess = (guess) => {
    const nextGuess = guesses.findIndex((g) => g.text === "");

    if (nextGuess === -1) {
      return;
    }

    const newGuesses = [...guesses];

    newGuesses[nextGuess].text = guess;
    newGuesses[nextGuess].status = checkGuess(guess, answer);

    setGuesses(newGuesses);
  };

  return (
    <>
      {gameStatus !== "playing" && (
        <EndBanner
          status={gameStatus}
          answer={answer}
          numGuesses={numGuesses}
          onRestart={() => {
            setGuesses(initGuesses());
            setAnswer(sample(WORDS));
          }}
        />
      )}
      <GuessList guesses={guesses} />
      <GuessInput
        onSubmit={onGuess}
        disabled={gameStatus !== "playing"}
        guesses={guesses}
      />
    </>
  );
}

export default Game;
