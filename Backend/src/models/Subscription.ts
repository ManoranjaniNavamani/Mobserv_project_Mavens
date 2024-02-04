import {Model, ObjectID, Ref, Select} from '@tsed/mongoose';
import {Default, Required} from '@tsed/schema';
import {User} from './User';
import {Course} from './Course';

@Model()
export class Subscription {
	@Select(true)
	@ObjectID('_id')
	_id: string;

	@Required()
	@Ref(() => User)
	user: Ref<User>;

	@Required()
	@Ref(() => Course)
	course: Ref<Course>;

	@Default(Date.now)
	createdAt: Date = new Date();
}
