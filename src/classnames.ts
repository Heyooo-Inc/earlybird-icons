export const classnames = (prefixClassName: string, className?: string) => {
  return className ? `${prefixClassName} ${className}` : prefixClassName
}
