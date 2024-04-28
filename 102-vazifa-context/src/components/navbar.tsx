import { Navlogo } from '../assets/images';
import { Link } from 'react-router-dom';

export default function Navbar() {
	return (
		<>
			<div className="navbar">
				<img style={{ width: '150px' }} src={Navlogo} alt="" />
				<ul>
					<li>Turniere</li>
					<li>Regelverk</li>
					<li>Partner</li>
					<li>Teams</li>
					<li>Deine Teams</li>
					<li>Preise</li>
				</ul>
				<div className="buttons">
					<Link to="/login">
						<button>Login</button>
					</Link>
					<Link to="/register">
						<button>Register</button>
					</Link>
				</div>
			</div>
		</>
	);
}
