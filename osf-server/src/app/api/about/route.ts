// import { limiter } from "../config/limiter"
import { NextResponse } from 'next/server';

const FS_URL = "http://localhost:3000/api/fs"

export async function GET() {
  const responseFS = await fetch(`${FS_URL}?file=about.json`)
  const about = await responseFS.json()
  return NextResponse.json(about);
}
