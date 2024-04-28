import React, { FC } from 'react';
import { usePigGame } from './hooks';

const PigGame: FC = () => {
  const { game, methods } = usePigGame({ name1: 'Jamshid', name2: 'Arslonbek', max: 100 });

  const handleRoll = () => {
    methods.roll();
  };

  const handleHold = () => {
    methods.hold();
  };

  const handleReset = () => {
    methods.reset();
  };

  return (
    <div className="pig-game">
      <h1>Pig Game</h1>
      <div>
        <div>
          <p>
            {game.player1.name}: {game.player1.totalScore}
          </p>
        </div>
        <div>
          <p>
            {game.player2.name}: {game.player2.totalScore}
          </p>
        </div>
      </div>
      <div>
        <p>Current Player: {game.currentPlayer === game.player1.id ? game.player1.name : game.player2.name}</p>
        <p>
          Current Score:{' '}
          {game.currentPlayer === game.player1.id ? game.player1.currentScore : game.player2.currentScore}
        </p>
        {!game.winner && (
          <div>
            <button className="btn btn-primary" onClick={handleRoll}>
              Roll Dice
            </button>
            <button className="btn btn-primary" onClick={handleHold}>
              Hold
            </button>
          </div>
        )}
        {game.winner && (
          <div>
            <p>{game.winner} wins!</p>
            <button className="btn btn-primary" onClick={handleReset}>
              New Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PigGame;
