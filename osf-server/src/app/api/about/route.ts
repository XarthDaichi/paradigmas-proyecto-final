import { NextResponse } from 'next/server'
import aboutJson from '../../../../about.json'

export async function GET() {
    return NextResponse.json(aboutJson)
}