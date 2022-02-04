export default function twitter(req, res) {
  res.send({ hello: 'Hello!', env: process.env.TWITTER_HELLO })
}
