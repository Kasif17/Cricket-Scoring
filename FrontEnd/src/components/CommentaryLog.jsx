import React, { useEffect, useState } from "react";
import socket from "../services/socket";

export default function CommentaryLog() {
  const [commentary, setCommentary] = useState([]);

  useEffect(() => {
    socket.on("scoreUpdate", (match) => {
      setCommentary([...match.commentary].reverse()); // latest first
    });

    return () => socket.off("scoreUpdate");
  }, []);

  return (
    <div className="bg-white rounded shadow-md p-4">
      <h2 className="text-xl font-semibold mb-2">Commentary</h2>
      <ul className="space-y-1">
        {commentary.map((line, index) => (
          <li key={index}>• {line}</li>
        ))}
      </ul>
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import socket from "../services/socket";

// export default function CommentaryLog() {
//   const [logs, setLogs] = useState([]);

//   useEffect(() => {
//     socket.on("ball-log", (data) => {
//       setLogs((prev) => [data, ...prev]);
//     });

//     return () => socket.off("ball-log");
//   }, []);

//   return (
//     <div className="bg-white p-4 rounded shadow mt-4">
//       <h2 className="font-semibold text-lg mb-2">Ball By Ball Commentary</h2>
//       <ul className="space-y-2">
//         {logs.map((log, i) => (
//           <li key={i} className="border-b py-1 text-sm">
//             [{new Date(log.timestamp).toLocaleTimeString()}] {log.striker} - {log.event}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
