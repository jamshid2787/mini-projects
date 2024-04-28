import { ReactNode, Component } from 'react';
import AuthContext from './context';
import { Api, Mappers, Types } from 'modules/auth';
import { Loader } from 'components';
import { config } from 'config';

interface AuthProviderState extends Pick<Types.IContext, 'user'> {
	isLoading: boolean;
}

interface AuthProviderProps {
	children: ReactNode;
}

export default class AuthProvider extends Component<AuthProviderProps, AuthProviderState> {
	state: AuthProviderState = {
		user: null,
		isLoading: !!localStorage.getItem(config.tokenKEY),
	};

	async componentDidMount() {
		const token = localStorage.getItem(config.tokenKEY);
		if (!token) return;
		const { data } = await Api.Profile();
		const user = Mappers.User(data);

		this.setState({ user, isLoading: false });
	}

	handleLogout = () => {
		this.setState({ user: null });
		localStorage.removeItem(config.tokenKEY);
	};

	render() {
		if (this.state.isLoading) return <Loader />;

		return (
			<AuthContext.Provider
				value={{
					user: this.state.user,
					methods: {
						logout: this.handleLogout,
					},
				}}
			>
				{this.props.children}
			</AuthContext.Provider>
		);
	}
}
