export function buildComponent(componentName, icons) {
  return `import { FC, SVGProps } from 'react'
${icons.map(c => `import { ${c.iconName} } from './icons/${c.iconName}'`).join('\n')}

export const ${componentName}: FC<{ name: string } & SVGProps<SVGSVGElement>> = ({ name, ...restProps }) => {
  switch (name) {
${icons.map(c => {
    return `
    case '${c.name}':
      return <${c.iconName} {...restProps} />
  `
  }).join('\n')}
    default:
      return null
  }
}
`
}
