import { Form } from 'components';
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
		try {await Api.Login(values);
			toast.success(`Successfully Login ${values.email}`);
		} catch (err: any) {
			if (err instanceof Error) console.log('ERROR = ', err.message);
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