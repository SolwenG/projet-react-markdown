import { useState } from 'react'
import useClickOutside from '../../hooks/useClickOutside.js'

export default function DropdownMenu({
  trigger,
  actions,
  position = 'right',
  width = 'w-40',
}) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useClickOutside(() => setIsOpen(false))

  const positionClasses = {
    right: 'right-0',
    left: 'left-0',
  }

  const handleClick = (onClick) => {
    onClick()
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div
          className={`absolute ${positionClasses[position]} mt-2 ${width} bg-white rounded-lg shadow-lg border border-gray-200 z-50`}
        >
          {actions.map(({ label, onClick, danger }) => (
            <button
              key={label}
              onClick={() => handleClick(onClick)}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 text-sm ${
                danger ? 'text-red-600 hover:bg-red-50' : 'text-gray-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
