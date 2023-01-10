// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract CertificateNFT is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable
{
	using Counters for Counters.Counter;
	Counters.Counter certificateIds;

	// Certificate data
	struct CertificateMetadata
	{
		string title;
		string fromEvent;
		address owner;
		address sender;
		string uri;
	}

	// Accountants
	struct Accountant
	{
		bool isActive;
		bool doesExist;
	}

	mapping(uint256 => CertificateMetadata) certificates;
	mapping(address => Accountant) accountants;

	constructor() ERC721("CertificateNFT", "CERT") {}

	// Handles the minting and transferring of the certificate to its owner
	function sendCertificate(
		address _receiver,
		string memory _title,
		string memory _fromEvent,
		string memory _uri
	) public sendingRestriction
	{
		// Generate a unique, new certificate id
		uint256 newCertificateId = certificateIds.current();

		// Create a CertificateMetadata instance and store it to the certificates mapping
		certificates[newCertificateId] = CertificateMetadata(_title, _fromEvent, _receiver, msg.sender, _uri);

		_mint(msg.sender, newCertificateId);                 // mint
        _setTokenURI(newCertificateId, _uri);

		_transfer(msg.sender, _receiver, newCertificateId);  // transfer

		certificateIds.increment();
	}

	// Returns the metadata of a certificate
	function getCertificateData(uint256 _certificateId) public view returns(CertificateMetadata memory)
	{
		return certificates[_certificateId];
	}

	/* Accountant-handling Functions */

	// Handles the adding of an accountant
	function addAccountant(address _accountant) public onlyOwner
	{
		require(!accountants[_accountant].doesExist, "Accountant already added");

		accountants[_accountant] = Accountant(true, true);
	}

	// Handles the flagging of an accountant as inactive
	function setInactiveAccountant(address _accountant) public onlyOwner
	{
		require(accountants[_accountant].doesExist, "Accountant not existing");

		accountants[_accountant].isActive = false;
	}

    /* Modifiers */

	modifier sendingRestriction()
	{
		// If the sender is the admin, allow sending
		if(msg.sender == owner())
		{
			_;
		}
		// If the sender is not the admin,
		//		check if the sender is an accountant.
		// 		If so allow sending
		else
		{
			require(accountants[msg.sender].doesExist, "Sender is not an accountant");
			require(accountants[msg.sender].isActive, "Sender is not an active accountant");

			_;
		}
	}

	// Overrides - MUST BE INCLUDED
	function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721, ERC721Enumerable)
	{
		super._beforeTokenTransfer(from, to, tokenId);
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