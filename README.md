# Getting Started With CrowdFund-Project-Dapp-Boilerplate

- This project was created as a boilerplate to assist with creating a crowdfund dapp based on This [Crowdfund-Tutorial-Project-Dapp](https://crowdfund-dapp-seven.vercel.app/).

## Requirements

- [Node.js](https://nodejs.org/en/download)

- [Python](https://www.python.org/downloads/)

## Installations

### Install Ganche-cli

```bash
npm install ganache --global
```
### Clone The Boilerplate From This Repo

```bash
git clone https://github.com/lukrycyfa/funds-project-boilerplate.git
```
### Cd Into The Root Directory

```bash
pip install -r requirements.txt
```
### Install Contract Dependencies

```bash
brownie pm install OpenZeppelin/openzeppelin-contracts@4.8.2
```
## Testing The Contract On Ganache Local Network

### Start Ganache-cli On A Separate Terminal

```bash
ganache-cli
```
### Compile, Deploy And Test The Contract On Ganache.

```bash
brownie compile
```
```bash
brownie run deploy.py
```
```bash
brownie test tests/test_OnGanache.py
```


## Testing The Contract On Celo Alfajores Testnet

### Add The Alfajores Network To Brownie

```bash
brownie networks add Alfajores alfajores host=https://alfajores-forno.celo-testnet.org chainid=44787 explorer=https://alfajores-blockscout.celo-testnet.org
```

### Add Your Metamask Private Key To The .env file in the root
- create a .env file in the root directory 

```yaml
export PRIVATE_KEY_OWNER= "Your Metamask Private Key"
```
### Compile, Deploy And Test The Contract On Alfajores

```bash
brownie compile
```
```bash
brownie run deploy.py --network alfajores
```
```bash
brownie test tests/test_OnAlfajores.py --network alfajores
```

## Installing The React-App Dependencies
- The react-app in This Project requires api keys from pinata ipfs for storing images and metadata so before you install packages and depandencies be sure to head over to [Pinata Ipfs](https://app.pinata.cloud/). Sign up with pinata, get a secret key and an api key instructions on that are found in the doc's [Authentication](https://docs.pinata.cloud/pinata-api/authentication).

### Cd Into The ./funds-countnfts Directory
- Create a .env file in the directory if it does not exist yet and update these keys REACT_APP_API_KEY for your api key and REACT_APP_SECRET_API_KEY for your secret key.

```js
REACT_APP_API_KEY = your api key;
REACT_APP_SECRET_API_KEY = your api secret key;
```

## Install Packages and Start Server...

```bash
npm install
```

```bash
npm start
```

