import { NextResponse, NextRequest } from 'next/server'
import { write } from '@/lib/utils/fs'
import { Script, TranspiledScript } from '@/lib/types'
import { exec } from 'child_process'
import { join } from 'path'

export async function OPTIONS(request: Request) {
    const response = new NextResponse(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
        "Access-Control-Max-Age": "86400",
      },
    });
  
    return response;
}

export async function POST(req: Request) {
    const { timestamp, name, text }: TranspiledScript = await req.json()

    const execution_results = new Promise((resolve, reject) => {
      exec(`node ${join(process.cwd(), name)}`, (error, stdout) => {
        if (error) {
          reject(`Error: ${error.message}`);
        } else {
          resolve(stdout);
        }
      })
    })

    const timeStampedText = `Echo from server: at ${new Date().toISOString()}: \n ${await execution_results} \n Nombre: ${name}.json`
    // write('ra_fake.txt', timeStampedText)
    return NextResponse.json({ result: timeStampedText, message: "Saved" })
}
