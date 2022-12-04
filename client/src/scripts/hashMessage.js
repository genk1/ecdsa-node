import { keccak256 } from 'ethereum-cryptography/keccak';
import { utf8ToBytes } from 'ethereum-cryptography/utils';

export function hashMessage(message) {
  // turn this into an array of bytes,
  // the expected format for the hash algorithm
  const bytes = utf8ToBytes(message);
  // hash the message using keccak256
  return keccak256(bytes);
}
