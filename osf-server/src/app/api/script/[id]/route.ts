import { NextResponse } from 'next/server'

const FS_URL = "http://localhost:3000/api/fs"

async function loadScripts() {
    try {
        const scriptDataResponse = await fetch(`${FS_URL}?file=scripts.json`)
        const scriptData = await scriptDataResponse.json()
        if (scriptData === '' || scriptData === '{}') return []

        return scriptData

    } catch (error) {
        console.error('Error loading script: ', error)
        return {}
    }
}

export async function GET(request: Request) {
    const pos: number = Number(request.url.slice(request.url.lastIndexOf('/') + 1)) - 1
    const scripts: Script[] = await loadScripts()
    const script: Script = pos < scripts.length ? scripts[pos] : {id: -1, text: '', name: ''}
    if (script.id === -1) return NextResponse.json({"message": `Error gathering script id: ${pos + 1}`})
    // console.log(script)
    return NextResponse.json(script)
}
