import {OpenSpec3} from '@tsed/openspec';
import {specInfo} from './specInfo';

export const specOS3: Partial<OpenSpec3> = {
	info: specInfo,
	components: {
		securitySchemes: {
			bearerAuth: {
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
			},
		},
	},
};
