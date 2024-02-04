import {Inject, OnInit, Res, Service} from '@tsed/common';
import {MongooseModel} from '@tsed/mongoose';
import {Category} from 'src/models/Category';

@Service()
export class CategoryService implements OnInit {
	@Inject(Category)
	private Category: MongooseModel<Category>;
	async find() {
		const courses = await this.Category.find();

		if (courses.length < 0) {
			throw new Error('No categories found');
		}

		return courses;
	}

	async create(payload: any) {
		const category = await this.Category.create(payload);
		return category;
	}

	async $onInit(): Promise<void | Promise<any>> {
		const titles = [
			'Mathematics',
			'Science',
			'Programming',
			'Language',
			'Arts',
			'History',
			'Business',
			'Health',
			'Music',
			'Cooking',
			'Design',
			'Photography',
			'Fitness',
		];
		const count = await this.Category.find();

		if (count.length != 0) {
			return;
		}

		for (let i = 0; i < titles.length; i++) {
			await this.Category.create({title: titles[i]});
		}
	}
}
