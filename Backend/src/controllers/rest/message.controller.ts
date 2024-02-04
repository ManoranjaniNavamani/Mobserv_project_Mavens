import {Controller, Inject} from '@tsed/di';
import {
	BodyParams,
	Context,
	PathParams,
	QueryParams,
} from '@tsed/platform-params';
import {Get, Post} from '@tsed/schema';
import {User} from '../../models/User';
import {Authenticate} from '@tsed/passport';
import {MultipartFile, Res, Req} from '@tsed/common';
import {MessageService} from 'src/services/message.service';

@Controller('/message')
export class MessageController {
	@Inject(MessageService)
	private messageService: MessageService;

	@Get('/chat')
	@Authenticate('jwt')
	async get(
		@Context('user') user: User,
		@QueryParams('users') users: [string],
		@Res() res: Res
	) {
		try {
			const result = await this.messageService.findByChatId(users);

			return res.status(200).send({message: 'Chats Found', data: result});
		} catch (err) {
			return res.status(500).send({message: err.message});
		}
	}

	@Post('/')
	@Authenticate('jwt')
	async post(
		@Context('user') user: User,
		@BodyParams() body: any,
		@Res() res: Res
	) {
		try {
			body.sender = user._id;
			const result = await this.messageService.create(body);

			return res.status(201).send({message: 'Chats Found', data: result});
		} catch (err) {
			return res.status(500).send({message: err.message});
		}
	}
}
