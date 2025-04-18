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

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-semibold mb-2">Scoreboard</h2>
      <p>Score: {match.teamScore}/{match.wickets}</p>
      <p>Overs: {match.overs}.{match.balls}</p>
      <p>Striker: {match.striker?.name || "-"} ({match.striker?.runs || 0} runs, {match.striker?.balls || 0} balls)</p>
      <p>Non-Striker: {match.nonStriker?.name || "-"}</p>
      <p>Bowler: {match.bowler?.name || "-"}</p>
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import socket from "../services/socket";

// export default function Scoreboard() {
//   const [score, setScore] = useState({ runs: 0, wickets: 0, overs: "0.0", extras: {} });

//   useEffect(() => {
//     socket.on("update-score", (data) => {
//       setScore(data);
//     });

//     return () => socket.off("update-score");
//   }, []);

//   return (
//     <div className="bg-white p-4 rounded shadow">
//       <h2 className="font-semibold text-lg">Scorecard</h2>
//       <p>Runs / Wickets: {score.runs} / {score.wickets}</p>
//       <p>Overs: {score.overs}</p>
//       <p>Extras: {JSON.stringify(score.extras)}</p>
//     </div>
//   );
// }
