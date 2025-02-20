import Twit from 'twit'

export default async function twitter(req, res) {
  const T = new Twit({
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_KEY_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
    strictSSL: true, // optional - requires SSL certificates to be valid.
  })

  //
  //  search twitter for all tweets containing the word 'banana' since July 11, 2011
  //

  const { data } = await T.get('statuses/user_timeline', {
    screen_name: 'vanarts',
    count: 10,
  })

  const tweets = data.map((tweet) => ({
    date: tweet.created_at,
    text: tweet.text,
  }))

  res.send({ tweets })
}
