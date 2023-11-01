import { NextResponse } from 'next/server'
import { getWord } from '@/lib/mongo/keywords'


export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const key = searchParams.get('key')
    const {word, error} = await getWord(!key? '' : key)
    return NextResponse.json({text: key, isKeyword : !word? false : true})
}
