import {Required, Default, ErrorMsg, Nullable} from '@tsed/schema';
import {Model, ObjectID, Ref, Select} from '@tsed/mongoose';
import {User} from './User';
import {Chat} from './Chat';

@Model()
export class Message {
	@Select(true)
	@ObjectID('_id')
	_id: string;

	@Ref(User)
	sender: User;

	@Required()
	text: string;

	@Ref(Chat)
	chatId: Chat;

	@Default(Date.now)
	createdAt: Date = new Date();
}
