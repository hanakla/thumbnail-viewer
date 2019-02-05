import classNames from 'classnames'
import React, { useState, useEffect } from 'react'
import s from './style.sass'
import { toJpeg } from '../../utils/toJpeg'

interface Props {
  size: ThumbSize
  image: string
}

export enum ThumbSize {
  pixivProfile = 'pixivProfile',
  pixivSearch = 'pixivSearch',
  tweetdeck = 'tweetdeck'
}

const sizeToTitle = (size: ThumbSize) => {
  switch (size) {
    case ThumbSize.pixivProfile:
      return 'pixiv (profile)'
    case ThumbSize.pixivSearch:
      return 'pixiv (search)'
    case ThumbSize.tweetdeck:
      return 'Tweetdeck(single)'
    default:
      throw new Error('¯_(ツ)_/¯')
  }
}

export const Thumbnail = ({ size, image }: Props) => {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    if (size === ThumbSize.tweetdeck) return setUrl(image)
    if (url) URL.revokeObjectURL(url)

    toJpeg(image, 0.05).then(jpegBlob => {
      const url = URL.createObjectURL(jpegBlob)
      setUrl(url)
    })

    return () => URL.revokeObjectURL(url)
  }, [image])

  return (
    <div className={classNames(s.root)}>
      <h2 className={s.title}>{sizeToTitle(size)}</h2>
      <div
        className={classNames(s.image, s[size])}
        style={{ backgroundImage: url ? `url(${url})` : void 0 }}
      />
    </div>
  )
}
