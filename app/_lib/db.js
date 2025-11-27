import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error(
        'Please define MONGODB_URI in .env.local → https://mongodb.com/atlas'
    );
}

let cached = global.mongoose;

if (!cached) {
    // We attach it to `global` so it survives module reloads
    cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
    // If we already have a ready connection → return it immediately (fast path)
    if (cached.conn) {
        return cached.conn;
    }

    // If a connection attempt is already in progress → reuse that promise
    // Prevents multiple simultaneous connection attempts
    if (!cached.promise) {
        // Mongoose connection options — optimized for serverless
        const opts = {
            bufferCommands: false, // Disable mongoose buffering (not needed with manual connect)
            // maxPoolSize: 10,    // Optional: limit concurrent connections (good for production)
            // serverSelectionTimeoutMS: 5000, // Optional: timeout if MongoDB unreachable
        };

        // Start connection and store the promise
        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
            console.log('MongoDB connected successfully'); // Visible in dev & production logs
            return mongooseInstance;
        }).catch((err) => {
            console.error('MongoDB connection failed:', err);
            // Reset promise so next call can retry
            cached.promise = null;
            throw err;
        });
    }

    try {
        // Wait for the connection promise to resolve
        cached.conn = await cached.promise;
        return cached.conn;
    } catch (e) {
        // On failure: clear the promise so next call can retry
        cached.promise = null;
        console.error('Connection attempt failed, will retry on next call');
        throw e; // Re-throw so API routes can handle 500 error
    }
}