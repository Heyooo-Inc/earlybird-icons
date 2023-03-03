import { readFileSync } from 'fs'
import { basename } from 'path'

export const toCamelCase = (string) => {
  return string.replace(/^([A-Z])|[\s-_]+(\w)/g, (_, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase())
}

export const toPascalCase = (string) => {
  const camelCase = toCamelCase(string)

  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1)
}

export const toUpperCase = (string) => {
  const upperCase = string.replaceAll('-', ' ')

  return upperCase.charAt(0).toUpperCase() + upperCase.slice(1)
}

export const readFile = (filePath) => {
  return readFileSync(filePath, { encoding: 'utf8' })
}

export const fileName = (filePath, ext) => {
  return basename(filePath).replace(ext, '')
}

export const isValidArray = (array) => {
  return Array.isArray(array) && array.length > 0
}
