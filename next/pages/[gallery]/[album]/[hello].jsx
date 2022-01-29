/* global fetch */

import Head from 'next/head'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const HelloWorld = styled.h1`
  font-size: 6rem;
  color: crimson;
  text-align: center;
`

function Hello() {
  const [photos, setPhotos] = useState([])
  const [hasError, setError] = useState(false)

  useEffect(async () => {
    try {
      const response = await fetch('http://localhost:3005/api/flickr')
      const result = await response.json()
      setPhotos(result.photos)
    } catch (e) {
      setError(true)
    }
  }, [])

  return (
    <div>
      <Head>
        <title>Hello World</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>
        <HelloWorld>Hello World!</HelloWorld>
        {hasError && 'Sorry try again later'}
        <ul>
          {photos.map((photo) => (
            <img key={photo.path} src={photo.path} alt={photo.alt} width="200" height="140" />
          ))}
        </ul>
      </h1>
    </div>
  )
}

export default Hello
