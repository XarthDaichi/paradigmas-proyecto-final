import { NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

export async function POST(req: Request) {
    const newScripts = await req.json()
    console.log(newScripts)
    writeFileSync(join(__dirname, `../../../../../../scripts.json`), JSON.stringify(newScripts))
    return NextResponse.json({"message": "Wrote Scripts correctly"})
}