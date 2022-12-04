import * as secp from 'ethereum-cryptography/secp256k1';
import { toHex } from 'ethereum-cryptography/utils';
import { hashMessage } from './hashMessage';

export async function signMessage(msg, privateKey) {
  const hashedMessage = hashMessage(msg);

  // https://github.com/paulmillr/noble-secp256k1#signmsghash-privatekey
  const [signature, recoveryBit] = await secp.sign(hashedMessage, privateKey, {
    recovered: true,
  });
  return { signature: toHex(signature), recoveryBit };
}
