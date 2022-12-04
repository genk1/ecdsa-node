import { keccak256 } from 'ethereum-cryptography/keccak';

export function publicKeyToAddress(publicKey) {
  // 1. slice off the first byte
  // 2. keccak hash of the rest of public key
  // 3. slice last 20 bytes
  return keccak256(publicKey.slice(1)).slice(-20);
}
