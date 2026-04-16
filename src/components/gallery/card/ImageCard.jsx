export default function ImageCard() {
  return (
    <div className="flex flex-col justify-center gap-1 items-center cursor-pointer shadow-sm rounded-lg">
      <img
        src="https://docs.material-tailwind.com/img/face-2.jpg"
        alt="avatar"
        className="rounded-t-lg max-w-3xs"
      />
      <p className="p-1">MyImageName.jpg</p>
    </div>
  )
}
