import { BrowserRouter as Router, Routes as Switch, Route, Navigate } from 'react-router-dom';
import { Games, NotFound } from 'pages';

const Routes = () => (
	<Router>
		<Switch>
			<Route path="games" element={<Games.List />} />
			<Route path="games/new" element={<Games.New />} />
			<Route path="games/:id" element={<Games.Single />} />
			<Route path="404" element={<NotFound />} />
			<Route path="*" element={<Navigate to="/games/new" />} />
		</Switch>
	</Router>
);

export default Routes;
