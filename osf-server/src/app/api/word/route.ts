import { NextResponse } from 'next/server'
import { read } from '../../../fs'

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const key = searchParams.get('key')

    return !key ? NextResponse.json({text: key, isKeyword: false}) : NextResponse.json({text: key, isKeyword : read('keywords.json').includes(key.trim())})
}
