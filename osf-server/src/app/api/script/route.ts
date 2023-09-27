import { NextResponse } from 'next/server'

const FS_URL = "http://localhost:3000/api/fs"

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

async function loadScripts() {
    try {
        const scriptDataResponse = await fetch(`${FS_URL}?file=scripts.json`)
        const scriptData = await scriptDataResponse.json()
        if (scriptData === '' || scriptData === '{}') return []

        return scriptData

    } catch (error) {
        console.error('Error loading script: ', error)
        return {}
    }
}

export async function POST(req: Request) {
    let scripts = await loadScripts()

    const { name, text }: Partial<Script> = await req.json()

    if (!name) return NextResponse.json({"message": "Missing script name"})
    if (!text) return NextResponse.json({"message": "Missing script"})

    const id = scripts.length + 1

    const newScript: Script = {id, name, text}

    scripts.push(newScript)

    const res = await fetch(`${FS_URL}/script`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(scripts)
    })

    console.log(await res.json())

    return NextResponse.json({"message": "Script saved"})
}

export async function GET() {
    let scripts = await loadScripts()
    let names: Partial<Script>[] = []

    scripts.forEach(function (script:Script) {
        names.push({"id": script.id, "name": script.name})
    })
    return NextResponse.json(names)
}
