import React from 'react';
import Scorecard from '../components/Scorecard';

const Match = () => {
  const matchId = localStorage.getItem('matchId'); // Simulate login or match start

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Live Match Commentary</h1>
      <Scorecard matchId={matchId} />
    </div>
  );
};

export default Match;
