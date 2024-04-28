import { Create } from 'modules/pig-game/api';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const New = () => {
  const navigate = useNavigate();
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [max, setMax] = useState();

  const handlePlayer1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayer1(event.target.value);
  };

  const handlePlayer2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayer2(event.target.value);
  };

  const handleMaxChange = (event: any) => {
    setMax(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = { player1, player2, max };

    try {
      const response = await fetch('http://localhost:4000/api/games/pig', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        console.log('Game created successfully');
        console.log(Create());
        navigate(`/games/pig/${data.data.game.id}`);
      } else {
        console.error('Failed to create game');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="new-game">
      <h1 style={{ paddingBottom: '50px' }}>Create Pig Game</h1>
      <form className="forma-new" onSubmit={handleSubmit}>
        <div>
          <label>
            Player 1:
            <input autoFocus required type="text" value={player1} onChange={handlePlayer1Change} />
          </label>
        </div>
        <div>
          <label>
            Player 2:
            <input required type="text" value={player2} onChange={handlePlayer2Change} />
          </label>
        </div>
        <div>
          <label>
            Max count:
            <input required type="number" value={max} onChange={handleMaxChange} />
          </label>
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default New;
