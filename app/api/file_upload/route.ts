import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create filename with timestamp to avoid conflicts
    const filename = `${Date.now()}-${file.name}`;
    const filepath = join(process.cwd(), 'public', 'productImages', filename);

    // Ensure directory exists
    await mkdir(join(process.cwd(), 'public', 'productImages'), { recursive: true });

    // Write file
    await writeFile(filepath, buffer);

    // Return the public path
    return NextResponse.json({ path: `/productImages/${filename}` }, { status: 200 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}