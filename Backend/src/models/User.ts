import {Email, Required, Default, ErrorMsg, Nullable} from '@tsed/schema';
import {Model, ObjectID, Select, Unique} from '@tsed/mongoose';
import {Role} from './Enum';

@Model()
export class User {
	@Select(true)
	@ObjectID('_id')
	_id: string;

	@Required().Error('First Name is Required')
	firstName: string;

	@Required().Error('Last Name is Required')
	lastName: string;

	@Required().Error('Email is Required')
	@Email()
	@Unique()
	email: string;

	@Default(`${process.env.PRODUCTION_URL}/profile/default.png`)
	profileImage: string;

	@Default(Date.now)
	lastLogin: Date = new Date();

	@Default(false)
	isOnline: boolean;

	@Default(Role.User)
	role: string;

	@Required().Error('Password is Required')
	@Select(false)
	password: string;

	@Nullable(String)
	@Default('')
	@Select(false)
	emailOTP: string;
}
