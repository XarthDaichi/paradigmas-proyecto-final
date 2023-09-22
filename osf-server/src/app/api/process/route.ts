import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const { text }: Partial<Script> = await req.json()

    const timeStampedText = `Echo from server: at ${new Date().toISOString()}: ${text}`
    console.log(timeStampedText)
    return NextResponse.json({ result: timeStampedText })
}