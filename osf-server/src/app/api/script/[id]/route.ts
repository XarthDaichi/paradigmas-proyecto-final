import { NextResponse } from 'next/server'
import { Script } from '@/lib/types'
import { ObjectId } from 'mongodb'
import { deleteScript, getScript } from '@/lib/mongo/scripts'

export async function GET(request: Request) {
    const _id: ObjectId = new ObjectId(request.url.slice(request.url.lastIndexOf('/') + 1))
    const { script, error } = await getScript(_id) 
    return NextResponse.json(script)
}

export async function DELETE(request: Request) {
    const _id: ObjectId = new ObjectId(request.url.slice(request.url.lastIndexOf('/') + 1))
    const { deletedCount, error } = await deleteScript(_id)
    return NextResponse.json({"message": `Deleted Correctly: ${deletedCount} file`})
}