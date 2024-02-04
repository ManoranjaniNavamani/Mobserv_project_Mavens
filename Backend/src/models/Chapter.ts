import {Required, Default, ErrorMsg, Nullable} from '@tsed/schema';
import {Model, ObjectID, Ref, Select} from '@tsed/mongoose';
import {Course} from './Course';

@Model()
export class Chapter {
	@Select(true)
	@ObjectID('_id')
	_id: string;

	@Required().Error('Title is Required')
	title: string;

	@Required().Error('Description is Required')
	description: string;

	@Required().Error('Video Url Required')
	videoUrl: string;

	@Required()
	studyTime: string;

	@Default(Date.now)
	createdAt: Date = new Date();

	@Required()
	@Ref(Course)
	courseId: Ref<Course>;
}
