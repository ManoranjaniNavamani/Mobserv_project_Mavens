import {Required, Default, ErrorMsg, Nullable} from '@tsed/schema';
import {Model, ObjectID, Ref, Select} from '@tsed/mongoose';
import {Course} from './Course';
import {User} from './User';

@Model()
export class Chat {
	@Select(true)
	@ObjectID('_id')
	_id: string;

	@Ref(User)
	users: User[];
}
