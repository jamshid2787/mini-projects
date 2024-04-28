import { Link } from 'react-router-dom';

interface NotFoundProps {}

const NotFound = (props: NotFoundProps) => (
  <div className="flex flex-col justify-center items-center gap-2 h-screen">
    <h2>Not Found</h2>
    <Link to="/games" className="btn">
      Go Home
    </Link>
  </div>
);

export default NotFound;
