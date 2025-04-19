import React from "react";

export default function PlayerSelectors({
  striker,
  setStriker,
  nonStriker,
  setNonStriker,
  bowler,
  setBowler,
  setMatchId,
}) {
  const createMatch = async () => {
    if (!striker || !nonStriker || !bowler) {
      alert("Please fill all player inputs and ensure matchId is set.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/matches/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ striker, nonStriker, bowler }),
      });

      const data = await response.json();
      if (data.matchId) {
        setMatchId(data.matchId);
        alert("Match created successfully!");
      } else {
        alert("Failed to create match");
      }
    } catch (err) {
      console.error(err);
      alert("Error creating match");
    }
  };

  return (
    <div className="mt-4 flex gap-4 items-end">
      <div>
        <label>Striker:</label>
        <input
          type="text"
          value={striker}
          onChange={(e) => setStriker(e.target.value)}
          className="border p-1"
        />
      </div>
      <div>
        <label>Non-Striker:</label>
        <input
          type="text"
          value={nonStriker}
          onChange={(e) => setNonStriker(e.target.value)}
          className="border p-1"
        />
      </div>
      <div>
        <label>Bowler:</label>
        <input
          type="text"
          value={bowler}
          onChange={(e) => setBowler(e.target.value)}
          className="border p-1"
        />
      </div>
      <button onClick={createMatch} className="bg-blue-600 text-white px-4 py-2 rounded">
        Create Match
      </button>
    </div>
  );
}
