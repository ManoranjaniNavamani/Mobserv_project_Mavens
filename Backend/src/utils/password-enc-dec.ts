import bcrypt from 'bcrypt';

export async function cryptPassword(password: string) {
	try {
		const salt = await bcrypt.genSalt(10);
		return await bcrypt.hash(password, salt);
	} catch (err) {
		throw err;
	}
}

export async function comparePassword(plainPass: string, hashword: string) {
	try {
		return await bcrypt.compare(plainPass, hashword);
	} catch (err) {
		throw err;
	}
}
