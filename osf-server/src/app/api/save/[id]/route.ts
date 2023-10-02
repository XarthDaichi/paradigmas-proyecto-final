import { NextResponse } from 'next/server'
import { loadScripts, write } from '../../../../fs'

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

export async function POST(request: Request) {
    const { id, name, text }: Script = await request.json()

    if (!id) return NextResponse.json({"message": "Missing script id"})
    if (!name) return NextResponse.json({"message": "Missing script name"})
    if (!text) return NextResponse.json({"message": "Missing script text"})

    let scripts: Script[] = loadScripts()

    if (id > scripts.length - 1) return NextResponse.json({"message": "Invalid script id"})

    scripts[id-1].name = name
    scripts[id-1].text = text
    write('scripts.json', JSON.stringify(scripts))
    return NextResponse.json({"message": "Saved Correctly changed"})
}