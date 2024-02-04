import {Required, Default, ErrorMsg, Nullable} from '@tsed/schema';
import {Model, ObjectID, Ref, Select, Unique} from '@tsed/mongoose';
import {Course} from './Course';

@Model()
export class Category {
	@Select(true)
	@ObjectID('_id')
	_id: string;

	@Unique()
	@Required().Error('Title is Required')
	title: string;
}
