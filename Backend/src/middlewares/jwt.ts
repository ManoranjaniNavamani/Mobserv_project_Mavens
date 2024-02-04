import {Context, Inject, Req, Res} from '@tsed/common';
import {Unauthorized} from '@tsed/exceptions';
import {Arg, OnInstall, OnVerify, Protocol} from '@tsed/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {UserService} from '../services/user.service';
import {User} from '../models/User';
import {MongooseModel} from '@tsed/mongoose';

@Protocol({
	name: 'jwt',
	useStrategy: Strategy,
	settings: {
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: String(process.env.SECRET),
	},
})
export class JwtProtocol implements OnVerify, OnInstall {
	@Inject(User)
	private User: MongooseModel<User>;

	async $onVerify(
		@Req() req: Req,
		@Arg(0) jwtPayload: any,
		@Res() res: Res,
		@Context() ctx: Context
	) {
		let userFound: User | null = await this.User.findById(jwtPayload.sub);

		if (!userFound) {
			return res.status(401).json({success: false, err: 'unauthorized'});
		}
		ctx.user = userFound;
		return userFound;
	}
	$onInstall(strategy: Strategy): void {}
}
