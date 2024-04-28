// import { usePigGame } from 'modules/pig-game/hooks';
// import { useSingle } from 'modules/pig-game/hooks/use-single';

// const PigGame = () => {
//   const { methods } = usePigGame();
//   const { game } = useSingle();

//   const { player1, player2 } = game;

//   return (
//     <div className="bg-white dark:bg-black text-black text-2xl dark:text-white h-screen">
//       {game.winner && <h1 className="text-center ">Winner: {game.winner}</h1>}
//       <table className="table w-full">
//         <thead>
//           <tr className="w-full">
//             <th>Name</th>
//             <th>Total</th>
//             <th>Current</th>
//           </tr>
//         </thead>

//         <tbody>
//           <tr className="text-center">
//             <td className={game.currentPlayerId === player1.id ? 'text-green-600' : ''}>{player1.name}</td>
//             <td>{player1.totalScore}</td>
//             <td>{player1.currentScore}</td>
//           </tr>
//           <tr className="text-center">
//             <td className={game.currentPlayerId === player2.id ? 'text-green-600' : ''}>{player2.name}</td>
//             <td>{player2.totalScore}</td>
//             <td>{player2.currentScore}</td>
//           </tr>
//         </tbody>
//       </table>

//       <div className="flex gap-2 mt-2 justify-center">
//         <button className="btn" onClick={methods.roll} disabled={!!game.winner}>
//           Dice ({game.dice})
//         </button>
//         <button className="btn" onClick={methods.hold} disabled={!!game.winner}>
//           Hold
//         </button>
//         <button className="btn" onClick={methods.reset}>
//           Reset
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PigGame;
