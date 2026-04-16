import { useState } from 'react'
import ImageCard from '../card/ImageCard'

const FAKE_IMAGES = [
  {
    id: 1,
    name: 'myImage1.jpg',
    src: 'https://docs.material-tailwind.com/img/face-1.jpg',
  },
  {
    id: 2,
    name: 'myImage2.jpg',
    src: 'https://docs.material-tailwind.com/img/face-2.jpg',
  },
  {
    id: 3,
    name: 'myImage3.jpg',
    src: 'https://docs.material-tailwind.com/img/face-3.jpg',
  },
  {
    id: 4,
    name: 'myImage4.jpg',
    src: 'https://docs.material-tailwind.com/img/face-1.jpg',
  },
  {
    id: 5,
    name: 'myImage5.jpg',
    src: 'https://docs.material-tailwind.com/img/face-2.jpg',
  },
  {
    id: 6,
    name: 'myImage6.jpg',
    src: 'https://docs.material-tailwind.com/img/face-2.jpg',
  },
]

export default function List() {
  const [openModalId, setOpenModalId] = useState(null)

  const handleToggleModal = (id) => {
    setOpenModalId(openModalId === id ? null : id)
  }

  return (
    <div>
      <h1>Hello</h1>
      <ul className="flex items-center gap-4 flex-wrap max-w-[60vw] justify-center mx-auto">
        {FAKE_IMAGES.map((image) => {
          return (
            <li key={image.id}>
              <ImageCard
                name={image.name}
                src={image.src}
                isModalOpen={openModalId === image.id}
                onToggleModal={() => handleToggleModal(image.id)}
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
