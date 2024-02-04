import {Controller, Inject} from '@tsed/di';
import {BodyParams, Context} from '@tsed/platform-params';
import {Get, Post} from '@tsed/schema';
import {User} from '../../models/User';
import {Authenticate} from '@tsed/passport';
import {MultipartFile, Res, Req} from '@tsed/common';
import {CategoryService} from '../../services/category.service';
import {ChatService} from 'src/services/chat.service';

@Controller('/chat')
export class ChatController {
	@Inject(ChatService)
	private chatService: ChatService;

	@Get('/')
	@Authenticate('jwt')
	async post(@Context('user') user: User, @Res() res: Res) {
		try {
			const result = await this.chatService.findChatsByUser(user._id);

			if (result.length == 0) {
				return res.status(404).send({message: 'Chats Not found'});
			}
			return res.status(201).send({message: 'Chats Found', data: result});
		} catch (err) {
			return res.status(500).send({message: err.message});
		}
	}
}
