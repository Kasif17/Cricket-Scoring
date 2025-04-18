// import React, { useState } from 'react';

// const buttons = [
//   '0', '1', '2', '3', '4', '6', 'Wide', 'No Ball', 'Leg Bye', 'Bye', 'Wicket', 'Overthrow'
// ];

// export default function MatchCommentary() {
//   const [commentary, setCommentary] = useState([]);

//   const handleClick = (event) => {
//     const value = event.target.textContent;
//     setCommentary([...commentary, value]);
//   };

//   return (
//     <div>
//       <div className="grid grid-cols-4 gap-2">
//         {buttons.map((label, idx) => (
//           <button
//             key={idx}
//             onClick={handleClick}
//             className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//           >
//             {label}
//           </button>
//         ))}
//       </div>

//       <div className="mt-4">
//         <h2 className="font-semibold">Ball-by-Ball Commentary:</h2>
//         <ul className="list-disc list-inside">
//           {commentary.map((ball, idx) => (
//             <li key={idx}>{`Ball ${idx + 1}: ${ball}`}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }