export namespace IEntity {
	export interface Todo {
		id: string;
		title: string;
		description: string;
		complete: boolean;
		createdAt: string;
	}
}

interface StandardResponse<T> {
	data: T;
	message: string;
	success: boolean;
}

export namespace IApi {
	export namespace Todo {
		export namespace List {
			export interface Request {}
			export interface Response extends StandardResponse<IEntity.Todo[]> {}
		}

		export namespace Create {
			export interface Request extends IForm.Create {}
			export interface Response extends StandardResponse<IEntity.Todo> {}
		}

		export namespace Delete {
			export interface Request extends IForm.Delete {}
			export interface Response extends StandardResponse<IEntity.Todo> {}
		}

		export namespace Update {
			export interface Request extends IForm.Update {}
			export interface Response extends StandardResponse<IEntity.Todo> {}
		}
	}
}

export namespace IForm {
	export interface Create extends Pick<IEntity.Todo, 'title' | 'description'> {}
	export interface Delete extends Pick<IEntity.Todo, 'id'> {}
	export interface Update extends Pick<IEntity.Todo, 'id' | 'title' | 'description'> {}
}
