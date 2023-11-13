import mongoose from 'mongoose';

// Connection URL
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
	throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

export default async function dbConnect() {
	if (cached.connection) return cached.connection;

	// if (!cached.promise) {
	// }
	const opts = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		bufferCommands: false,
	};
	cached.promise = mongoose
		.connect(MONGODB_URI, opts)
		.then((mongoose) => {
			console.log('se conecta a la db');
			return mongoose;
		})
		.catch((err) => {
			console.log('entre al catch');
			console.log(err);
		});
	cached.connection = await cached.promise;

	return cached.conn;
}
export const DB = mongoose;
