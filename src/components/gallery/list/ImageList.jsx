import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchImages, uploadImage } from '../../../store/images/imagesSlice.js'
import ImageCard from '../card/ImageCard'

export default function ImageList() {
  const dispatch = useDispatch()
  const { items, loading } = useSelector((state) => state.images)
  const [openModalId, setOpenModalId] = useState(null)

  useEffect(() => {
    dispatch(fetchImages())
  }, [dispatch])

  const handleToggleModal = (id) => {
    setOpenModalId(openModalId === id ? null : id)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      dispatch(uploadImage({ name: file.name, base64: reader.result }))
    }
    reader.readAsDataURL(file)
  }

  return (
    <div>
      <h1>Gallery</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />

      {loading && <p>Chargement...</p>}

      <ul className="flex items-center gap-4 flex-wrap max-w-[60vw] justify-center mx-auto">
        {items.map((image) => (
          <li key={image.id}>
            <ImageCard
              id={image.id}
              name={image.name}
              src={image.base64}
              isModalOpen={openModalId === image.id}
              onToggleModal={() => handleToggleModal(image.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
