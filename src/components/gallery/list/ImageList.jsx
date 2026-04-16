import ImageCard from '../card/ImageCard'

export default function List() {
  return (
    <div>
      <h1>Hello</h1>
      <ul className="flex items-center gap-4 flex-wrap max-w-[60vw] justify-center mx-auto">
        <li>
          <ImageCard />
        </li>
        <li>
          <ImageCard />
        </li>
        <li>
          <ImageCard />
        </li>
        <li>
          <ImageCard />
        </li>
        <li>
          <ImageCard />
        </li>
        <li>
          <ImageCard />
        </li>
        <li>
          <ImageCard />
        </li>
        <li>
          <ImageCard />
        </li>
        <li>
          <ImageCard />
        </li>
      </ul>
    </div>
  )
}
