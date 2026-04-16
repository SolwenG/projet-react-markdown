export default function ActionsModal() {
  return (
    <div className="absolute top-8 right-2 border border-black px-4 py-2 bg-black rounded-sm z-10">
      <ul className="flex flex-col items-center gap-2">
        <ActionLine
          name="Export"
          onClick={() => alert('Not implemented yet')}
        />
        <ActionLine
          name="Rename"
          onClick={() => alert('Not implemented yet')}
        />
        <ActionLine
          name="Delete"
          onClick={() => alert('Not implemented yet')}
        />
      </ul>
    </div>
  )
}

function ActionLine({ name, onClick }) {
  return (
    <li
      className="cursor-pointer px-2 py-1 text-white rounded-sm hover:bg-gray-300 hover:text-black"
      onClick={onClick}
    >
      {name}
    </li>
  )
}
