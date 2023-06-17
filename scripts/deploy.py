from brownie import CountNfts, accounts, network, config
from brownie.network.gas.strategies import LinearScalingStrategy
import json
import os

gas_strategy = LinearScalingStrategy("10 gwei", "50 gwei", 1.1)

def main():
    # Deploy on alfajores
    if network.show_active()=='alfajores':
        adr = {}
        dev = accounts.add(config["wallets"]["from_key"])
        print(network.show_active())
        deployed = CountNfts.deploy({'from':dev, "gas_price":gas_strategy})
        adr["address"] = deployed.address
        with open('./build/deployments/deployAlfajores.json', 'w') as outfile: 
            json.dump(adr, outfile, indent=4) 
            if not os.path.exists("./funds-countnfts/src/artifacts"):
                os.mkdir("./funds-countnfts/src/artifacts")
                with open('./build/contracts/contracts/CountNfts.json', 'r') as dep:
                    abi_file = json.load(dep)
                    with open('./funds-countnfts/src/artifacts/CountNfts.json', 'w') as abi:
                        json.dump(abi_file, abi, indent=4)
                    with open('./funds-countnfts/src/artifacts/Address.json', 'w') as conAdr:
                        json.dump(adr, conAdr, indent=4)
            else:
                with open('./build/contracts/contracts/CountNfts.json', 'r') as dep:
                    abi_file = json.load(dep)
                    with open('./funds-countnfts/src/artifacts/CountNfts.json', 'w') as abi:
                        json.dump(abi_file, abi, indent=4)
                    with open('./funds-countnfts/src/artifacts/Address.json', 'w') as conAdr:
                        json.dump(adr, conAdr, indent=4)                
        return deployed

    # Deploy on ganache
    if network.show_active()=='development':
        adr = {}       
        owner = accounts[0]
        deployed = CountNfts.deploy({'from':owner, "gas_price":gas_strategy})
        adr["address"] = deployed.address
        with open('./build/deployments/deployLocal.json', 'w') as outfile: 
            json.dump(adr, outfile, indent=4)    
        return deployed
