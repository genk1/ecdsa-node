const express = require('express');
const app = express();
const cors = require('cors');
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  '04cfdb4d0d75f95955a9bce5b7f2e195f52b511eb5874a817178d02840e5dbd0798846eb201a4eea55974d7d6f9d60de766195b94b0535c0e41cdfb97ad14cda86': 100,
  '042000863e8d2a2119c4c60a27f1dc2d9683b18b089f6bdca0a6aeb3058708b5879cbcedd7a41017d62d7dc1eeec8156aef391a444d86781b9188e9d67e1611e68': 50,
  '04fa439fd487ed419f3daa13cc70ce39cb395ae6618607505200e5f4868f9af57f302702f379595c0dd2d4e592fd3061f6c92a9130c9033ea8cf6a53872dcc2e85': 75,
};
/**
 * private 4c1195c14959f9e8b99d48eb80f81b5b751624d10a4b9f2930c3758fc4210080
 * public 04cfdb4d0d75f95955a9bce5b7f2e195f52b511eb5874a817178d02840e5dbd0798846eb201a4eea55974d7d6f9d60de766195b94b0535c0e41cdfb97ad14cda86
 */
/**
 * private 640e4bb2aa3f82e82a803ae61156fbbdffc7c3a2bb1fe9059195e65c5a9914ce
 * public 042000863e8d2a2119c4c60a27f1dc2d9683b18b089f6bdca0a6aeb3058708b5879cbcedd7a41017d62d7dc1eeec8156aef391a444d86781b9188e9d67e1611e68
 */
/**
 * private 5ba037affd6266956803bc0db6004562b810758882945fca8f6564a55687fa77
 * public 04fa439fd487ed419f3daa13cc70ce39cb395ae6618607505200e5f4868f9af57f302702f379595c0dd2d4e592fd3061f6c92a9130c9033ea8cf6a53872dcc2e85
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
  const { sender, recipient, amount } = req.body;

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
