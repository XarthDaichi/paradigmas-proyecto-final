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

export async function POST(request: Request) {
    const { id, name, text }: Script = await request.json()

    if (!id) return NextResponse.json({"message": "Missing script id"})
    if (!name) return NextResponse.json({"message": "Missing script name"})
    if (!text) return NextResponse.json({"message": "Missing script text"})

    let scripts: Script[] = await loadScripts()

    if (id > scripts.length - 1) return NextResponse.json({"message": "Invalid script id"})

    scripts[id-1].name = name
    scripts[id-1].text = text
    const res = await fetch(FS_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(scripts)
    })
    console.log(await res.json())
    return NextResponse.json({"message": "Name successfully changed"})
}