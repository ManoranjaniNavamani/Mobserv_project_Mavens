import {Inject, Res, Service} from '@tsed/common';
import {MongooseModel} from '@tsed/mongoose';
import {FilterQuery} from 'mongoose';
import fs from 'fs';
import {Chapter} from 'src/models/Chapter';

@Service()
export class ChapterService {
	@Inject(Chapter)
	private Chapter: MongooseModel<Chapter>;
	async find(
		filter: FilterQuery<Chapter>,
		take: number,
		skip: number,
		sortBy?: string | undefined
	) {
		const courses = await this.Chapter.find(filter)
			.limit(take)
			.skip(skip)
			.sort(sortBy);
		if (courses.length < 0) {
			throw new Error('No chapters found');
		}
		return courses;
	}

	async findById(id: string) {
		const chapter = await this.Chapter.findById(id);
		if (!chapter) {
			throw new Error('No chapters found');
		}
		return chapter;
	}

	async create(payload: Chapter) {
		const chapter = await this.Chapter.create(payload);
		return chapter;
	}

	async postFile(res: Res, file: any) {
		if (!file)
			return res
				.status(400)
				.json({success: false, err: 'File should be of type Mp4'});

		const filename = file.filename;
		const mimetype = file.mimetype.substring(file.mimetype.indexOf('/') + 1);

		fs.rename(
			`./public/videos/${filename}`,
			`./public/videos/${filename}.${mimetype}`,
			function (err) {
				if (err)
					return res.status(500).json({message: 'An unexpected error occured'});
			}
		);
		return `${filename}.${mimetype}`;
	}
}
