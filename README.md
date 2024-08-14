# web3-cross-platform-dapp

Playground to test setup of RN with Web and combination with Crypto packages (web3modal).

Functionality:
 - wallet connect
 - account info
 - basic transaction
 - contract deploy (of sample Lock.sol contract)
 - contract read (of deployed Lock.sol contract)
 - contract write (of deployed Lock.sol contract)

Original project setup taken from https://github.com/callstack/web3-cross-platform-dapp/tree/main

## Requirements

- [Expo environment setup](https://docs.expo.dev/get-started/installation/#requirements) (Node.js, Git, Watchman)
- A [Wallet Connect Cloud](https://cloud.walletconnect.com/sign-in) project ID
- Expo Go app installed in your smartphone
- One or more web3 wallets installed in your smartphone (e.g. MetaMask, Rainbow Wallet, Trust Wallet, etc)
- One or more web3 wallets installed in your browser (e.g. MetaMask, Rainbow Wallet, Trust Wallet, etc)

## How to run

- Rename `.env.example` to `.env` and fill in your Wallet Connect Cloud project ID
- `yarn install`

### Mobile

- `yarn start`
- Open Expo Go app in your smartphone
- If your smartphone is in the same network as your computer, the local dev server should appear as the first option. If it doesn't, use the app to scan the QR Code presented in the terminal

### Web

- `yarn web`
- Open `http://localhost:19006`


## Research notes

It was hard to do clean setup using Expo CLI. After several issues, that had to be resolved, I have encountered some ridiculous Metro error, where Metro was not bundling packages properly
which resulted in immediate "type not found" crashes. So instead of forcing it from clean state, I tried to pick already working setup (see Git repo mentioned at start of Readme). I cleaned
all unnecessary parts so only minimal backbone remained (mainly package.json, polyfills, and src/web3modal). Then I iteratively added sections to verify each basic functionality of this setup.

Most of the magic is done in "src/web3modal", where we re-export web3 classes based on platform, where code is running:
 - for Native - @web3modal/wagmi-react-native
 - for Web - @web3modal/wagmi/react