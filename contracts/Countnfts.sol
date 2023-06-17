// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "OpenZeppelin/openzeppelin-contracts@4.8.2/contracts/token/ERC721/ERC721.sol";
import "OpenZeppelin/openzeppelin-contracts@4.8.2/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "OpenZeppelin/openzeppelin-contracts@4.8.2/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "OpenZeppelin/openzeppelin-contracts@4.8.2/contracts/access/Ownable.sol";
import "OpenZeppelin/openzeppelin-contracts@4.8.2/contracts/utils/Counters.sol";


contract CountNfts is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    using Counters for Counters.Counter;
    Counters.Counter private _Count;
    Counters.Counter private _TokenIdCount;

    constructor()ERC721("CountNFTs", "CTN"){
        _Count.increment();
        _TokenIdCount.increment();
    }

    function safeMint(string memory uri) public {
        uint256 tokenId = _TokenIdCount.current(); 
        _TokenIdCount.increment();    
        _safeMint(msg.sender, tokenId); 
        _setTokenURI(tokenId, uri); 
    }

    function AddCount() public {
        _Count.increment();
    }
            
    function SubCount() public {
        _Count.decrement(); 
    }

    function GetCount() public
    view 
    returns
    (uint){
        return _Count.current();
    }

    // The following functions are overrides required by Solidity.
    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
           internal
           override(ERC721, ERC721Enumerable)
       {
           super._beforeTokenTransfer(from, to, tokenId, batchSize);
       }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
        
    }
    // Returns The Token URI Of The Requested Token.
    function tokenURI(uint256 tokenId)
      public
      view
      virtual
      override(ERC721, ERC721URIStorage)
      returns (string memory)
    {
      require(
        _exists(tokenId),
        "ERC721Metadata: URI query for nonexistent token"
      );
    
        return super.tokenURI(tokenId);

    }  

}
