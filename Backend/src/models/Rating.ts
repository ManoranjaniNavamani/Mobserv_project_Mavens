import {Required, Default, ErrorMsg, Nullable} from '@tsed/schema';
import {Model, ObjectID, Ref, Select} from '@tsed/mongoose';
import {User} from './User';
import {Course} from './Course';

@Model()
export class Rating {
	@Select(true)
	@ObjectID('_id')
	_id: string;

	@Ref(Course)
	courseId: Ref<Course>;

	@Required()
	rating: number;

	@Required()
	text: string;

	@Default(Date.now)
	createdAt: Date = new Date();

	@Ref(User)
	@Required()
	createdBy: Ref<User>;
}
