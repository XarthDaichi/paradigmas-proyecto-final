import { NextResponse } from 'next/server'
import { loadScripts, write } from '../../../fs'

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

export async function POST(req: Request) {
    let scripts = loadScripts()
    const { name, text }: Partial<Script> = await req.json()

    if (!name) return NextResponse.json({"message": "Missing script name"})
    if (!text) return NextResponse.json({"message": "Missing script text"})

    const id = scripts.length + 1

    const newScript: Script = {id, name, text}

    scripts.push(newScript)

    write('scripts.json', JSON.stringify({"scripts" : scripts}))

    return NextResponse.json({"message": "Script saved"})
}

export async function GET() {
    let scripts = loadScripts()
    let names: Partial<Script>[] = []

    scripts.forEach(function (script:Script) {
        names.push({"id": script.id, "name": script.name})
    })
    return NextResponse.json(names)
}
