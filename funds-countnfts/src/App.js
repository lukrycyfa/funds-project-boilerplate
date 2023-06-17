import React from 'react';
import { useCelo } from "@celo/react-celo";
import Wallet from './components/ui/wallet';
import Cover from './components/ui/cover';
import CountWrapper from './components/countnfts';
import { Container, Navbar, Text, useTheme, Spacer } from '@nextui-org/react';
import { IconGofundme } from "./components/icons/Icons";
import { useAccBalance, useContract } from './hooks';



const App = function AppWrapper() {
  
  const { connect, address, disconnect} = useCelo();
  const { balance, getBalance} = useAccBalance();
  const countNfts = useContract();
  const { isDark } = useTheme();
   
  return (

    <>
      {address ? (            
        <Container fluid>
          <Navbar shouldHideOnScroll isBordered={isDark} variant="sticky">
            <Navbar.Brand css={{ mr: "$4" }}>
              <IconGofundme />
              <Spacer y={1}/>
              <Text b color="inherit" css={{ mr: "$11" }} hideIn="xs">
                Fund BoilerPlate
              </Text>
            </Navbar.Brand>
            <Navbar.Content>
              <Navbar.Item>
                <Wallet
                address={address}
                balance={balance.CELO}
                symbol="CELO"
                disconnect={disconnect}          
                >
                </Wallet>
                </Navbar.Item>  
              </Navbar.Content>    
            </Navbar>    
            <CountWrapper
              countNfts={countNfts}
              getBalance={getBalance}
            />        
        </Container>  
        ) : (
          <>
          <Cover
            connect={connect}
          />
          </>
        )}
    </>         
  );
};

export default App;
