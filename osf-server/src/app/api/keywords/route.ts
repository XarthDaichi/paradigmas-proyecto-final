import { NextResponse } from 'next/server'
import { getKeywords } from '@/lib/mongo/keywords'
import { Keyword } from '@/lib/types'

export async function GET() {
    const {keywords, error} = await getKeywords()
    let keywordsParsed : string[] = []
    !keywords? keywordsParsed = [] : keywords.map((word) => (keywordsParsed.push(word.keyword)))
    return NextResponse.json({keywords: keywordsParsed})
}
