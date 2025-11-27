import { NextResponse } from 'next/server';          
import { connectToDatabase } from '../../_lib/db'; 
import User from '@/app/_models/User';

export async function GET() {
    try {
        const db = await connectToDatabase();
        const users = await db.collection('users').find({}).toArray();
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const db = await connectToDatabase();
        const data = await request.json();
        const newUser = await db.collection('users').insertOne(data);
        return NextResponse.json(newUser.ops[0], { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }
}