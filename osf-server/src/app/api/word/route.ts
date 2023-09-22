import { NextResponse } from 'next/server'
import keywordsJson from '../../../../keywords.json'

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const key = searchParams.get('key')

    if (!key) return NextResponse.json({text: key, isKeyword: false})

    const isKeyword = keywordsJson.includes(key.trim())

    return NextResponse.json({text: key, isKeyword})
}