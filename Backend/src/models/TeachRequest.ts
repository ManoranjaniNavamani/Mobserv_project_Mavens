import {Model, ObjectID, Ref, Select} from '@tsed/mongoose';
import {Default, Required} from '@tsed/schema';
import {User} from './User';
import {Status} from './Enum';

@Model()
export class TeachRequest {
	@Select(true)
	@ObjectID('_id')
	_id: string;

	@Required()
	experience: string;
	@Required()
	skills: string;
	@Required()
	description: string;

	@Default(Date.now)
	createdAt: Date = new Date();

	@Default(Status.Pending)
	status: Status;

	@Required()
	@Ref(User)
	createdBy: Ref<User>;
	@Ref(User)
	adminedBy: Ref<User>;
}
