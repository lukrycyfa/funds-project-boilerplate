import { useState, useEffect, useCallback } from 'react';
import Address from '../artifacts/Address.json';
import CountNfts from '../artifacts/CountNfts.json';
import { useCelo } from "@celo/react-celo";

const ContractKit = require("@celo/contractkit");
const Web3 = require("web3");
const web3 = new Web3("https://alfajores-forno.celo-testnet.org");
const kit = ContractKit.newKitFromWeb3(web3);


export const useContract = () => {  
  const [contract, setContract] = useState(null);
  const { address } = useCelo();
  

  const getContract = useCallback(async () => {

    // get a contract interface to interact with
    setContract(new kit.web3.eth.Contract(CountNfts.abi, Address.address));
  }, []);

  useEffect(() => {
    if (address && CountNfts.abi && Address.address) getContract();
  }, [getContract, address]);

  return contract;
};

export const useAccBalance = () =>{
    const [balance, setBalance] = useState(0);
    const { address } = useCelo();
 
    const getBalance = useCallback(async () => {
      
      const bal = await kit.getTotalBalance(address);
      setBalance(bal);
    }, [address]);
  
    useEffect(() => {
      if (address) getBalance();
    }, [getBalance, address]);
  
    return {
        balance,
        getBalance
    }
}
