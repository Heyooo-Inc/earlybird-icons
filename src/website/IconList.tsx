import { FC, useMemo } from "react"
import { isValid } from '@heyooo-inc/utils'
import toast from 'react-hot-toast'
import copy from 'copy-to-clipboard'

import LineIcons from '../line.json'
import SolidIcons from '../solid.json'
import { Icon } from '../icon'

interface IconListProps {
  type: string
  query?: string
}

export const IconList: FC<IconListProps> = ({ query, type }) => {
  const list = useMemo(() => {
    const _list = type === 'line' ? LineIcons : SolidIcons

    if (isValid(query)) {
      return _list
        .map(({ category, icons }) => {
          const filtered = icons.filter(icon => icon.name.toLowerCase().includes(query!) || icon.title.toLowerCase().includes(query!))

          if (filtered.length > 0) {
            return {
              category,
              icons: filtered
            }
          }

          return undefined
        })
        .filter(Boolean) as typeof LineIcons
    }

    return _list
  }, [type, query])

  function handleClick(name: string) {
    copy(`<Icon name="${name}" />`)

    toast(`${name} copied`, {
      id: 'toast-copied',
      className: 'text-sm',
      icon: '👏'
    })
  }

  return (
    <div className="space-y-[60px] pt-[40px] pb-[80px]">
      {list.map(({category, icons}) => (
        <div key={category}>
          <div className="text-xl text-gray-900">{category}</div>

          <div className="mt-4 grid grid-cols-8 gap-5">
            {icons.map(icon => (
              <div 
                key={icon.name} 
                className="py-[24px] px-[8px] flex flex-col items-center gap-5 border border-gray-200 rounded-xl cursor-pointer transition-colors hover:border-blue-600"
                onClick={() => handleClick(icon.name)}
              >
                <div className="w-[40px] h-[40px] flex items-center justify-center">
                  <Icon name={icon.name} />
                </div>
                <div className="w-full truncate text-xs text-gray-500 text-center">{icon.name}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}