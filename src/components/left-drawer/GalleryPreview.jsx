import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { fetchImages } from '../../store/slices/gallerySlice'

export default function GalleryPreview() {
  const dispatch = useDispatch()
  const { items } = useSelector((state) => state.images)
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()

  useEffect(() => {
    dispatch(fetchImages())
  }, [dispatch])

  const latestImages = items.slice(-4).reverse()

  const handleImageClick = (image) => {
    if (
      location.pathname.startsWith('/markdown/') &&
      location.pathname !== '/markdown'
    ) {
      const imageMarkdown = `!${image.name}`
      window.dispatchEvent(
        new CustomEvent('insertImage', { detail: imageMarkdown })
      )
    } else {
      navigate('/gallery')
    }
  }

  return (
    <div className="p-4 border-t border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-700 text-sm uppercase">
          {t('gallery.title')}
        </h3>
        <button
          onClick={() => navigate('/gallery')}
          className="text-orange-600 hover:text-orange-700 text-sm"
        >
          {t('gallery.viewAll')}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {latestImages.map((image) => (
          <button
            key={image.id}
            className="aspect-square bg-gray-100 rounded overflow-hidden cursor-pointer hover:opacity-80 p-0 border-0"
            onClick={() => handleImageClick(image)}
            title={
              location.pathname.startsWith('/markdown/') &&
              location.pathname !== '/markdown'
                ? t('gallery.insertHint', 'Click to insert into editor')
                : ''
            }
          >
            <img
              src={image.base64}
              alt={image.name}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {items.length === 0 && (
        <p className="text-sm text-gray-500">{t('gallery.noImages')}</p>
      )}
    </div>
  )
}
