import { NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

export async function POST(req: Request) {
    const transpiledScript = await req.json()
    writeFileSync(join(__dirname, `../../../../../../ra_fake.txt`), transpiledScript)
    return NextResponse.json({"message": "Wrote ra_fake.txt correctly"})
}