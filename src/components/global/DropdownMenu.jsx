export default function DropdownMenu({ actions }) {
  return (
    <ul className="flex flex-col items-center gap-2">
      {actions.map(({ label, onClick }) => (
        <li
          key={label}
          className="cursor-pointer px-2 py-1 text-white rounded-sm hover:bg-gray-300 hover:text-black"
          onClick={onClick}
        >
          {label}
        </li>
      ))}
    </ul>
  )
}
