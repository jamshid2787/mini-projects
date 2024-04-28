import { Loader } from 'components';
import { Hooks } from 'modules/pig-game';
import { Link } from 'react-router-dom';

const List = () => {
  const { games = [], isLoading } = Hooks.useList();

  if (isLoading) return <Loader />;

  return (
    <div className="relative w-[90%] mx-auto mt-2 overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Game
            </th>
            <th scope="col" className="px-6 py-3">
              Max Score
            </th>
            <th scope="col" className="px-6 py-3">
              Winner
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {games.map(({ id, player1, player2, max, winner }) => (
            <tr
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              key={id}
            >
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <b>{player1}</b> VS <b>{player2}</b>
              </th>
              <td className="px-6 py-4">{max}</td>
              <td className="px-6 py-4">{winner || '---'}</td>
              <td className="px-6 py-4">
                <Link to={id} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  Play
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default List;
