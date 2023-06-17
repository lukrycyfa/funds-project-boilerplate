import pytest
from brownie import accounts, network
from brownie.network.gas.strategies import LinearScalingStrategy



@pytest.fixture(scope="module")
def Count(CountNfts):
    gas_strategy = LinearScalingStrategy("10 gwei", "50 gwei", 1.1)
    yield CountNfts.deploy({'from': accounts[0], "gas_price":gas_strategy})


def test_count(Count, accounts):
    """
    Test Count And Mint Functions.
    """
    gas_strategy = LinearScalingStrategy("10 gwei", "50 gwei", 1.1)
    print(network.show_active())
    assert Count.owner() == accounts[0]
    Count.safeMint("new/nft/acc1", {'from': accounts[1], 'gas_price':gas_strategy})
    Count.safeMint("new/nft/acc2", {'from': accounts[2], 'gas_price':gas_strategy})
    assert Count.GetCount() == 1
    Count.AddCount({'from': accounts[1], 'gas_price':gas_strategy}), Count.AddCount({'from': accounts[1], 'gas_price':gas_strategy}) 
    Count.AddCount({'from': accounts[1], 'gas_price':gas_strategy})
    assert Count.GetCount() == 4
    Count.SubCount({'from': accounts[2], 'gas_price':gas_strategy}), Count.SubCount({'from': accounts[2], 'gas_price':gas_strategy})
    assert Count.GetCount() == 2
    assert Count.ownerOf(1) == accounts[1]
    assert Count.ownerOf(2) == accounts[2]

 
