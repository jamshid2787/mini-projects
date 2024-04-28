import { Routes as Switch, Route, Navigate, useNavigate, useMatch } from 'react-router-dom';


const Routes = () => {
	const navigate = useNavigate();
	const match = useMatch('pig/:pigID');

	return (
		<Switch>
			<Route path="*" element={<Navigate to="/" />} />
		</Switch>
	);
};

export default Routes;
