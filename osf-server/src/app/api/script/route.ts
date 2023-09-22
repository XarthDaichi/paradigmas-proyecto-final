import { NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs'
import scriptJson from '../../../../scripts.json'

function loadScripts() {
    try {
        const scriptData = readFileSync('scripts.json', 'utf8')
        if (scriptData === '' || scriptData === '{}') return []

        var scripts = JSON.parse(scriptData)

        return scripts
    } catch (error) {
        console.error('Error loading script: ', error)
        return {}
    }
}


export async function POST(req: Request) {
    var scripts = loadScripts()

    const { name, text }: Partial<Script> = await req.json()

    if (!name) return NextResponse.json({"message": "Missing script name"})
    if (!text) return NextResponse.json({"message": "Missing script"})

    const id = scripts.length + 1

    const newScript: Script = {id, name, text}

    scripts.push(newScript)

    writeFileSync('scripts.json', JSON.stringify(scripts))

    return NextResponse.json({"message": "Script saved"})
}