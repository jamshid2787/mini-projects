import { Auth } from 'context';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {}

const Navbar = (props: NavbarProps) => {
	const { user, methods } = useContext(Auth.Context);

	return (
		<nav className="navbar navbar-light bg-light mb-4">
			<div className="container-fluid d-flex justify-content-start">
				<Link className="navbar-brand" to="/movies">
					FlexTV
				</Link>
				{user ? (
					<ul className="nav">
						<li className="nav-item active">
							<button className="nav-link text-dark">{user.name}</button>
						</li>
						<li className="nav-item">
							<button className="nav-link text-dark" onClick={methods.logout}>
								Log out
							</button>
						</li>
					</ul>
				) : (
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
				)}
			</div>
		</nav>
	);
};

export default Navbar;
