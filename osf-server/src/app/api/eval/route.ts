import { NextResponse, NextRequest } from 'next/server'

const FS_URL = "http://localhost:3000/api/fs"

export async function OPTIONS(request: Request) {
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
    const { name, text }: Partial<TranspiledScript> = await req.json()

    const timeStampedText = `Echo from server: at ${new Date().toISOString()}: \n ${text} \n Nombre: ${name}.json`
    console.log(timeStampedText)
    const res = await fetch(`${FS_URL}/eval`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application.json'
      },
      body: JSON.stringify(timeStampedText)
    })
    console.log(await res.json())
    return NextResponse.json({ result: timeStampedText, message: "Saved" })
}
