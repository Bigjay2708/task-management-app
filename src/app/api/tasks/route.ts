import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Task from '@/models/Task';

export async function GET() {
  try {
    await dbConnect();
    const tasks = await Task.find({}).sort({ createdAt: -1 });
    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await dbConnect();
    
    const task = await Task.create(body);
    return NextResponse.json(task, { status: 201 });  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}
