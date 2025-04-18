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
      {/* Runs */}
      {[0, 1, 2, 3, 4, 6].map((run) => (
        <button
          key={run}
          onClick={() => handleScore({ runs: run })}
          className="bg-green-500 text-white p-2 rounded"
        >
          {run} Run{run !== 1 ? "s" : ""}
        </button>
      ))}

      {/* Extras */}
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

      {/* Wicket */}
      <button
        onClick={() => handleScore({ wicket: true })}
        className="bg-red-600 text-white p-2 rounded col-span-2"
      >
        Wicket
      </button>
    </div>
  );
}



// import React from "react";
// import axios from "axios";

// const buttons = [
//   "0", "1", "2", "3", "4", "6", "Wicket", "Wide", "No Ball", "Bye", "Leg Bye"
// ];

// export default function ButtonGrid({ striker, nonStriker, bowler }) {
//   const matchId = localStorage.getItem("matchId"); // Or pass as prop

//   const handleClick = async (action) => {
//     if (!matchId || !striker || !nonStriker || !bowler) {
//       alert("Please fill all player inputs and ensure matchId is set.");
//       return;
//     }

//     let body = { matchId };

//     switch (action) {
//       case "Wicket":
//         body.wicket = true;
//         break;
//       case "Wide":
//         body.wide = true;
//         break;
//       case "No Ball":
//         body.noball = true;
//         break;
//       case "Bye":
//         body.bye = true;
//         body.runs = 1;
//         break;
//       case "Leg Bye":
//         body.legbye = true;
//         body.runs = 1;
//         break;
//       default:
//         body.runs = parseInt(action);
//         break;
//     }

//     try {
//       await axios.post("http://localhost:5000/api/match/update", body);
//     } catch (err) {
//       console.error("Failed to update score", err);
//     }
//   };

//   return (
//     <div className="grid grid-cols-4 gap-2">
//       {buttons.map((label) => (
//         <button
//           key={label}
//           onClick={() => handleClick(label)}
//           className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
//         >
//           {label}
//         </button>
//       ))}
//     </div>
//   );
// }

// import React from "react";
// import socket from "../services/socket";

// const buttons = [
//   "Ball Start", "0", "1", "Wicket",
//   "Wide", "2", "6", "4",
//   "No Ball", "Bowler Stop", "1 or 2", "2 or 4",
//   "4 or 6", "Ball In Air", "Others", "3",
//   "Boundary Check", "Appeal", "Catch Drop", "Leg Bye",
//   "Bye", "Third Umpire", "Review", "Done",
//   "Misfield", "Overthrow", "Wicket Confirm"
// ];

// export default function ButtonGrid({ striker, nonStriker, bowler }) {
//   const handleClick = (label) => {
//     const payload = {
//       striker,
//       nonStriker,
//       bowler,
//       event: label,
//       timestamp: new Date().toISOString(),
//     };
//     socket.emit("ball-event", payload);
//   };

//   return (
//     <div className="grid grid-cols-6 gap-2">
//       {buttons.map((btn, i) => (
//         <button
//           key={i}
//           className="bg-blue-600 text-white p-2 rounded shadow hover:bg-blue-700"
//           onClick={() => handleClick(btn)}
//         >
//           {btn}
//         </button>
//       ))}
//     </div>
//   );
// }

