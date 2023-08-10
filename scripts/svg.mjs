import { parse, stringify } from 'svgson'
import { isValidArray, toCamelCase } from './helper.mjs'

function parseNodeChildren(type, node) {
  if (isValidArray(node.children)) {
    node.children.forEach(n => parseNodeChildren(type, n))
  }

  Object.keys(node.attributes).forEach(key => {
    const value = node.attributes[key]

    if (key.includes('-')) {
      node.attributes[toCamelCase(key)] = value
      delete node.attributes[key]
    }

    if (type !== 'color') {
      if ((key === 'fill' || key === 'stroke') && value === 'black') {
        node.attributes[key] = 'currentColor'
      }
    }
  })
}

async function parseSvg(type, content) {
  const node = await parse(content)

  node.attributes['{...props}'] = ''
  node.children.forEach(n => parseNodeChildren(type, n))

  return node
}

export async function svgReactComponent(type, name, iconName, content) {
  const svg = await parseSvg(type, content)
  const _className = `icon icon-earlybird icon-earlybird-${name.toLowerCase()}`

  return `import { FC, SVGProps } from 'react'
import { classnames }  from '../classnames'

export const ${iconName}: FC<SVGProps<SVGSVGElement>> = ({ className, ...restProps }) => {
  return (
    ${stringify(svg)
      .replace('{...props}=""', `role="img" aria-label="${name.toLowerCase()}" className={classnames('${_className}', className)} {...restProps}`)
      .replaceAll('stroke-width', 'strokeWidth')
      .replaceAll('stroke-linecap', 'strokeLinecap')
      .replaceAll('stroke-linejoin', 'strokeLinejoin')
    }
  )
}
`
}
