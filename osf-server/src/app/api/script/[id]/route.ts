import { NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import scriptJson from '../../../../../scripts.json'

// const loadScripts = () => {
//     const scriptData = readFileSync(join(__dirname, '../../../../../scripts.json'), 'utf8')
//     try {
//         if (scriptData === '' || scriptData === '{}') return []

//         var scripts = JSON.parse(scriptData)

//         return scripts
//     } catch (error) {
//         console.error('Error loading script: ', error)
//         return {}
//     }
// }

export async function GET(request: Request) {
    const id: number = Number(request.url.slice(request.url.lastIndexOf('/') + 1)) - 1
    debugger;
    const script: Script = id < scriptJson.length ? scriptJson[id] : {id: -1, text: '', name: ''}

    if (script.id === -1) return NextResponse.json({"message": `Error gathering script id: ${id + 1}`})

    return NextResponse.json(script)
}
