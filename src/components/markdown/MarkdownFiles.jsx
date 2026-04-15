import { useEffect, useState } from "react"
import { test } from "../../db"

function Markdown() {
  // States
  const [width, handleWidth] = useState(window.innerWidth)
  const [height, handleHeight] = useState(window.innerHeight)

  // Function
  function updateSizes() {
    handleHeight(window.innerHeight)
    handleWidth(window.innerWidth)
    console.log('coucou')
  }

  // Effects
  useEffect(() => {
    window.addEventListener('resize', async () => {
      updateSizes()
      await test()
    })

    return () => { window.removeEventListener('resize', updateSizes) }
  }, []);

  // Render
  return (
    <div>
      <h1>Widht: { width }</h1>
      <h1>Height: { height }</h1>
    </div>
  )
}

export default Markdown
