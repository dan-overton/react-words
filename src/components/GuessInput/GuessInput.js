import React from "react";
import Keyboard from "../Keyboard";

const MAX_LENGTH = 5;

function GuessInput({ onSubmit, disabled, guesses }) {
  const [guess, setGuess] = React.useState("");

  const onAddLetter = (letter) => {
    if (guess.length === MAX_LENGTH) {
      return;
    }

    setGuess(guess + letter);
  };

  return (
    <>
      <form
        className="guess-input-wrapper"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(guess);
          setGuess("");
        }}
      >
        <label htmlFor="guess-input">Enter guess:</label>
        <input
          id="guess-input"
          type="text"
          value={guess}
          maxLength={MAX_LENGTH}
          title={`${MAX_LENGTH} letters A-Z`}
          required
          pattern={`^[A-Z]{${MAX_LENGTH}}$`}
          onChange={(event) => {
            setGuess(event.target.value.toUpperCase());
          }}
          disabled={disabled}
        />
      </form>
      <Keyboard
        guesses={guesses}
        onAddLetter={onAddLetter}
        disabled={disabled}
      />
    </>
  );
}

export default GuessInput;
