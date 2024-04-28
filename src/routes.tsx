import { BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom';

import Login from './components/login';
import Register from './components/register';
import App from './App';

const Routes = () => (
	<Router>
		<Switch>
			<Route path="*" element={<Login />} />
			<Route path="register" element={<Register />} />
			<Route path="/home" element={<App />} />
		</Switch>
	</Router>
);

export default Routes;
