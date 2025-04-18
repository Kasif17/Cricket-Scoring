import React, { useState } from 'react';
import axios from 'axios';

const CreateMatch = ({ setMatchId }) => {
  const [striker, setStriker] = useState('');
  const [nonStriker, setNonStriker] = useState('');
  const [bowler, setBowler] = useState('');

  const handleCreate = async () => {
    if (!striker || !nonStriker || !bowler) {
      alert('Please fill all player inputs');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/matches/create', {
        striker,
        nonStriker,
        bowler,
      });

      if (res.data.matchId) {
        setMatchId(res.data.matchId);
        alert(`Match Created! Match ID: ${res.data.matchId}`);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to create match');
    }
  };

  return (
    <div className="p-4 space-y-2">
      <input
        type="text"
        placeholder="Striker Name"
        value={striker}
        onChange={(e) => setStriker(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        type="text"
        placeholder="Non-Striker Name"
        value={nonStriker}
        onChange={(e) => setNonStriker(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        type="text"
        placeholder="Bowler Name"
        value={bowler}
        onChange={(e) => setBowler(e.target.value)}
        className="border p-2 w-full"
      />
      <button onClick={handleCreate} className="bg-blue-500 text-white px-4 py-2">
        Create Match
      </button>
    </div>
  );
};

export default CreateMatch;
