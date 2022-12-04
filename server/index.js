const express = require('express');
const app = express();
const cors = require('cors');
const port = 3042;
const secp = require('ethereum-cryptography/secp256k1');
const { hexToBytes } = require('ethereum-cryptography/utils');

const recoverKey = require('./scripts/recoverKey');
const hashMessage = require('./scripts/hashMessage');
const publicKeyToAddress = require('./scripts/publicKeyToAddress');

app.use(cors());
app.use(express.json());

const balances = {
  '2063b6092e98039653c3fe37c7f2ee97690e85a5': 100,
  '22f302ecc5444d513533ae9629071a4ec867c678': 50,
  '1da2e84f408c124a3a205d28218f63042dce54cd': 75,
};

/**
 * private fdba474ab84665d8507d80e87400f15faa67ded64051585e849995baac5ac259
 * address 2063b6092e98039653c3fe37c7f2ee97690e85a5
 */
/**
 * private 34439cfce0125979974edd681a1e9ab8db83a5da22aebfe0963d061c9d119d97
 * address 22f302ecc5444d513533ae9629071a4ec867c678
 */
/**
 * private 1c0c5bfa64bc1848de5b0c55dfd483dac488cd8f76e440c41fa7da8d218b61e3
 * address 1da2e84f408c124a3a205d28218f63042dce54cd
 */

app.get('/balance/:address', (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.get('/wallets', (_req, res) => {
  res.send({ wallets: Object.keys(balances) });
});

app.post('/send', (req, res) => {
  // TODO: get a signature from the client-side application
  // recover the public address from the signature
  const { message, signature, recoveryBit } = req.body;
  const recoveredPublicKey = recoverKey(
    JSON.stringify(message),
    hexToBytes(signature),
    recoveryBit
  );
  const recoveredAddress = publicKeyToAddress(recoveredPublicKey);
  const { sender, recipient, amount } = message;
  if (sender !== recoveredAddress) throw new Error('sender is different');
  setInitialBalance(sender);
  setInitialBalance(recipient);
  if (balances[sender] < amount) {
    res.status(400).send({ message: 'Not enough funds!' });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
