const { keccak256 } = require('ethereum-cryptography/keccak');

function getAddress(publicKey) {
  // 1. slice off the first byte
  // 2. keccak hash of the rest of public key
  // 3. slice last 20 bytes
  return keccak256(publicKey.slice(1)).slice(-20);
}

module.exports = getAddress;
