// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DocumentNFT is ERC721, ERC721Enumerable, ERC721URIStorage
{
    using Counters for Counters.Counter;
	Counters.Counter documentIds;

    address owner;

	struct Document
	{
		address owner;
		address issuer;
		string _type;
        string docId;
	}

	mapping(uint256 => Document) documents;
	mapping(address => bool) institutions;
    mapping(string => bool) uris;

	constructor() ERC721("DocumentNFT", "DOC") {
        owner = msg.sender;
    }

    function withdraw() public {
        require(msg.sender == owner, "Only the owner of this contract can initiate this");

        (bool success, ) = payable(owner).call{value: address(this).balance}("");
        require(success, "Failed to withdraw accumulated fees");
    }

	// Handles the minting and transferring of the document to its owner
	function sendDocument(
		address receiver,
		string memory type_,
		string memory uri,
        string memory docId
	) public payable
	{
		// Check if sender is valid address
        require(msg.sender != owner, "Invalid action");
		require(msg.sender != receiver, "Invalid action");
		require(institutions[msg.sender], "Sender is not an admin of institution");
        require(!institutions[receiver], "Receiver must not be an institution");
        require(!uris[uri], "Document already owned by another address");
        require(msg.value >= 333333333333333333 wei, "Insufficient transaction fee");

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

        // Add uri to uris
		uris[uri] = true;

		documentIds.increment();
	}

	// Returns the metadata of a document
	function getDocumentData(uint256 documentId) public view returns(Document memory)
	{
		return documents[documentId];
	}

	/* Institution-handlers */

    // Add sender to the institutions mapping
	function registerInstitution() public
	{
		require(msg.sender != owner, "Invalid action");
		require(!institutions[msg.sender], "Already an admin of institution");
		
		institutions[msg.sender] = true;
	}

    // Check if sender is institution
    function checkInstitution(address sender) public view returns(bool)
	{
        require(sender != address(0), "Address can not be 0");

		return institutions[sender];
	}

	/* URI Handler */

	function checkUri(string memory uri) public view returns(bool)
	{
		return uris[uri];
	}

    /* Overrides - MUST BE INCLUDED */
    
	function _beforeTokenTransfer(address from, address to, uint256 batchSize, uint256 tokenId) internal override(ERC721, ERC721Enumerable)
	{
		super._beforeTokenTransfer(from, to, batchSize, tokenId);
	}

	function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage, ERC721Enumerable) returns(bool)
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