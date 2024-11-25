// import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ConnectButton from './components/ConnectWallet'
import { ADDRESS_CONTRACT, ABI } from './contracts/erc20'
import { useAccount, useReadContract } from 'wagmi'


function App() {
  //const [count, setCount] = useState(0)
  const { address, isConnected } = useAccount();
  const { data: nameContract } = useReadContract({
    abi: ABI,
    address: ADDRESS_CONTRACT,
    functionName: 'name',
  }
  );
  const { data: balanceOf } = useReadContract({
    abi: ABI,
    address: ADDRESS_CONTRACT,
    functionName: 'balanceOf',
    args: [address],
  }
  );


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
            <p>
              Token Name: {nameContract}
              <br />
              Balance: {balanceOf.toString()}
            </p>
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
