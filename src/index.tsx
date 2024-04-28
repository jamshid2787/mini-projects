import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from 'app';
import './style.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

const element = document.getElementById('root')!;
const root = ReactDOM.createRoot(element);
root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
