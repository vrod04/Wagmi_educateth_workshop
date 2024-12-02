import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ConnectButton from './components/ConnectWallet'
import { ADDRESS_CONTRACT, ABI } from './contracts/erc20'
import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { waitForTransactionReceipt } from 'viem/actions'
import { wagmiAdapter } from './WalletContext'


function App() {
  const [amount, setAmount] = useState(0)
  const { address, isConnected } = useAccount();
  const { writeContractAsync, isSuccess, isError } = useWriteContract();

  const { data: nameContract } = useReadContract({
    abi: ABI,
    address: ADDRESS_CONTRACT,
    functionName: 'name',
  });
  const { data: balanceOf, refetch } = useReadContract({
    abi: ABI,
    address: ADDRESS_CONTRACT,
    functionName: 'balanceOf',
    args: [address],
  }
  );
  const mintF = async () => {
    if (amount <= 0 ) {
      alert('Amount must be greater than 0')
      return;
    }
    const txHash = writeContractAsync({
      address: ADDRESS_CONTRACT,
      abi: ABI,
      functionName: 'mint',
      args: [address, amount]
    })
    await waitForTransactionReceipt(wagmiAdapter.wagmiConfig,{
      hash: txHash
    })
  };

  useEffect(() => {
    if (isSuccess) {
      refetch()
      setAmount(0)
    }
    if (isError) {
      alert('Transaction failed')}
  }, [isSuccess, isError])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className='title'>WawiCoin Test Faucet</h1>
      {isConnected ? (
          <>
            <p>Connected wallet: {address}</p>
            <p>{nameContract}
              <br />
              Balance: {balanceOf && balanceOf.toString()}
            </p>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              value= {amount}
              name='amount'
              title='Amount'
            />
            <button onClick={mintF}>
              Mint
            </button>
          </>
        ) : (
          <p>Not connected</p>
        )
      }
      <ConnectButton />
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
