import ReactDOM from 'react-dom/client';

import './index.css';

import Routes from './routes';

const element = document.getElementById('root')!;
const root = ReactDOM.createRoot(element);

root.render(<Routes />);
