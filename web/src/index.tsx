import ReactDOM from 'react-dom/client';
import './style.scss';

import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from 'routes';

const element = document.getElementById('root')!;
const root = ReactDOM.createRoot(element);

root.render(<Routes />);
