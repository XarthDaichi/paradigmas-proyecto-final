import { NextResponse } from 'next/server'
import { read } from '../../../fs'

export async function GET() {
  return NextResponse.json(read('about.json'));
}
