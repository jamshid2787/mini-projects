import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from 'routes';
import Navbar from 'components/navbar';

import 'assets/styles/main.scss';
import { Toaster } from 'react-hot-toast';

const element = document.getElementById('root')!;
const root = ReactDOM.createRoot(element);

root.render(
	<Router >
		<Navbar />
		<Routes />
		<Toaster />
	</Router>
);
