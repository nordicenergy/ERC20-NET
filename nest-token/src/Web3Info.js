import React, { useState, useEffect, useCallback } from "react";


export default function Web3Info(props) {
  const { web3Context } = props;
  const { networkId, networkName, accounts, providerName, lib, contract } =
    web3Context;

  const [balance, setBalance] = useState(0);

  const getBalance = useCallback(async () => {
    let balance =
      accounts && accounts.length > 0
        ? lib.utils.fromWei(await lib.eth.getBalance(accounts[0]), "ether")
        : "Unknown";
    setBalance(balance);
  }, [accounts, lib.eth, lib.utils]);

  useEffect(() => {
    getBalance();
  }, [accounts, getBalance, networkId]);

  const requestAuth = async (web3Context) => {
    try {
      await web3Context.requestAuth();
      // ends here
    } catch (e) {
      console.error(e);
    }
  };

  const requestAccess = useCallback(() => requestAuth(web3Context), []);

  return (
    <div>
      <h3> {props.title} </h3>
      <div>
        Network: {networkId ? `${networkId} – ${networkName}` : "No connection"}
      </div>
      <div>
        Your address: {accounts && accounts.length ? accounts[0] : "Unknown"}
      </div>
      <div>Your ETH balance: {balance}</div>
      <div>Provider: {providerName}</div>
      {accounts && accounts.length ? (
        <div>Accounts & Signing Status: Access Granted</div>
      ) : !!networkId && providerName !== "infura" ? (
        <div>
          <button onClick={requestAccess}>Request Access</button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
