import puppeteer from 'puppeteer-core'
import { resolve } from 'node:path'

const BASE_URL = process.env.BASE_URL || 'https://open-crm-web.vercel.app'
const TARGET = `${BASE_URL}/sv/produkten`
const OUT_DIR = resolve('./public/screenshots')

const MODULES = [
  'workspace',
  'kunder',
  'projekt',
  'forslag',
  'kalender',
  'workflows',
  'ekonomi',
  'personal',
  'epost',
  'chat',
]

const browser = await puppeteer.launch({
  executablePath: '/usr/bin/google-chrome',
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})

const page = await browser.newPage()
await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: 2 })

console.log(`→ ${TARGET}`)
await page.goto(TARGET, { waitUntil: 'networkidle0', timeout: 60_000 })
await new Promise((r) => setTimeout(r, 2000))

const articles = await page.$$('article')
console.log(`  found ${articles.length} articles`)

for (let i = 0; i < articles.length && i < MODULES.length; i++) {
  const article = articles[i]
  const frame = await article.$('div.relative.mx-auto')
  if (!frame) {
    console.log(`  ✗ ${MODULES[i]}: frame not found`)
    continue
  }

  await page.evaluate((el) => el.scrollIntoView({ block: 'center' }), frame)
  await new Promise((r) => setTimeout(r, 600))

  const out = resolve(OUT_DIR, `${MODULES[i]}.png`)
  await frame.screenshot({ path: out })
  console.log(`  ✓ ${MODULES[i]}`)
}

await browser.close()
console.log('done')
