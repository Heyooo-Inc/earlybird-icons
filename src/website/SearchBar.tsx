import { ChangeEvent, FC, useRef, useState } from "react"
import { Icon } from "../icon"

interface SearchBarProps {
  type: string
  onTypeChange: (type: string) => void
  onQueryChange: (query: string) => void
}

export const SearchBar: FC<SearchBarProps> = ({ type, onTypeChange, onQueryChange }) => {
  const lock = useRef(false)

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.type === 'compositionstart') {
      lock.current = true
      return
    }

    if (event.type === 'compositionend') {
      lock.current = false
    }

    if (!lock.current) {
      onQueryChange(event.target.value)
    }
  }

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    onTypeChange(event.target.value)
  }

  return (
    <div className="mt-[40px] px-4 py-2 border border-gray-200 rounded-xl gap-5 flex items-center">
      <Icon className="w-5 h-5 text-gray-600" name="search-line" />
      <input className="flex-1 !outline-none" placeholder="Search icons" onChange={handleInputChange} />
      <select value={type} onChange={handleSelectChange}>
        <option value="line">Line</option>
        <option value="solid">Solid</option>
        <option value="color">Mutilcolor</option>
      </select>
    </div>
  )
}