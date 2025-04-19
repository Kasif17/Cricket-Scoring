import React, { useState } from "react";
import PlayerSelectors from "./components/PlayerSelectors";
import ButtonGrid from "./components/ButtonGrid";
import Scoreboard from "./components/Scoreboard";
import CommentaryLog from "./components/CommentaryLog";

export default function App() {
  const [striker, setStriker] = useState("");
  const [nonStriker, setNonStriker] = useState("");
  const [bowler, setBowler] = useState("");
  const [matchId, setMatchId] = useState("");

  return (
    <div className="p-4 bg-gray-100 min-h-screen font-sans">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Match ScoreCard</h1>
      </div>

      <PlayerSelectors
        striker={striker}
        setStriker={setStriker}
        nonStriker={nonStriker}
        setNonStriker={setNonStriker}
        bowler={bowler}
        setBowler={setBowler}
        setMatchId={setMatchId}
      />

      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="col-span-2">
          <ButtonGrid matchId={matchId} />
        </div>
        <div>
          <Scoreboard />
        </div>
      </div>

      <div className="mt-6">
        <CommentaryLog />
      </div>
    </div>
  );
}



