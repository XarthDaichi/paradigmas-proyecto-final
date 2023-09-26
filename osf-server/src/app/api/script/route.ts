import { NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

export async function OPTIONS(request: Request) {
    const allowedOrigin = request.headers.get("origin");
    const response = new NextResponse(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
        "Access-Control-Max-Age": "86400",
      },
    });
  
    return response;
}

function loadScripts() {
    try {
        const scriptData = readFileSync(join(__dirname, '../../../../scripts.json'), 'utf8')
        if (scriptData === '' || scriptData === '{}') return []

        var scripts = JSON.parse(scriptData)

        return scripts
    } catch (error) {
        console.error('Error loading script: ', error)
        return {}
    }
}

export async function POST(req: Request) {
    var scripts = loadScripts()

    const { name, text }: Partial<Script> = await req.json()

    if (!name) return NextResponse.json({"message": "Missing script name"})
    if (!text) return NextResponse.json({"message": "Missing script"})

    const id = scripts.length + 1

    const newScript: Script = {id, name, text}

    scripts.push(newScript)

    console.log(scripts)

    writeFileSync(join(__dirname, '../../../../scripts.json'), JSON.stringify(scripts))

    return NextResponse.json({"message": "Script saved"})
}

export async function GET() {
    var scripts = loadScripts()

    return NextResponse.json({"length": scripts.length})
}
