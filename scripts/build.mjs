import { readdirSync, writeFileSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { fileName, toPascalCase, readFile, toUpperCase } from './helper.mjs'
import { svgReactComponent } from './svg.mjs'
import { buildComponent } from './component.mjs'

const HOME_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const ICONS_DIR = resolve(HOME_DIR, 'icons')
const TYPES = ['line', 'solid']
const index = []
const icons = []

for (const type of TYPES) {
  const _dir = resolve(ICONS_DIR, type)
  const categories = readdirSync(_dir)
  const json = []

  for (const category of categories) {
    const catDir = resolve(_dir, category)
    const svgFiles = readdirSync(catDir)
    const _json = []

    for (const svgFile of svgFiles) {
      const name = fileName(svgFile, '.svg')
      const iconName = toPascalCase(`icon-${name}`)
      const content = readFile(resolve(catDir, svgFile))

      const component = await svgReactComponent(name, iconName, content)

      writeFileSync(resolve(HOME_DIR, `src/icons/${iconName}.tsx`), component)

      icons.push({
        name,
        iconName
      })

      _json.push({
        name,
        title: toUpperCase(name)
      })

      index.push(`export * from './${iconName}'`)
    }

    json.push({
      category,
      icons: _json
    })
  }

  writeFileSync(resolve(HOME_DIR, `src/${type}.json`), JSON.stringify(json, null, 2))
}

writeFileSync(resolve(HOME_DIR, 'src/icons/index.ts'), index.join('\n'))
writeFileSync(resolve(HOME_DIR, 'src/icon.tsx'), buildComponent('Icon', icons))
