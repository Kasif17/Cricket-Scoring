// import React, { useState } from 'react';
// import axios from 'axios';

// const Home = ({ navigate }) => {
//   const [matchInfo, setMatchInfo] = useState({
//     teamA: '', teamB: '', tossWinner: '', electedTo: 'bat'
//   });

//   const handleCreateMatch = async () => {
//     const res = await axios.post('http://localhost:5000/api/matches/create', {
//       ...matchInfo, innings: [{ battingTeam: matchInfo.tossWinner, score: 0, wickets: 0, overs: 0, balls: [] }]
//     });
//     localStorage.setItem('matchId', res.data._id);
//     navigate('/scorecard');
//   };

//   return (
//     <div>
//       <input placeholder="Team A" onChange={e => setMatchInfo({ ...matchInfo, teamA: e.target.value })} />
//       <input placeholder="Team B" onChange={e => setMatchInfo({ ...matchInfo, teamB: e.target.value })} />
//       <input placeholder="Toss Winner" onChange={e => setMatchInfo({ ...matchInfo, tossWinner: e.target.value })} />
//       <select onChange={e => setMatchInfo({ ...matchInfo, electedTo: e.target.value })}>
//         <option value="bat">Bat</option>
//         <option value="bowl">Bowl</option>
//       </select>
//       <button onClick={handleCreateMatch}>Start Match</button>
//     </div>
//   );
// };

// export default Home;
