import { Link } from 'react-router-dom';

interface NavbarProps {}
export let navauth: any = false;
const Navbar = (props: NavbarProps) => {
	return (
		<nav className="navbar navbar-light bg-light mb-4">
			<div className="container-fluid d-flex justify-content-start">
				<Link className="navbar-brand" to="/movies">
					FlexTV
				</Link>
				<ul className="nav">
					{localStorage.getItem('token') ? (
						<>
							<Link className="nav-link text-dark" to="/auth/login">
								<li className="nav-item active">Ism</li>
							</Link>

							<Link className="nav-link text-dark" to="/auth/register">
								<li
									onClick={() => {
										localStorage.removeItem('token');
									}}
									className="nav-item"
								>
									Log Out
								</li>
							</Link>
						</>
					) : (
						<>
							<Link className="nav-link text-dark" to="/auth/login">
								<li className="nav-item active">Login</li>
							</Link>

							<Link className="nav-link text-dark" to="/auth/register">
								<li className="nav-item">Register</li>
							</Link>
						</>
					)}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
