import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

export function read(file: string) : string {
    try {
        return JSON.parse(readFileSync(join(__dirname, `../../../../../${file}`), 'utf8'))
    } catch (error) {
        console.error('Error loading script: ', error)
        return '{}'
    }
}

export function write(file: string, object_json: string) {
    try {
        writeFileSync(join(__dirname, `../../../../../${file}`), object_json)
    } catch (error) {
        console.error('Error loading script: ', error)
    }
}

export function loadScripts() {
    try {
        const scriptData = read('scripts.json')
        if (scriptData === '' || scriptData === '{}') return []

        return JSON.parse(scriptData)

    } catch (error) {
        console.error('Error loading script: ', error)
        return {}
    }
}