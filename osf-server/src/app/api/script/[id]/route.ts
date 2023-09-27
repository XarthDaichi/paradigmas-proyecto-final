import { NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import scriptJson from '../../../../../scripts.json'

function loadScripts() {
    try {
        const scriptData = readFileSync(join(__dirname, '../../../../../../scripts.json'), 'utf8')
        if (scriptData === '' || scriptData === '{}') return []

        return JSON.parse(scriptData)

    } catch (error) {
        console.error('Error loading script: ', error)
        return {}
    }
}

export async function GET(request: Request) {
    const pos: number = Number(request.url.slice(request.url.lastIndexOf('/') + 1)) - 1
    const scripts: Script[] = loadScripts()
    const script: Script = pos < scripts.length ? scripts[pos] : {id: -1, text: '', name: ''}
    if (script.id === -1) return NextResponse.json({"message": `Error gathering script id: ${pos + 1}`})
    // console.log(script)
    return NextResponse.json(script)
}

export async function PUT(request: Request) {
    const { id, name }: Partial<Script> = await request.json()

    if (!id) return NextResponse.json({"message": "Missing script id"})
    if (!name) return NextResponse.json({"message": "Missing script name"})

    let scripts: Script[] = loadScripts()

    if (id > scripts.length - 1) return NextResponse.json({"message": "Invalid script id"})

    scripts[id-1].name = name
    writeFileSync(join(__dirname, '../../../../../../scripts.json'), JSON.stringify(scripts))

    return NextResponse.json({"message": "Name successfully changed"})
}
