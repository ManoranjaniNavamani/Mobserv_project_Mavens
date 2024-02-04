import {Controller, Inject} from '@tsed/di';
import {
	BodyParams,
	Context,
	PathParams,
	QueryParams,
} from '@tsed/platform-params';
import {Get, Post, Put, Delete, Security, Header, Returns} from '@tsed/schema';
import {User} from '../../models/User';
import {UserService} from '../../services/user.service';
import {Authenticate} from '@tsed/passport';
import {Req, Res} from '@tsed/common';

@Controller('/user')
export class UserController {
	@Inject(UserService)
	private usersService: UserService;

	@Post('/register')
	async post(@Res() res: Res, @BodyParams() body: any) {
		let response = await this.usersService.findOne({email: body.email});
		if (response) {
			return res.status(409).json({success: false, err: 'User already exists'});
		}
		return await this.usersService.create(body, res);
	}

	@Post('/login')
	async login(@Req() req: Req, @Res() res: Res, @BodyParams() body: any) {
		return await this.usersService.login(body, res);
	}

	@Get('/')
	@Authenticate('jwt')
	async get(
		@Context('user') user: User,
		@Res() res: Res,
		@QueryParams('filter') filter?: string,
		@QueryParams('take') take?: string,
		@QueryParams('skip') skip?: string,
		@QueryParams('sortBy') sortBy?: string
	) {
		const result = await this.usersService.find(
			filter,
			take,
			skip,
			sortBy,
			user
		);
		return res
			.status(200)
			.json({message: 'successfully found users', data: result});
	}

	@Get('/:id')
	@Authenticate('jwt')
	async getById(@PathParams('id') id: string, @Res() res: Res) {
		const response = await this.usersService.findById(id);
		if (!response) {
			return res.status(404).json({success: false, err: 'user not found'});
		}
		return res.status(200).json({message: 'user found', data: response});
	}
	@Get('/profile')
	@Authenticate('jwt')
	async getProfile(@Context('user') user: User, @Res() res: Res) {
		if (user) {
			return res.status(200).json({success: true, data: user});
		} else {
			return res
				.status(500)
				.json({success: false, err: 'Internal server error'});
		}
	}

	@Put('/')
	@Authenticate('jwt')
	async put(
		@Context('user') user: User,
		@Res() res: Res,
		@BodyParams() body: any
	) {
		return await this.usersService.update(user, res, body);
	}

	@Delete('/')
	@Authenticate('jwt')
	async delete(@Context('user') user: User, @Res() res: Res) {
		return await this.usersService.delete(user, res);
	}

	@Post('/forgot-password')
	async forgotPassword(
		@Req() req: Req,
		@Res() res: Res,
		@BodyParams() body: any
	) {
		return await this.usersService.forgetPasswordSendMail(req, res, body);
	}

	@Post('/reset-password')
	async resetPassword(
		@Req() req: Req,
		@Res() res: Res,
		@BodyParams() body: any
	) {
		return await this.usersService.resetPassword(req, res, body);
	}

	@Post('/online')
	@Authenticate('jwt')
	async updateOnline(@Context('user') user: User, @BodyParams() body: any) {
		this.usersService.updateOnline(user._id);
		return null;
	}
}
