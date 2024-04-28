import { IForm } from 'modules/auth/types';
import { Form } from 'components';
import * as yup from 'yup';
import { Api } from 'modules/auth';
import toast from 'react-hot-toast';

export default class Register extends Form<IForm.Register> {
	state = {
		values: { email: '', password: '', name: '' },
		errors: {},
		isLoading: false,
	};

	schema = yup.object({
		email: yup.string().email().required(),
		password: yup.string().min(6).required(),
		name: yup.string().min(4).required(),
	});

	doSubmit = async (values: IForm.Register) => {
		this.setState({ isLoading: true });
		try {
			await Api.Register(values);
			toast.success(`Successfully registered ${values.email}`);
		} catch (err: any) {
			if (err instanceof Error) console.log('ERROR = ', err.message);
		} finally {
			this.setState({ isLoading: false });
		}
	};

	render() {
		return (
			<div className="container">
				<h1>Register</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput('email', 'Email', 'email')}
					{this.renderInput('password', 'Password', 'password')}
					{this.renderInput('name', 'Name')}
					{this.renderButton('Register')}
				</form>
			</div>
		);
	}
}
