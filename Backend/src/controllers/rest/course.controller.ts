import {Controller, Inject} from '@tsed/di';
import {
	BodyParams,
	Context,
	PathParams,
	QueryParams,
} from '@tsed/platform-params';
import {Get, Post, Put, Delete} from '@tsed/schema';
import {User} from '../../models/User';
import {Authenticate} from '@tsed/passport';
import {MulterOptions, MultipartFile, Res, Req} from '@tsed/common';
import {CourseService} from '../../services/course.service';
import {FilterQuery} from 'mongoose';
import {Course} from '../../models/Course';
import path from 'path';
import {Ref} from '@tsed/mongoose';

@Controller('/course')
export class CourseController {
	@Inject(CourseService)
	private courseService: CourseService;

	@Post('/')
	@Authenticate('jwt')
	@MulterOptions({
		dest: './public/uploads',
		fileFilter(req: Req, file, cb) {
			const allowedExtensions = ['.png', '.jpeg', '.jpg'];
			const extension = path.extname(file.originalname).toLowerCase();
			const mimetype = file.mimetype;
			if (
				allowedExtensions.includes(extension) &&
				(mimetype === 'image/png' || mimetype === 'image/jpeg')
			) {
				cb(null, true);
			} else {
				cb(null, false);
				const error = new Error(
					'Invalid file format. Only PNG and JPEG are allowed.'
				);
				error.name = 'MulterError';
				cb(error);
			}
		},
	})
	async post(
		@Context('user') user: User,
		@Res() res: Res,
		@Req() req: Req,
		@BodyParams() body: any,
		@MultipartFile('file') file: Express.Multer.File
	) {
		try {
			let response = await this.courseService.postFile(res, file);
			const result = await this.courseService.create({
				...body,
				imageUrl: response,
				createdBy: user._id as Ref<User>,
			});

			return res
				.status(201)
				.send({message: 'Course created successfully', data: result});
		} catch (err) {
			return res.status(500).send({message: err.message});
		}
	}

	@Get('/')
	@Authenticate('jwt')
	async find(
		@QueryParams('filter') filter: FilterQuery<Course>,
		@QueryParams('take') take: number,
		@QueryParams('skip') skip: number,
		@QueryParams('sortBy') sortBy: string | undefined,
		@Res() res: Res
	) {
		filter = filter ? filter : {};
		take = take ? take : 20;
		skip = skip ? skip : 0;
		sortBy = sortBy ? sortBy : undefined;
		const result = await this.courseService.find(filter, take, skip, sortBy);

		return result;
	}

	@Get('/:id')
	@Authenticate('jwt')
	async findById(
		@Context('user') user: User,
		@PathParams('id') id: string,
		@Res() res: Res
	) {
		if (!id) {
			return res.status(404).json({message: 'id required'});
		}
		const result = await this.courseService.findById(id, user._id);

		return result;
	}

	@Post('/rate/:id')
	@Authenticate('jwt')
	async rate(
		@Context('user') user: User,
		@Res() res: Res,
		@BodyParams() body: any,
		@PathParams('id') id: string
	) {
		try {
			const payload = {...body, courseId: id, createdBy: user._id};
			await this.courseService.rate(payload, user, res);
		} catch (err) {
			return res.status(500).send({message: err.message});
		}
	}

	@Get('/subscriptions')
	@Authenticate('jwt')
	async getSubscription(
		@Context('user') user: User,
		@Res() res: Res,
		@BodyParams() body: any,
		@PathParams('id') id: string
	) {
		try {
			const subs = await this.courseService.getSubscriptions(user._id);
			return res.status(200).send(subs);
		} catch (err) {
			return res.status(500).send({message: err});
		}
	}

	@Post('/subscribe/:id')
	@Authenticate('jwt')
	async subscribe(
		@Context('user') user: User,
		@Res() res: Res,
		@PathParams('id') id: string
	) {
		try {
			const subs = await this.courseService.enroll(id, user._id, res);
			return res.status(201).send(subs);
		} catch (err) {
			return res.status(500).send({message: err});
		}
	}
}
