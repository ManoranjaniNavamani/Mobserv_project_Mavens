import {Inject, Res, Service} from '@tsed/common';
import {MongooseModel} from '@tsed/mongoose';
import {Course} from '../models/Course';
import {FilterQuery} from 'mongoose';
import fs from 'fs';
import {User} from '../models/User';
import {Rating} from '../models/Rating';
import {Chapter} from 'src/models/Chapter';
import {Subscription} from 'src/models/Subscription';

@Service()
export class CourseService {
	@Inject(Course)
	private Course: MongooseModel<Course>;
	@Inject(Rating)
	private Rating: MongooseModel<Rating>;
	@Inject(Chapter)
	private Chapter: MongooseModel<Chapter>;
	@Inject(Subscription)
	private Subscription: MongooseModel<Subscription>;

	async find(
		filter: FilterQuery<Course>,
		take: number,
		skip: number,
		sortBy?: string | undefined
	) {
		const courses = await this.Course.find(filter)
			.limit(take)
			.skip(skip)
			.sort(sortBy)
			.populate('createdBy')
			.exec();

		if (courses.length < 0) {
			throw new Error('No course found');
		}

		const coursesWithRatings = await Promise.all(
			courses.map(async (course) => {
				const ratings: Rating[] = await this.Rating.find({
					courseId: course._id,
				});

				let totalRatings = 0;

				for (const rating of ratings) {
					totalRatings += rating.rating;
				}

				const averageRating =
					ratings.length > 0 ? totalRatings / ratings.length : 0;

				return {
					...course.toObject(),
					averageRating,
				};
			})
		);

		if (courses.length < 0) {
			throw new Error('No course found');
		}

		return coursesWithRatings;
	}

	async findById(id: string, user: string) {
		const course = await this.Course.findById(id).populate('createdBy').exec();

		if (!course) {
			throw new Error('No course found');
		}

		const ratings: Rating[] = await this.Rating.find({
			courseId: course._id,
		}).populate('createdBy');

		const chapters: Chapter[] = await this.Chapter.find({
			courseId: course._id,
		});

		const subscription = await this.Subscription.findOne({
			course: id,
			user: user,
		});

		let totalRatings = 0;

		for (const rating of ratings) {
			totalRatings += rating.rating;
		}

		const averageRating =
			ratings.length > 0 ? totalRatings / ratings.length : 0;

		const courseWithRatings = {
			...course.toObject(),
			averageRating,
			isSubscribed: subscription ? true : false,
		};

		return {course: courseWithRatings, ratings, chapters};
	}

	async create(payload: Course) {
		const course = await this.Course.create(payload);
		return course;
	}

	async rate(payload: Rating, createdBy: User, res: Res) {
		if (!payload.courseId || !createdBy) {
			throw new Error('Missing data');
		}

		if (payload.rating > 5 || payload.rating < 0) {
			return res
				.status(400)
				.json({message: 'Rating should be between 0 and 5'});
		}
		const response = await this.Rating.findOne({
			courseId: payload.courseId,
			createdBy: createdBy._id,
		});

		if (response) {
			return res
				.status(409)
				.json({message: 'You have already rated the following course'});
		}

		const course = await this.Course.findById(payload.courseId);

		if (!course) {
			return res.status(404).json({message: 'Course not found'});
		}
		const rating = await this.Rating.create(payload);
		return res
			.status(201)
			.json({message: 'Created Successfully', data: rating});
	}

	async postFile(res: Res, file: any) {
		if (!file)
			return res
				.status(400)
				.json({success: false, err: 'File should be of type MP4'});

		const filename = file.filename;
		const mimetype = file.mimetype.substring(file.mimetype.indexOf('/') + 1);

		fs.rename(
			`./public/uploads/${filename}`,
			`./public/uploads/${filename}.${mimetype}`,
			function (err) {
				if (err) return res.status(500).json({success: false, err: ''});
			}
		);
		return `${filename}.${mimetype}`;
		// return `${process.env.PRODUCTION_URL}/uploads/${filename}.${mimetype}`;
	}

	async enroll(courseId: string, createdBy: string, res: Res) {
		const course = await this.Course.findById(courseId);

		if (!course) {
			return res.status(404).json({message: 'Course not found'});
		}

		const sub = await this.Subscription.findOne({
			user: createdBy,
			course: courseId,
		});

		if (sub) {
			return res.status(200).json({message: 'user already subscribed'});
		}
		const subscription = await this.Subscription.create({
			user: createdBy,
			course: courseId,
		});
		return subscription;
	}

	async getSubscriptions(user: string) {
		const subscription = await this.Subscription.find({
			user: user,
		}).populate('course');

		return subscription;
	}
}
