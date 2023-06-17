import pytest
from brownie import accounts, network, config
from brownie.network.gas.strategies import LinearScalingStrategy



Acc = accounts.add(config["wallets"]["from_key"])

@pytest.fixture(scope="module")
def Count(CountNfts):
    gas_strategy = LinearScalingStrategy("10 gwei", "50 gwei", 1.1)
    yield CountNfts.deploy({'from': Acc, "gas_price":gas_strategy})


def test_count(Count):
    """
    Test Count And Mint Functions.
    """
    gas_strategy = LinearScalingStrategy("10 gwei", "50 gwei", 1.1)
    print(network.show_active())
    assert Count.owner() == Acc
    Count.safeMint("new/nft/acc1", {'from': Acc, 'gas_price':gas_strategy})
    Count.safeMint("new/nft/acc2", {'from': Acc, 'gas_price':gas_strategy})
    assert Count.GetCount() == 1
    Count.AddCount({'from': Acc, 'gas_price':gas_strategy}), Count.AddCount({'from': Acc, 'gas_price':gas_strategy}) 
    Count.AddCount({'from': Acc, 'gas_price':gas_strategy})
    assert Count.GetCount() == 4
    Count.SubCount({'from': Acc, 'gas_price':gas_strategy}), Count.SubCount({'from': Acc, 'gas_price':gas_strategy})
    assert Count.GetCount() == 2
    assert Count.ownerOf(1) == Acc
    assert Count.ownerOf(2) == Acc

 
