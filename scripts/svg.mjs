import { parse, stringify } from 'svgson'
import { isValidArray, toCamelCase } from './helper.mjs'

function parseNodeChildren(node) {
  if (isValidArray(node.children)) {
    node.children.forEach(parseNodeChildren)
  }

  Object.keys(node.attributes).forEach(key => {
    const value = node.attributes[key]

    if (key.includes('-')) {
      node.attributes[toCamelCase(key)] = value
      delete node.attributes[key]
    }

    if ((key === 'fill' || key === 'stroke') && value === 'black') {
      node.attributes[key] = 'currentColor'
    }
  })
}

async function parseSvg(name, content) {
  const node = await parse(content)

  node.attributes['{...props}'] = ''
  node.children.forEach(parseNodeChildren)

  return node
}

export async function svgReactComponent(name, iconName, content) {
  const svg = await parseSvg(name, content)
  const _className = `icon icon-earlybird icon-earlybird-${name.toLowerCase()}`

  return `import { FC, SVGProps } from 'react'
import { classnames }  from '../classnames'

export const ${iconName}: FC<SVGProps<SVGSVGElement>> = ({ className, ...restProps }) => {
  return (
    ${stringify(svg).replace('{...props}=""', `role="img" aria-label="${name.toLowerCase()}" className={classnames('${_className}', className)} {...restProps}`)}
  )
}
`
}
