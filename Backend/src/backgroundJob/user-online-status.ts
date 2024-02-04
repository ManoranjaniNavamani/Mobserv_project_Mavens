import {Inject, Service} from '@tsed/di';
import {MongooseModel} from '@tsed/mongoose';
import {User} from '../models/User';

@Service()
export class UserStatusService {
	@Inject(User)
	User: MongooseModel<User>;

	startBackgroundJob(): void {
		console.log('User Status Service Started...');

		setInterval(() => {
			this.checkUserStatus();
		}, 10000);
	}

	async checkUserStatus(): Promise<void> {
		try {
			const tenSecondsAgo = new Date(Date.now() - 10000);

			const updateResult = await this.User.updateMany(
				{
					lastLogin: {$lt: tenSecondsAgo},
				},
				{
					$set: {isOnline: false},
				}
			);
		} catch (err) {
			console.error(err);
		}
	}
}
