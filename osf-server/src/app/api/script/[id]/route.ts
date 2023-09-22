import { NextResponse } from 'next/server'
import scriptJson from '../../../../../scripts.json'

export async function GET() {
    const scripts = scriptJson
    // const script = scriptJson.includes({ id } === id)
    return NextResponse.json(scripts)
}