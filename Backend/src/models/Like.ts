import {Email, Required, Default, ErrorMsg, Nullable} from '@tsed/schema';
import {Model, ObjectID, Ref, Select, Unique} from '@tsed/mongoose';
import {Role} from './Enum';
import {User} from './User';
import {Course} from './Course';

@Model()
export class Like {
	@Select(true)
	@ObjectID('_id')
	_id: string;

	@Required()
	course: Ref<Course>;

	@Required()
	user: Ref<User>;

	@Default(Date.now)
	createdAt: Date = new Date();
}
