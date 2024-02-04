import {TeachRequest} from './../../models/TeachRequest';
import {Controller, Inject} from '@tsed/di';
import {
	BodyParams,
	Context,
	PathParams,
	QueryParams,
} from '@tsed/platform-params';
import {Get, Patch, Post} from '@tsed/schema';
import {User} from '../../models/User';
import {Authenticate} from '@tsed/passport';
import {Res} from '@tsed/common';
import {FilterQuery} from 'mongoose';
import {TeachRequestService} from 'src/services/TeachRequest';
import {Role} from '../../models/Enum';
@Controller('/teach-request')
export class TeachRequestController {
	@Inject(TeachRequestService)
	private teachRequestService: TeachRequestService;

	@Post('/')
	@Authenticate('jwt')
	async post(
		@Context('user') user: User,
		@Res() res: Res,
		@BodyParams() body: any
	) {
		try {
			const result = await this.teachRequestService.create({
				experience: body.experience,
				skills: body.skills,
				description: body.description,
				createdBy: user._id,
			});

			return res.status(201).send(result);
		} catch (err) {
			return res.status(500).send({message: err.message});
		}
	}

	@Get('/latest')
	@Authenticate('jwt')
	async findByUser(@Context('user') user: User, @Res() res: Res) {
		const result = await this.teachRequestService.findLatestByUser(user);
		return res.status(200).send(result);
	}

	@Get('/')
	@Authenticate('jwt')
	async find(
		@Context('user') user: User,
		@QueryParams('filter') filter: FilterQuery<TeachRequest>,
		@Res() res: Res
	) {
		if (user.role != Role.Admin) {
			res.status(401).send({message: 'Not authorized'});
		}
		const result = await this.teachRequestService.find(filter);
		return res.status(200).send(result);
	}

	@Patch('/decline/:id')
	@Authenticate('jwt')
	async decline(
		@Context('user') user: User,
		@Res() res: Res,
		@PathParams('id') id: any
	) {
		try {
			if (user.role != Role.Admin) {
				return res.status(401).send({message: 'unauthorized'});
			}
			const result = await this.teachRequestService.decline(id);

			return res.status(201).send(result);
		} catch (err) {
			return res.status(500).send({message: err.message});
		}
	}

	@Patch('/accept/:id')
	@Authenticate('jwt')
	async accept(
		@Context('user') user: User,
		@Res() res: Res,
		@PathParams('id') id: any
	) {
		try {
			if (user.role != Role.Admin) {
				return res.status(401).send({message: 'unauthorized'});
			}
			const result = await this.teachRequestService.accept(id);

			return res.status(201).send(result);
		} catch (err) {
			return res.status(500).send({message: err.message});
		}
	}
}
