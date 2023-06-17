import React from 'react';
import ReactDOM from 'react-dom';
import { CeloProvider, Alfajores, NetworkNames } from '@celo/react-celo';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "@celo/react-celo/lib/styles.css";
import './index.css';


ReactDOM.render(
    <CeloProvider
      networks={[Alfajores]}
      network={{
        name: NetworkNames.Alfajores,
        rpcUrl: 'https://alfajores-forno.celo-testnet.org',
        graphQl: 'https://alfajores-blockscout.celo-testnet.org/graphiql',
        explorer: 'https://alfajores-blockscout.celo-testnet.org',
        chainId: 44787
      }}
      dapp={{
        name: "Count Nfts",
        description: "Funds Project BoilerPlate",
        url: "https://example.com",
      }}
    >      
      <App />
    </CeloProvider>,
  document.getElementById("root")
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
