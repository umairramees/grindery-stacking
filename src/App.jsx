import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import 'grindery-wallet-sdk';

const WalletSDK = window.Grindery?.WalletSDK;
const isConnected: boolean = WalletSDK.isConnected();

window.Grindery.WalletSDK.setAppId('cac5dd44-f610-4a63-99ab-25da52a5ad7e');
window.Grindery.appId = 'cac5dd44-f610-4a63-99ab-25da52a5ad7e';
WalletSDK.on('connect', (chainId: string) => {
    if (WalletSDK.isConnected()) {
        console.log(`Wallet SDK is connected to ${chainId} chain`);
    }
});

WalletSDK.on('connect', async () => {
    const [address]: string[] = await WalletSDK.connect();
    console.log(window);
});

// Token Details
const TOKENS = {
    G1: {
        name: "Grindery One Token",
        polygon: "0xe36bd65609c08cd17b53520293523cf4560533d0",
        opbnb: "0xe36bd65609c08cd17b53520293523cf4560533d0",
    },
    GX: {
        name: "Grindery X Token",
        polygon: "0x8730762Cad4a27816A467fAc54e3dd1E2e9617A1",
        ethereum: "0x8730762Cad4a27816A467fAc54e3dd1E2e9617A1",
    },
};

// Generic ERC-20 ABI
const ERC20_ABI = [
    {
        constant: true,
        inputs: [{ name: "_owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "balance", type: "uint256" }],
        type: "function",
    },
    {
        constant: false,
        inputs: [
            { name: "_to", type: "address" },
            { name: "_value", type: "uint256" },
        ],
        name: "transfer",
        outputs: [{ name: "success", type: "bool" }],
        type: "function",
    },
];

function App() {
    const [account, setAccount] = useState(null);
    const [provider, setProvider] = useState(null);
    const [contract, setContract] = useState(null);
    const [stakeAmount, setStakeAmount] = useState("");
    const [userBalance, setUserBalance] = useState(null);
    const [userRewards, setUserRewards] = useState(null);

    useEffect(() => {
    }, []);

    WalletSDK.on('accountsChanged', (addresses: string[]) => {
        console.log('accountsChanged', addresses);
        setAccount(addresses[0]);
        // console.log('user', await WalletSDK.getUser());
    });

    return (
        <div className="App">
            <header className="App-header">
                <h2>Staking DApp</h2>
                <p>Connected account: {account}</p>
                <p>Your staked balance: {userBalance} ETH</p>
                <p>Your rewards: {userRewards} ETH</p>

                <div>
                    <input
                        type="text"
                        placeholder="Amount to stake (ETH)"
                        value={stakeAmount}
                        // onChange={}
                    />
                    {/*<button onClick={}>Stake</button>*/}
                </div>

                {/*<button onClick={}>Withdraw</button>*/}
                {/*<button onClick={}>Claim Rewards</button>*/}
            </header>
        </div>
    );
}

export default App;
