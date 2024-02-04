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
import {MulterOptions, MultipartFile, Res, Req} from '@tsed/common';
import {FilterQuery} from 'mongoose';
import {Course} from '../../models/Course';
import path from 'path';
import {Ref} from '@tsed/mongoose';
import {ChapterService} from 'src/services/chapter.service';
import fs from 'fs';

@Controller('/chapter')
export class ChapterController {
	@Inject(ChapterService)
	private chapterService: ChapterService;

	@Post('/')
	@Authenticate('jwt')
	@MulterOptions({
		dest: './public/videos',
		fileFilter(req: Req, file, cb) {
			const allowedExtensions = ['.mp4'];
			const extension = path.extname(file.originalname).toLowerCase();
			const mimetype = file.mimetype;
			if (allowedExtensions.includes(extension) && mimetype === 'video/mp4') {
				cb(null, true);
			} else {
				cb(null, false);
				const error = new Error('Invalid file format. Only Mp4 is allowed.');
				error.name = 'MulterError';
				cb(error);
			}
		},
	})
	async post(
		@Context('user') user: User,
		@Res() res: Res,
		@BodyParams() body: any,
		@MultipartFile('file') file: Express.Multer.File
	) {
		try {
			let response = await this.chapterService.postFile(res, file);
			const result = await this.chapterService.create({
				...body,
				videoUrl: response,
				createdBy: user._id as Ref<User>,
			});

			return res
				.status(201)
				.send({message: 'Course created successfully', data: result});
		} catch (err) {
			return res.status(500).send({message: err.message});
		}
	}

	@Get('/course/:id')
	@Authenticate('jwt')
	async find(
		@QueryParams('filter') filter: FilterQuery<Course>,
		@PathParams('id') id: string,
		@QueryParams('take') take: number,
		@QueryParams('skip') skip: number,
		@QueryParams('sortBy') sortBy: string | undefined,
		@Res() res: Res
	) {
		filter = filter ? filter : {};
		take = take ? take : 20;
		skip = skip ? skip : 0;
		sortBy = sortBy ? sortBy : undefined;

		filter = {...filter, courseId: id};
		const result = await this.chapterService.find(filter, take, skip, sortBy);

		return result;
	}

	@Get('/:id')
	@Authenticate('jwt')
	async findById(@PathParams('id') id: string, @Res() res: Res) {
		if (!id) {
			return res.status(404).json({message: 'id required'});
		}
		const result = await this.chapterService.findById(id);

		return result;
	}

	@Get('/stream/:id')
	@Authenticate('jwt')
	async stream(@PathParams('id') id: string, @Res() res: Res) {
		const videoPath = path.join(__dirname, '../../../private/videos', id);

		try {
			fs.statSync(videoPath);
		} catch (err) {
			return res.status(404).send({message: 'File not found'});
		}
		const videoData = fs.readFileSync(videoPath);

		res.setHeader('Content-Type', 'video/mp4');
		res.setHeader('Content-Length', videoData.length);
		res.setHeader('Content-Disposition', `inline; filename=${id}`);

		const videoStream = fs.createReadStream(videoPath);

		res.status(200).end(videoData);
		videoStream.on('error', (err) => {
			console.error('Error streaming video:', err);
			return res.status(500).send({message: 'unkown error occured'});
		});
	}
}
