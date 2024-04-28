import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Game {
  player1: string;
  player2: string;
  id: number;
  name: string;
  name1: string;
}

const List: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/games/pig');
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const gamesData = await response.json();
        setGames(gamesData.data);
        console.log(gamesData.data);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  }, []);

  return (
    <>
      <div className="list p-4">
        <div>
          <Link to="/games/pig/new" className="btn btn-sm btn-primary">
            Create Game
          </Link>
        </div>
        <div className="p-2">
          <h2 className="text">Games List</h2>
          <ul>
            {games.map((game, idx) => (
              <Link to={`/games/pig/${game.id}`}>
                <li key={game.id} className="text">
                  {game.player1} VS {game.player2}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default List;
