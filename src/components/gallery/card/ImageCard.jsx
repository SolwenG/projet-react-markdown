export default function ImageCard({ name, src }) {
  return (
    <div className="flex flex-col justify-center gap-1 items-center cursor-pointer shadow-sm rounded-lg">
      <img src={src} alt="avatar" className="rounded-t-lg max-w-3xs" />
      <p className="p-1">{name}</p>
    </div>
  )
}
