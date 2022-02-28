/* global fetch window */

import Head from 'next/head'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'

export async function getStaticPaths() {
  // Set path ids used from album
  const path = [1, 30, 2, 4, 5, 6]

  // Set required parameters for dynamic pages
  const paths = path.map((pathId) => ({
    params: {
      gallery: 'demo',
      album: 'sample',
      id: pathId.toString(),
    },
  }))

  // Return paths and set fallback to false if path doesn't exist
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  let title = ''
  let url = ''

  // Grab path id and set related API data
  if (context.params.id === '1') {
    title = 'Granville'
    url = 'http://localhost:3030/api/flickr/granville'
  } else if (context.params.id === '30') {
    title = 'Dining Room'
    url = 'http://localhost:3030/api/flickr/dining'
  } else if (context.params.id === '2') {
    title = 'Camping'
    url = 'http://localhost:3030/api/flickr/camping'
  } else if (context.params.id === '4') {
    title = 'Friend'
    url = 'http://localhost:3030/api/flickr/friend'
  } else if (context.params.id === '5') {
    title = 'YVR'
    url = 'http://localhost:3030/api/flickr/yvr'
  } else if (context.params.id === '6') {
    title = 'Brass Fish Tavern'
    url = 'http://localhost:3030/api/flickr/tavern'
  }

  // await and fetch related URL
  const response = await fetch(url)
  const data = await response.json()

  // Return related data in props
  return {
    props: { images: data, header: title },
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Title = styled.h1`
  font-size: 4rem;
  color: #008BCD;
  text-align: center;
`

const Error = styled.p`
  display: flex;
  justify-content: center;
  font-size: 2rem;
  color: white;
  background: #1a1a1a;
  padding: 2rem;
`

const ImageContainer = styled.ul`
  max-width: 1200px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1rem auto;
  padding: 0;
`

const ImageSelect = styled.li`
  display: inline-block;
  list-style: none;
  cursor: pointer;

  :hover {
    filter: opacity(50%);
  }
`

const Highlight = styled.img`
  width: 632px;
  margin: 0 auto;
`

export default function Images({ images, header }) {
  const [photos, setPhotos] = useState([])
  const [hasError, setError] = useState(false)
  const [bigImage, setBigImage] = useState('')
  const [bigImageAlt, setBigImageAlt] = useState('')
  const [highlighted, setHighlighted] = useState(false)

  function transformPhotos(photo) {
    return {
      id: photo.id,
      path: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
      alt: photo.title,
    }
  }

  useEffect(async () => {
    try {
      setPhotos(images.result.photos.photo.map(transformPhotos))
    } catch (error) {
      setError(true)
    }
  }, [])

  const imageHandler = (e) => {
    window.scrollTo(0, 0)

    const url = e.target.src
    const alt = 'Highlight'

    if (bigImage === url) {
      setBigImage('')
      setBigImageAlt('')
    } else {
      setBigImage(url)
      setBigImageAlt(alt)
    }
  }

  const highlightHandler = (e) => {
    if (!highlighted) {
      setHighlighted(true)
      e.target.style.filter = 'opacity(20%)'
    } else if (highlighted) {
      setHighlighted(false)
      e.target.style.filter = 'opacity(100%)'
    }
  }

  return (
    <>
      <Head>
        <title>{header}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Title>{header}</Title>
        {hasError && <Error>Sorry, something went wrong</Error>}
        <Highlight src={bigImage} alt={bigImageAlt} />
        <ImageContainer>
          {photos.map((photo) => (
            <ImageSelect className="thumbnail" onClick={highlightHandler} key={photo.id}>
              <Image onClick={imageHandler} src={photo.path} alt={photo.alt} width={200} height={140} />
            </ImageSelect>
          ))}
        </ImageContainer>
      </Container>
    </>
  )
}
