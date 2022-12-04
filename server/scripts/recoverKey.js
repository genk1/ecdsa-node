const secp = require('ethereum-cryptography/secp256k1');
const hashMessage = require('./hashMessage');
const { toHex } = require('ethereum-cryptography/utils');

function recoverKey(message, signature, recoveryBit) {
  const hashedMessage = hashMessage(message);
  // Given a message, signature, and recoveryBit
  //find the public key and return it!
  //Be sure to hash the message when passing it to the recovery method.
  // https://github.com/paulmillr/noble-secp256k1#recoverpublickeyhash-signature-recovery
  return secp.recoverPublicKey(hashedMessage, signature, recoveryBit);
}

module.exports = recoverKey;
