import {Inject, OnInit, Res, Service} from '@tsed/common';
import {MongooseModel} from '@tsed/mongoose';
import {Chat} from '../models/Chat';

@Service()
export class ChatService {
	@Inject(Chat)
	private Chat: MongooseModel<Chat>;

	async findChatsByUser(userId: string): Promise<Chat[]> {
		const chats = await this.Chat.find({
			users: {$elemMatch: {$eq: userId}},
		})
			.populate({
				path: 'users',
				match: {_id: {$ne: userId}}, // Exclude the requesting user
			})
			.select('-users.password');

		return chats;
	}
}
