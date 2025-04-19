import React from "react";
import axios from "axios";

export default function ButtonGrid({ matchId }) {
  const handleScore = async (details) => {
    if (!matchId) {
      alert("Please create the match first.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/matches/update", {
        matchId,
        ...details,
      });
    } catch (err) {
      console.error(err);
      alert("Error updating score");
    }
  };

  return (
    <div className="grid grid-cols-4 gap-2">
     
      {[0, 1, 2, 3, 4, 6].map((run) => (
        <button
          key={run}
          onClick={() => handleScore({ runs: run })}
          className="bg-green-500 text-white p-2 rounded"
        >
          {run} Run{run !== 1 ? "s" : ""}
        </button>
      ))}

 
      <button
        onClick={() => handleScore({ wide: true, runs: 1 })}
        className="bg-yellow-400 text-white p-2 rounded"
      >
        Wide
      </button>
      <button
        onClick={() => handleScore({ noball: true, runs: 1 })}
        className="bg-yellow-500 text-white p-2 rounded"
      >
        No Ball
      </button>
      <button
        onClick={() => handleScore({ bye: true, runs: 1 })}
        className="bg-blue-400 text-white p-2 rounded"
      >
        Bye +1
      </button>
      <button
        onClick={() => handleScore({ legbye: true, runs: 1 })}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Leg Bye +1
      </button>


      <button
        onClick={() => handleScore({ wicket: true })}
        className="bg-red-600 text-white p-2 rounded col-span-2"
      >
        Wicket
      </button>
    </div>
  );
}


