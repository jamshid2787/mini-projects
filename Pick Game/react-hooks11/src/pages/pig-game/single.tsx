import { Loader, NotFound } from 'components';
import { Api } from 'modules/pig-game';

import { useSingle } from 'modules/pig-game/hooks/use-single';
import { useParams } from 'react-router-dom';

const PigGame = () => {
  const { gameId = '' } = useParams();
  const { isLoading, game, error, refetch } = useSingle({ gameId });

  if (isLoading) return <Loader />;

  if (error) return <NotFound>Something Error</NotFound>;
  const { player1, player2, currentPlayerId } = game;
  console.log(currentPlayerId);

  const onReset = async () => {
    await Api.Reset({ gameId });
    await refetch();
  };
  const onHold = async () => {
    await Api.Hold({ gameId, playerId: currentPlayerId });
    await refetch();
  };
  const onDice = async () => {
    await Api.Dice({ gameId, playerId: currentPlayerId });
    await refetch();
  };

  return (
    <div className="bg-white dark:bg-black text-black text-2xl dark:text-white h-screen">
      {game.winner && <h1 className="text-center ">Winner: {game.winner}</h1>}
      <table className="table w-full">
        <thead>
          <tr className="w-full">
            <th>Name</th>
            <th>Total</th>
            <th>Current</th>
          </tr>
        </thead>

        <tbody>
          <tr className="text-center">
            <td className={game.currentPlayerId === player1.id ? 'text-green-600' : ''}>{player1.name}</td>
            <td>{player1.totalScore}</td>
            <td>{player1.currentScore}</td>
          </tr>
          <tr className="text-center">
            <td className={game.currentPlayerId === player2.id ? 'text-green-600' : ''}>{player2.name}</td>
            <td>{player2.totalScore}</td>
            <td>{player2.currentScore}</td>
          </tr>
        </tbody>
      </table>

      <div className="flex gap-2 mt-2 justify-center">
        <button className="btn" disabled={!!game.winner} onClick={onDice}>
          Dice ({game.dice})
        </button>
        <button className="btn" disabled={!!game.winner} onClick={onHold}>
          Hold
        </button>
        <button className="btn" onClick={onReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default PigGame;
