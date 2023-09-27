import { NextResponse, NextRequest } from 'next/server'

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
  const { name, text }: Partial<Script> = await req.json()

  if (!text) return NextResponse.json({"message": "Missing script text"})
  if (!name) return NextResponse.json({"message": "Missing script text"})

  const transpiledScript: TranspiledScript = {timestamp: new Date().toISOString(), text: text, name: name}
  // const timeStampedText = `Echo from server: at ${new Date().toISOString()}: \n ${text} \n Nombre: ${name}.json`
  console.log(transpiledScript)
  return NextResponse.json({result: JSON.stringify(transpiledScript)})
}
