/* global fetch */

const api = {
  url: 'https://www.flickr.com/services/rest/?method=flickr.photos.search',
  key: process.env.FLICKR_API_KEY,
  keyword: 'vancouver',
  lat: '49.287270',
  lon: '-123.116910',
}

export default async function dining(req, res) {
  const url = `${api.url}&api_key=${api.key}&tags=${api.keyword}&lat=${api.lat}&lon=${api.lon}&format=json&nojsoncallback=1`

  const response = await fetch(url)
  const result = await response.json()
  res.send({ result })
}
