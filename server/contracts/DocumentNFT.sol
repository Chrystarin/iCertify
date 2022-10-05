// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract DocumentNFT is ERC721, ERC721Enumerable
{
  using Counters for Counters.Counter;
  Counters.Counter documentIds;

  // Document data
  struct DocumentMetadata
  {
    string name;
    string documentType;
    address fromOrganization;
    address owner;
    string uri;
  }
  
  // Accountant status
  struct Accountant
  {
    bool isActive;
    bool doesExist;
  }
  
  mapping(uint256 => DocumentMetadata) documents;
  mapping(address => Accountant) accountants;

  address ADMIN_ADDRESS = address(0);

  constructor() ERC721('DocumentNFT', 'DOC') {}

  function sendDocument(address _receiver, string memory _name, string memory _documentType, string memory _uri) public sendingRestriction
  {
    // Generate a unique, new document id
    uint256 newDocumentId = documentIds.current();

    // Create a DocumentMetadata instance and store it to the documents mapping
    documents[newDocumentId] = DocumentMetadata(_name, _documentType, msg.sender, _receiver, _uri);

    _mint(msg.sender, newDocumentId);                 // mint
    _transfer(msg.sender, _receiver, newDocumentId);  // transfer

    documentIds.increment();
  }

  function getDocumentData(uint256 _documentId) public view returns(DocumentMetadata memory)
  {
    return documents[_documentId];
  }

  // Accountant
  function addAccountant(address _accountant) public
  {
    require(msg.sender == ADMIN_ADDRESS, "Sender is not an admin");
    require(!accountants[_accountant].doesExist, "Accountant already added");

    accountants[_accountant] = Accountant(true, true);
  }

  function setInactiveAccountant(address _accountant) public
  {
    require(msg.sender == ADMIN_ADDRESS, "Sender is not an admin");
    require(accountants[_accountant].doesExist, "Accountant not existing");

    accountants[_accountant].isActive = false;
  }

  modifier sendingRestriction()
  {
    // If the sender is the admin, allow sending
    if(msg.sender == ADMIN_ADDRESS)
    {
      _;
    }
    // Else, check if the sender is an accountant. If so, allow sending
    else
    {
      require(accountants[msg.sender].doesExist, "Sender is not an accountant");
      require(accountants[msg.sender].isActive, "Sender is not an active accountant");
      _;
    }
  }

  // Overrides
  function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721, ERC721Enumerable)
  {
    super._beforeTokenTransfer(from, to, tokenId);
  }

  function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns(bool)
  {
    return super.supportsInterface(interfaceId);
  }
}
