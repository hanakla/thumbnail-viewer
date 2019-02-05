export const toJpeg = async (src: string, quality: number) => {
  const image = new Image()
  image.src = src
  await image.decode()

  const canvas = document.createElement('canvas')
  canvas.width = image.width
  canvas.height = image.height

  canvas.getContext('2d').drawImage(image, 0, 0)
  const blob = await new Promise(resolve => {
    canvas.toBlob(
      blob => {
        resolve(blob)
      },
      'image/jpeg',
      quality
    )
  })

  return blob
}
