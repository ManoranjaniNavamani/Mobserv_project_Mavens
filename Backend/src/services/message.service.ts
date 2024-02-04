import {Inject, Service} from '@tsed/common';
import {MongooseModel} from '@tsed/mongoose';
import {Chat} from '../models/Chat';
import {Message} from '../models/Message';

@Service()
export class MessageService {
	@Inject(Message)
	private Message: MongooseModel<Message>;
	@Inject(Chat)
	private Chat: MongooseModel<Chat>;

	async findByChatId(users: [string]): Promise<Message[]> {
		const chat: any = await this.Chat.findOne({
			users: {$all: users},
		});

		if (!chat) {
			return [];
		}
		const messages = await this.Message.find({chatId: chat._id});
		return messages;
	}

	async create(body: any): Promise<Message> {
		let chat: any = await this.Chat.findOne({
			users: {$all: body.users},
		});

		if (!chat) {
			chat = await this.Chat.create({
				sender: body.sender,
				users: body.users,
			});
		}

		const message = await this.Message.create({
			text: body.text,
			sender: body.sender,
			chatId: chat._id,
		});
		return message;
	}
}
