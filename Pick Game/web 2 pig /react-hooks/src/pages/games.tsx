import { Link } from 'react-router-dom';

interface GamesProps {}

const Games = (props: GamesProps) => (
  <div className="flex gap-3">
    <Link to="/games/sudoku" className="btn">
      Sudoku
    </Link>

    <Link to="/games/pig" className="btn">
      Pig
    </Link>
  </div>
);

export default Games;
