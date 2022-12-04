import * as secp from 'ethereum-cryptography/secp256k1';
import {toHex} from 'ethereum-cryptography/utils';
import { useEffect } from "react";
import { useState } from "react";

import server from "./server";
import {publicKeyToAddress} from "./scripts/publicKeyToAddress";

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  const [addresses, setAddresses] =useState([])
  async function onChange(evt) {
    setPrivateKey(evt.target.value);
    setAddress(toHex(publicKeyToAddress(secp.getPublicKey(evt.target.value))))
    if (address) {
      const { data: { balance } } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  useEffect(()=> {
    (async() => {
      const {data: { wallets }} = await server.get(`wallets`);
      setAddresses(wallets)
    })()
  })

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>
      <lave>
        Private Key
        <input placeholder="Type Private key" value={privateKey} onChange={async(e) => await onChange(e)}></input>
      </lave>
      <p>
        address: {address}
      </p>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
