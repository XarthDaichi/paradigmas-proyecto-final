import { NextResponse } from 'next/server'
import { getAbout } from '@/lib/mongo/about'

export async function GET() {
  const {about, error} = await getAbout()
  return NextResponse.json(about);
}
