import { NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const file = searchParams.get('file')
    console.log("reading file: ", file)

    return !file ? NextResponse.json({"message": "error getting file"}) : NextResponse.json(JSON.parse(readFileSync(join(__dirname, `../../../../../${file}`), 'utf8')))
}