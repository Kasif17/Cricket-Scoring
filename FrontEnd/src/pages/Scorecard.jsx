// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import socket from '../services/socket';

// const Scorecard = () => {
//   const matchId = localStorage.getItem('matchId');
//   const [ballData, setBallData] = useState({
//     ballNumber: '1.1',
//     outcome: '',
//     runs: 0,
//     batsman: '',
//     bowler: '',
//     commentary: '',
//     extras: { wide: 0, noBall: 0, bye: 0, legBye: 0 },
//   });

//   const [liveMatch, setLiveMatch] = useState(null);

//   useEffect(() => {
//     socket.emit('joinMatch', matchId);

//     socket.on('matchUpdated', (updatedMatch) => {
//       setLiveMatch(updatedMatch);
//     });

//     return () => {
//       socket.off('matchUpdated');
//     };
//   }, [matchId]);

//   const submitBall = async () => {
//     await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/matches/ball`, {
//       matchId,
//       inningsIndex: 0,
//       ball: ballData,
//     });

//     setBallData({
//       ...ballData,
//       runs: 0,
//       commentary: '',
//       outcome: '',
//     });
//   };

//   return (
//     <div className="p-4 max-w-3xl mx-auto">
//       <h2 className="text-xl font-bold mb-4">
//         Live Score: {liveMatch?.innings[0]?.score || 0}/{liveMatch?.innings[0]?.wickets || 0}
//       </h2>
//       <input
//         className="block w-full p-2 mb-2 border rounded"
//         placeholder="Outcome"
//         value={ballData.outcome}
//         onChange={(e) => setBallData({ ...ballData, outcome: e.target.value })}
//       />
//       <input
//         className="block w-full p-2 mb-2 border rounded"
//         type="number"
//         placeholder="Runs"
//         value={ballData.runs}
//         onChange={(e) => setBallData({ ...ballData, runs: parseInt(e.target.value) })}
//       />
//       <input
//         className="block w-full p-2 mb-2 border rounded"
//         placeholder="Commentary"
//         value={ballData.commentary}
//         onChange={(e) => setBallData({ ...ballData, commentary: e.target.value })}
//       />
//       <button
//         onClick={submitBall}
//         className="bg-blue-600 text-white px-4 py-2 rounded"
//       >
//         Add Ball
//       </button>
//     </div>
//   );
// };

// export default Scorecard;
