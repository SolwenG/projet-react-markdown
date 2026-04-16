import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function GalleryPreview() {
  const { images } = useSelector((state) => state.gallery)
  const navigate = useNavigate()

  const latestImages = images.slice(-4).reverse()

  return (
    <div className="p-4 border-t border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-700 text-sm uppercase">
          Gallery
        </h3>
        <button
          onClick={() => navigate('/gallery')}
          className="text-orange-600 hover:text-orange-700 text-sm"
        >
          View All
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {latestImages.map((image) => (
          <button
            key={image.id}
            className="aspect-square bg-gray-100 rounded overflow-hidden cursor-pointer hover:opacity-80 p-0 border-0"
            onClick={() => navigate('/gallery')}
          >
            <img
              src={image.data}
              alt={image.name}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {images.length === 0 && (
        <p className="text-sm text-gray-500">No images yet</p>
      )}
    </div>
  )
}
