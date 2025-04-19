import React, { useEffect, useState } from "react";
import socket from "../services/socket";

export default function Scoreboard() {
  const [match, setMatch] = useState(null);

  useEffect(() => {
    socket.on("scoreUpdate", (updatedMatch) => {
      setMatch(updatedMatch);
    });

    return () => socket.off("scoreUpdate");
  }, []);

  if (!match) return <p>Waiting for score update...</p>;

  const striker = match.striker;
  const nonStriker = match.nonStriker;

  return (
    <div className="bg-white shadow-md rounded p-4 w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">🏏 Scoreboard</h2>

      <p className="text-lg font-medium">
        Score: <span className="text-blue-600">{match.teamScore}/{match.wickets}</span>
      </p>
      <p className="text-lg mb-3">
        Overs: <span className="text-green-700">{match.overs}.{match.balls}</span>
      </p>

      <div className="mb-4">
        <p>
          <strong>Batsmen:</strong>
        </p>
        <ul className="list-none pl-2 mt-1">
          <li>
            {striker?.name
              ? `* ${striker.name} - ${striker.runs || 0} (${striker.balls || 0} balls)`
              : "Striker: -"}
          </li>
          <li>
            {nonStriker?.name
              ? `${nonStriker.name} - ${nonStriker.runs || 0} (${nonStriker.balls || 0} balls)`
              : "Non-Striker: -"}
          </li>
        </ul>
      </div>

      <p className="mb-3">
      <p className="font-bold">Bowler: {match.bowler.name}</p>
      <p>Overs: {match.bowler.overs}</p>
      <p>Balls: {match.bowler.balls}</p>
      <p>Runs Conceded: {match.bowler.runs}</p>

      </p>

      {match.commentary?.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold text-lg mb-1">Commentary</h3>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {match.commentary
              .slice(-5)
              .reverse()
              .map((line, idx) => (
                <li key={idx}>{line}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
