/* global fetch */

import Head from 'next/head'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

function Hello() {
  const HelloWorld = styled.h1`
    font-size: 6rem;
    color: crimson;
    text-align: center;
  `

  const [photos, setPhotos] = useState([])

  useEffect(async () => {
    const response = await fetch('http://localhost:3005/api/flickr')
    const result = await response.json()
    setPhotos(result.photos)
  }, [])

  return (
    <div>
      <Head>
        <title>Hello World</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>
        <HelloWorld>Hello World!</HelloWorld>
        <ul>
          {photos.map((photo) => (
            <img src={photo.path} alt={photo.alt} width="200" height="140" />
          ))}
        </ul>
      </h1>
    </div>
  )
}

export default Hello
