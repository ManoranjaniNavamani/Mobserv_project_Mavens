import {UserStatusService} from './backgroundJob/user-online-status';
import {Configuration, Inject} from '@tsed/di';
import {PlatformApplication} from '@tsed/common';
import '@tsed/platform-express';
import bodyParser from 'body-parser';
import compress from 'compression';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import cors from 'cors';
import '@tsed/ajv';
import '@tsed/swagger';
import {config} from './config';
import * as rest from './controllers/rest';
import * as pages from './controllers/pages';
import session from 'express-session';
import {specOS3} from './spec/specOS3';
import './middlewares';
const rootDir = __dirname;

@Configuration({
	...config,
	acceptMimes: ['application/json'],
	httpPort: process.env.PORT || 8000,
	httpsPort: false, // CHANGE
	statics: {
		'/': [
			{
				root: `./public`,
				hook: '$beforeRoutesInit',
			},
		],
	},
	processEntites: false,
	componentsScan: [
		`${rootDir}/services/**/**.ts`,
		`${rootDir}/validation/**.ts`,
		`${rootDir}/controllers/**/**.ts`,
		`${rootDir}/cron-jobs/**.ts`,
		`${rootDir}/middlewares/**.ts`,
	],
	mount: {
		'/api': [...Object.values(rest)],
		'/': [...Object.values(pages)],
	},
	swagger: [
		{
			path: '/api',
			specVersion: '3.0.1',
			spec: specOS3,
		},
	],
	middlewares: [
		cors(),
		cookieParser(),
		compress({}),
		methodOverride(),
		bodyParser.json(),
		bodyParser.urlencoded({
			extended: true,
		}),
		session({
			secret: String(process.env.SECRET),
			resave: false,
			saveUninitialized: true,
			cookie: {secure: true},
		}),
	],
})
export class Server {
	@Inject()
	protected app: PlatformApplication;
	@Inject(UserStatusService)
	UserStatusService: UserStatusService;
	@Configuration()
	protected settings: Configuration;

	$onInit(): void {
		this.UserStatusService.startBackgroundJob();
	}
}
