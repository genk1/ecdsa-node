import { useEffect } from "react";
import { useState } from "react";
import server from "./server";

function Wallet({ address, setAddress, balance, setBalance }) {

  const [addresses, setAddresses] =useState([])
  async function onChange(evt) {
    const address = evt.target.value;
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  useEffect(()=> {
    (async() => {
      const {data: { wallets }} = await server.get(`wallets`);
      setAddresses(wallets)
      console.log(wallets)
    })()
  })

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet Address
          <select value={address} onChange={onChange}>
            {addresses.map(addr => <option value={addr}>{addr.slice(0, 20)}...</option>)}
          </select>
        {/* <input placeholder="Type an address, for example: 0x1" value={address} onChange={onChange}></input> */}
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
