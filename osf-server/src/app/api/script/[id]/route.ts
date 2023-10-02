import { NextResponse } from 'next/server'
import { loadScripts, write } from '../../../../fs'

export async function GET(request: Request) {
    const pos: number = Number(request.url.slice(request.url.lastIndexOf('/') + 1)) - 1
    const scripts: Script[] = loadScripts()
    const script: Script = pos < scripts.length ? scripts[pos] : {id: -1, text: '', name: ''}
    return script.id === -1 ? NextResponse.json({"message": `Error gathering script id: ${pos + 1}`}) : NextResponse.json(script)
}
