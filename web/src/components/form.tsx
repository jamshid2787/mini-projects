import React, { Component } from 'react';
import * as yup from 'yup';
import Input from './input';

interface State<T> {
	values: T;
	errors: Partial<T>;
	isLoading: boolean;
}

class Form<
	IForm extends Record<TKey, string>,
	TKey extends keyof IForm = keyof IForm
> extends Component<{}, State<IForm>> {
	schema?: yup.ObjectSchema<IForm>;
	doSubmit?: (data: IForm) => void;

	validate = (values: IForm) => {
		const errors: Partial<IForm> = {};

		try {
			this.schema!.validateSync(values, { abortEarly: false });
			return null;
		} catch (error: any) {
			if (error instanceof yup.ValidationError)
				// @ts-ignore
				for (const { path = '', message } of error.inner) errors[path] = message;
			return errors;
		}
	};

	validateField = (name: TKey, value: string) => {
		const errors: Partial<IForm> = this.state.errors;

		if (!errors[name]) return errors;

		try {
			this.schema!.pick([name]).validateSync({ [name]: value }, { abortEarly: false });
			delete errors[name];
			return errors;
		} catch (error: any) {
			if (error instanceof yup.ValidationError)
				for (const { path = '', message } of error.inner) {
					// @ts-ignore
					errors[path] = message;
				}
			return errors;
		}
	};

	handleChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
		const errors = this.validateField(target.name as TKey, target.value);
		this.setState({ errors, values: { ...this.state.values, [target.name]: target.value } });
	};

	handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		const errors = this.validate(this.state.values);

		if (errors) return this.setState({ errors });

		this.doSubmit!(this.state.values);
	};

	renderInput = (name: TKey, label: string, type: React.HTMLInputTypeAttribute = 'text') => {
		return (
			<Input
				name={name as string}
				label={label}
				type={type}
				value={this.state.values[name]}
				error={this.state.errors[name]}
				onChange={this.handleChange}
			/>
		);
	};

	renderButton = (title: string) => {
		const { isLoading } = this.state;
		return (
			<button className={`btn btn-primary ${isLoading ? 'disabled' : ''}`} disabled={isLoading}>
				{isLoading ? `${title}...` : title}
			</button>
		);
	};
}

export default Form;
