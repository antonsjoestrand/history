/* global fetch */
import { useEffect, useState } from 'react'

export default function Twitter() {
  const [tweets, setTweets] = useState([])
  useEffect(async () => {
    const response = await fetch('/api/twitter')
    const result = await response.json()
    setTweets(result.tweets)
  }, [])

  return (
    <div>
      {tweets.map((tweet) => (
        <div>{tweet.text}</div>
      ))}
    </div>
  )
}
