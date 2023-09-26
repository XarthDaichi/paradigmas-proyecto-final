import { NextResponse } from 'next/server'
import scriptJson from '../../../../../scripts.json'

export async function GET(request: Request) {
    const id: number = Number(request.url.slice(request.url.lastIndexOf('/') + 1)) - 1
    debugger;
    const script: Script = id < scriptJson.length ? scriptJson[id] : {id: -1, text: '', name: ''}

    if (script.id === -1) return NextResponse.json({"message": `Error gathering script id: ${id + 1}`})

    return NextResponse.json(script)
}
