export namespace IEntity {
	export interface User {
		id: string;
		name: string;
		email: string;
	}
}

export namespace IForm {
	export interface Login {
		email: string;
		password: string;
	}
	export interface Register extends IForm.Login {
		name: string;
	}
	export interface Me extends IForm.Login {
		token: string;
	}
}

export namespace IApi {
	export namespace Login {
		export interface Request extends IForm.Login {}
		export interface Response {
			data: string;
		}
	}
	export namespace Register {
		export interface Request extends IForm.Register {}
		export type Response = IEntity.User;
	}
	export namespace Me {
		export interface Request extends IForm.Me {}
		export type Response = IEntity.User;
	}
}
