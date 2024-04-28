import { Form } from 'components';
import { config } from 'config';
import { Api } from 'modules/auth';
import { IForm } from 'modules/auth/types';
import toast from 'react-hot-toast';
import * as yup from 'yup';

export default class Login extends Form<IForm.Login> {
	state = {
		values: { email: '', password: '' },
		errors: {},
		isLoading: false,
	};

	schema = yup.object({
		email: yup.string().email().required(),
		password: yup.string().min(6).required(),
	});

	doSubmit = async (values: IForm.Login) => {
		this.setState({ isLoading: true });
		try {
			const { data } = await Api.Login(values);
			localStorage.setItem(config.tokenKEY, data.data);

			const { data: user } = await Api.Profile();
			console.log(user);

			toast.success(`Successfully Logged In ${values.email}`);
		} catch (error: any) {
		} finally {
			this.setState({ isLoading: false });
		}
	};

	render() {
		return (
			<div className="container">
				<h1>Login</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput('email', 'Email', 'email')}
					{this.renderInput('password', 'Password', 'password')}
					{this.renderButton('Login')}
				</form>
			</div>
		);
	}
}
