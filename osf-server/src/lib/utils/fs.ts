import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

export function read(file: string) {
    try {
        return JSON.parse(readFileSync(join(process.cwd(), file), 'utf8'))
    } catch (error) {
        console.error('Error loading script: ', error)
        return '{}'
    }
}

export function write(file: string, object_json: string) {
    try {
        writeFileSync(join(process.cwd(), file), object_json)
    } catch (error) {
        console.error('Error loading script: ', error)
    }
}