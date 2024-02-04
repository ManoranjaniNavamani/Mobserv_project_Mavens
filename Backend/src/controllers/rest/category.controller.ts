import {Controller, Inject} from '@tsed/di';
import {BodyParams, Context} from '@tsed/platform-params';
import {Get, Post} from '@tsed/schema';
import {User} from '../../models/User';
import {Authenticate} from '@tsed/passport';
import {MultipartFile, Res, Req} from '@tsed/common';
import {CategoryService} from '../../services/category.service';

@Controller('/category')
export class CategoryController {
	@Inject(CategoryService)
	private categoryService: CategoryService;

	@Post('/')
	@Authenticate('jwt')
	async post(
		@Context('user') user: User,
		@Res() res: Res,
		@BodyParams() body: any,
		@MultipartFile('file') file: Express.Multer.File
	) {
		try {
			const result = await this.categoryService.create({
				title: body.title,
			});

			return res
				.status(201)
				.send({message: 'Category created successfully', data: result});
		} catch (err) {
			return res.status(500).send({message: err.message});
		}
	}

	@Get('/')
	@Authenticate('jwt')
	async find(@Res() res: Res) {
		const result = await this.categoryService.find();

		return result;
	}
}
