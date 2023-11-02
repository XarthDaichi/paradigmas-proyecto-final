import { NextResponse, NextRequest } from 'next/server'
import { Script, TranspiledScript } from '@/lib/types'
import { write } from '@/lib/utils/fs';
// import dns from 'node:dns'

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
  const { _id, name, text }: Script = await req.json()
  if (!text) return NextResponse.json({"message": "Missing script text"})
  if (!name) return NextResponse.json({"message": "Missing script name"})

  // dns.setDefaultResultOrder( 'ipv4first')

  const response = await fetch(`http://localhost:${process.env.SWIPLPORT}/compile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(typeof(_id) === undefined ? { name, text } : {id : _id, name : name, text : name })
  })

  const prologResponse : TranspiledScript = await response.json()

  write(prologResponse.name, prologResponse.text)

  return NextResponse.json({result: prologResponse})
}
