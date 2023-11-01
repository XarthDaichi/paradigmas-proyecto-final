import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { updateScript } from '@/lib/mongo/scripts'
import { Script } from '@/lib/types';



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

export async function PUT(request: Request) {
    const _id: ObjectId = new ObjectId(request.url.slice(request.url.lastIndexOf('/') + 1))
    const { name, text }: Script = await request.json()

    if (!_id) return NextResponse.json({"message": "Missing script id"})
    if (!name) return NextResponse.json({"message": "Missing script name"})
    if (!text) return NextResponse.json({"message": "Missing script text"})
    const updatedScript: Script = {_id, name, text}
    const {modifiedCount, error} = await updateScript(updatedScript)
    console.log(modifiedCount)
    return NextResponse.json({"message": `Saved Correctly changed: ${modifiedCount} file`})
}