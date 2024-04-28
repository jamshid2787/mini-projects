import get from 'lodash/get';
import { IEntity } from 'types';

export const User = (item?: any): IEntity.User => ({
	id: get(item, 'id'),
	name: get(item, 'name'),
	username: get(item, 'username'),
	email: get(item, 'email'),
	city: get(item, 'address.city'),
	zipcode: get(item, 'address.zipcode'),
	phone: get(item, 'phone'),
	website: get(item, 'website'),
});
