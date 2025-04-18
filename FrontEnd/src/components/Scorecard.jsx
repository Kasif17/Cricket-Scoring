import React, { useState, useEffect } from 'react';
import socket from '../services/socket';
import axios from 'axios';

const Scorecard = ({ matchId }) => {
  const [ball, setBall] = useState({
    ballNumber: '',
    outcome: '',
    runs: 0,
    commentary: '',
    extras: {
      wide: 0,
      noBall: 0,
      bye: 0,
      legBye: 0
    }
  });

  const [liveMatch, setLiveMatch] = useState(null);

  useEffect(() => {
    if (!matchId) return;

    socket.emit('joinMatch', matchId);

    socket.on('matchUpdated', (data) => {
      setLiveMatch(data);
    });

    return () => {
      socket.off('matchUpdated');
    };
  }, [matchId]);

  const handleSubmit = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/matches/ball`, {
        matchId,
        inningsIndex: 0,
        ball,
      });

      setBall({
        ballNumber: '',
        outcome: '',
        runs: 0,
        commentary: '',
        extras: { wide: 0, noBall: 0, bye: 0, legBye: 0 }
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Scorecard</h2>

      {liveMatch && (
        <div className="mb-4">
          <p className="font-semibold">
            Score: {liveMatch.innings[0].score}/{liveMatch.innings[0].wickets}
          </p>
          <p>Overs: {liveMatch.innings[0].overs}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <input
          className="border p-2 rounded"
          placeholder="Ball Number (e.g. 1.1)"
          value={ball.ballNumber}
          onChange={(e) => setBall({ ...ball, ballNumber: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="Outcome"
          value={ball.outcome}
          onChange={(e) => setBall({ ...ball, outcome: e.target.value })}
        />
        <input
          type="number"
          className="border p-2 rounded"
          placeholder="Runs"
          value={ball.runs}
          onChange={(e) => setBall({ ...ball, runs: parseInt(e.target.value) })}
        />
        <input
          className="border p-2 rounded"
          placeholder="Commentary"
          value={ball.commentary}
          onChange={(e) => setBall({ ...ball, commentary: e.target.value })}
        />
      </div>

      <h3 className="mt-4 font-semibold">Extras</h3>
      <div className="grid grid-cols-4 gap-2">
        {['wide', 'noBall', 'bye', 'legBye'].map((type) => (
          <input
            key={type}
            type="number"
            className="border p-2 rounded"
            placeholder={type}
            value={ball.extras[type]}
            onChange={(e) =>
              setBall({
                ...ball,
                extras: {
                  ...ball.extras,
                  [type]: parseInt(e.target.value) || 0,
                },
              })
            }
          />
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Submit Ball
      </button>
    </div>
  );
};

export default Scorecard;
