import { NextResponse } from 'next/server'
// import keywordsJson from '../../../../keywords.json'
const FS_URL = "http://localhost:3000/api/fs"

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const key = searchParams.get('key')

    if (!key) return NextResponse.json({text: key, isKeyword: false})

    const keywordsResponse = await fetch(`${FS_URL}?file=keywords.json`) 
    const keywordsJson = await keywordsResponse.json()
    const isKeyword = keywordsJson.includes(key.trim())

    return NextResponse.json({text: key, isKeyword})
}
