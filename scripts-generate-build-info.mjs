import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'))
const now = new Date()

const formatter = new Intl.DateTimeFormat('uk-UA', {
  timeZone: 'Europe/Kyiv',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

const formatted = formatter.format(now).replace(',', '')
const content = `export const buildInfo = ${JSON.stringify({
  version: pkg.version,
  stage: 'MVP',
  buildDateTime: formatted,
  commitHash: process.env.GITHUB_SHA ?? null,
}, null, 2)} as const\n`

const outFile = fileURLToPath(new URL('./src/build-info.ts', import.meta.url))
mkdirSync(dirname(outFile), { recursive: true })
writeFileSync(outFile, content)
