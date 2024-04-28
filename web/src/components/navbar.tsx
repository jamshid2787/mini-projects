import { Link } from 'react-router-dom';

interface NavbarProps {}

const Navbar = (props: NavbarProps) => {
	return (
		<nav className="navbar navbar-light bg-light mb-4">
			<div className="container-fluid d-flex justify-content-start">
				<Link className="navbar-brand" to="/movies">
					FlexTV
				</Link>
				<ul className="nav">
					<li className="nav-item active">
						<Link className="nav-link text-dark" to="/auth/login">
							Login
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link text-dark" to="/auth/register">
							Register
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
