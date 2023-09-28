import React from "react";

function EndBanner({ status, answer, numGuesses, onRestart }) {
  const bannerClass = "banner " + (status === "won" ? "happy" : "sad");
  return (
    <div className={bannerClass}>
      {status === "won" && (
        <p>
          <strong>Congratulations!</strong> Got it in{" "}
          <strong>
            {numGuesses} guess{numGuesses > 1 ? "es" : ""}
          </strong>
          .
        </p>
      )}

      {status === "lost" && (
        <p>
          Sorry, the correct answer is <strong>{answer}</strong>.
        </p>
      )}

      <button className="button" onClick={() => onRestart()}>
        Restart Game
      </button>
    </div>
  );
}

export default EndBanner;
