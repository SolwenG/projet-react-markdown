import { useState } from 'react'
import useClickOutside from '../../hooks/useClickOutside.js'

export default function DropdownMenuOld({
  trigger,
  children,
  position = 'right',
}) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useClickOutside(() => setIsOpen(false))

  const positionClasses = {
    right: 'right-0',
    left: 'left-0',
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="inline-block">
        {trigger}
      </div>
      {isOpen && (
        <div
          className={`absolute ${positionClasses[position]} mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-50`}
        >
          {children}
        </div>
      )}
    </div>
  )
}

export function DropdownItem({ onClick, children, danger = false }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2 hover:bg-gray-100 text-sm ${
        danger ? 'text-red-600 hover:bg-red-50' : 'text-gray-700'
      }`}
    >
      {children}
    </button>
  )
}
