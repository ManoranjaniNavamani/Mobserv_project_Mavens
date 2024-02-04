export default {
	id: 'default',
	url: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017',
	connectionOptions: {
		maxIdleTimeMS: 180000,
		serverSelectionTimeoutMS: 30000,
	},
};
