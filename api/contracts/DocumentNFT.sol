// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DocumentNFT is ERC721, ERC721Enumerable, ERC721URIStorage
{
    using Counters for Counters.Counter;
	Counters.Counter documentIds;

	struct Document
	{
		address owner;
		address issuer;
		string _type;
        string docId;
	}

	struct Institution 
	{
		bool isExisting;
	}

	mapping(uint256 => Document) documents;
	mapping(address => Institution) institutions;

	constructor() ERC721("DocumentNFT", "DOC") {}

	// Handles the minting and transferring of the document to its owner
	function sendDocument(
		address receiver,
		string memory type_,
		string memory uri,
        string memory docId
	) public
	{
		// Check if sender is admin of institution
		require(institutions[msg.sender].isExisting, "Sender is not an admin of institution");

		// Generate a unique, new documentd id
		uint256 newDocumentId = documentIds.current();

		// Create a Document instance and store it to the documents mapping
		documents[newDocumentId] = Document(receiver, msg.sender, type_, docId);

        // Mint
		_mint(msg.sender, newDocumentId);

        // Save token URI
        _setTokenURI(newDocumentId, uri);

        // Transfer
		_transfer(msg.sender, receiver, newDocumentId);

		documentIds.increment();
	}

	// Returns the metadata of a document
	function getDocumentData(uint256 documentId) public view returns(Document memory)
	{
		return documents[documentId];
	}

	/* Institution-handlers */

	function registerInstitution() public
	{
		require(!institutions[msg.sender].isExisting, "Already an admin of institution");
		
		institutions[msg.sender] = Institution(true);
	}

    /* Overrides - MUST BE INCLUDED */
    
	function _beforeTokenTransfer(address from, address to, uint256 batchSize, uint256 tokenId) internal override(ERC721, ERC721Enumerable)
	{
		super._beforeTokenTransfer(from, to, batchSize, tokenId);
	}

	function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns(bool)
	{
		return super.supportsInterface(interfaceId);
	}

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage)
	{
        super._burn(tokenId);
    }

	function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}