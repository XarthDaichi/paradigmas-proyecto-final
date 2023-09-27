import { NextResponse } from 'next/server'

const FS_URL = "http://localhost:3000/api/fs"


export async function GET() {
    const res = await fetch(`${FS_URL}?file=keywords.json`)
    return NextResponse.json({keywords: await res.json()})
}
