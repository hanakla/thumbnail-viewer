import React, { useCallback, useEffect, useState } from 'react'
import immer from 'immer'
import s from './style.sass'
import { Thumbnail, ThumbSize } from '../Thumbnail'

interface State {
  imageUrl: string | null
}

export const App = () => {
  const [{ imageUrl }, setState] = useState<State>({ imageUrl: null })

  useEffect(() => {
    window.addEventListener('dragover', e => e.preventDefault())
    window.addEventListener('drop', e => e.preventDefault())
  })

  const handleDrop = useCallback(({ dataTransfer }: React.DragEvent) => {
    const file = dataTransfer.files[0]
    if (!file) return

    if (imageUrl) URL.revokeObjectURL(imageUrl)
    setState(
      immer(s => {
        s.imageUrl = URL.createObjectURL(file)
      })
    )
  }, [])

  return (
    <div className={s.root} onDrop={handleDrop}>
      {!imageUrl && <div className={s.dropzone}>Drop image here</div>}
      {imageUrl && (
        <div className={s.thumbs}>
          <div className={s.thumb}>
            <Thumbnail size={ThumbSize.pixivSearch} image={imageUrl} />
          </div>
          <div className={s.thumb}>
            <Thumbnail size={ThumbSize.pixivProfile} image={imageUrl} />
          </div>
          <div className={s.thumb}>
            <Thumbnail size={ThumbSize.tweetdeck} image={imageUrl} />
          </div>
        </div>
      )}
    </div>
  )
}
