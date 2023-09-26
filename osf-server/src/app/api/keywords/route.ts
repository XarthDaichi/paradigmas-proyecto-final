import { NextResponse } from 'next/server'
import keywordsJson from '../../../../keywords.json'


export async function GET() {
    return NextResponse.json({keywords: keywordsJson})
}
