import sha256 from 'sha256'
import crypto from 'crypto'

export const randomUUID = () => {
  return crypto.randomUUID().replace(/-/g, '')
}

export const toSHA256 = (string) => {
  return sha256(string)
}

export const toBase64 = (string) => {
  return Buffer.from(string).toString('base64')
}
