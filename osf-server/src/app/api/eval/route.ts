import { NextResponse, NextRequest } from 'next/server'
import { write } from '../../../fs'

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
    write('ra_fake.txt', timeStampedText)
    return NextResponse.json({ result: timeStampedText, message: "Saved" })
}
