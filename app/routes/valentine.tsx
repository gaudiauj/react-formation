"use client";
import { useState } from "react";

export default function Index() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const yesButtonSize = noCount * 20 + 16;

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  const getNoButtonText = () => {
    const phrases = [
      "Non", // Not changed, already in French
      "Est tu sûr ?",
      "Et si je demandais vraiment gentiment ?",
      "S'il te plaît",
      "Avec une crême brulée en plus ?",
      "Et une tartine de terrine ?",
      "S'IL TE PLAÎT MA CHÉRIE",
      "Mais :*(",
      "Je vais mourir",
      "Oui, je suis mort",
      "ok tu parles au fantôme de Jean",
      "s'il te plaît chérie",
      ":((((",
      "S'IL TE PLAÎT JOLIMENT",
      "Estoy muerto", // Translated from Spanish
      "Non :(", // Not changed, already in French
    ];

    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  return (
    <>
      <head>
        <script src="https://cdn.tailwindcss.com"></script>;
      </head>
      <div className="-mt-16 flex h-screen flex-col items-center justify-center">
        {yesPressed ? (
          <>
            <img src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" />
            <div className="my-4 text-4xl font-bold">
              WOOOOOO!!! Je t'aime ma chérie !! ;))
            </div>
          </>
        ) : (
          <>
            <img
              className="h-[200px]"
              src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif"
            />
            <h1 className="my-4 text-4xl">
              Lorelei, veux tu être ma Valentine?
            </h1>
            <div className="flex items-center">
              <button
                className={`mr-4 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700`}
                style={{ fontSize: yesButtonSize }}
                onClick={() => setYesPressed(true)}
              >
                Yes
              </button>
              <button
                onClick={handleNoClick}
                className=" rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
              >
                {noCount === 0 ? "No" : getNoButtonText()}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
