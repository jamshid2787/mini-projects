import { BrowserRouter as Router, Routes as Switch, Route, Navigate } from 'react-router-dom';
import Footer from './components/footer';
import Navbar from './components/navbar';

const Routes = () => (
	<>
		<Navbar />
		<Router>
			<Switch>
				{/* <Route path="register" element={<Register />} />
				<Route path="turniere" element={<Turniere />} /> */}
				<Route path="*" element={<Navigate to="/" />} />
			</Switch>
		</Router>
		<Footer />
	</>
);

export default Routes;
