import md5 from 'md5'
import queryString from 'query-string'

const marvelFetch = async () => {
  const rootEndpoint = 'https://gateway.marvel.com'
  const resourceEndpoint = '/v1/public/characters'
  const publicKey = import.meta.env.VITE_PUBLIC_KEY
  const privateKey = import.meta.env.VITE_PRIVATE_KEY
  const ts = String(Date.now())
  const hash = md5(`${ts}${privateKey}${publicKey}`)
  const queryParam = queryString.stringify({ ts, apikey: publicKey, hash })
  
  const characterResponse = await fetch(`${rootEndpoint}${resourceEndpoint}?${queryParam}`)
  return await characterResponse.json()
}

export default marvelFetch