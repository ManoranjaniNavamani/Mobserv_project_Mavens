import {Email, Required, Default, ErrorMsg, Nullable} from '@tsed/schema';
import {Model, ObjectID, Ref, Select, Unique} from '@tsed/mongoose';
import {Role} from './Enum';
import {User} from './User';
import {Rating} from './Rating';

@Model()
export class Course {
	@Select(true)
	@ObjectID('_id')
	_id: string;

	@Required().Error('Title is Required')
	title: string;

	@Required().Error('Description is Required')
	description: string;

	@Required().Error('Price is Required')
	price: string;

	@Required().Error('Image is Required')
	imageUrl: string;

	@Default(Date.now)
	createdAt: Date = new Date();

	@Required()
	@Ref(User)
	createdBy: Ref<User>;
}
