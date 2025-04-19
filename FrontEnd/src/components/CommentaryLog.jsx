import React, { useEffect, useState } from "react";
import socket from "../services/socket";

export default function CommentaryLog() {
  const [commentary, setCommentary] = useState([]);

  useEffect(() => {
    socket.on("scoreUpdate", (match) => {
      setCommentary([...match.commentary].reverse()); 
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

