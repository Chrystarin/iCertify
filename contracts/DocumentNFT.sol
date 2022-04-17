// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract DocumentNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter _documentIds;

    struct DocumentMetadata {
        string name;
        string docType;
        address organization;
        address owner;
        string uri;
    }

    mapping(uint256 => string) documentURIs;
    mapping(string => DocumentMetadata) documents;

    constructor() ERC721("DocumentNFT", "DOC") {}

    function mint (
        string memory _name,
        string memory _docType,
        string memory _uri
    ) public {
        uint256 newDocumentId = _documentIds.current();
        _setDocumentUri(newDocumentId, _uri);
        _setDocumentMetadata(_uri, DocumentMetadata(_name, _docType, msg.sender, address(0), _uri));
        _mint(msg.sender, newDocumentId);

        _documentIds.increment();
    }

    function transfer (
        uint256 _documentId,
        address _receiver
    ) public {
        documents[documentURIs[_documentId]].owner = _receiver;

        _transfer(msg.sender, _receiver, _documentId);
    }

    function retrieveMetadata(uint256 _documentId) public view returns (DocumentMetadata memory) {
        DocumentMetadata memory metadata = documents[documentURIs[_documentId]];

        return metadata;
    }

    function _setDocumentUri (
        uint256 _documentId,
        string memory _documentUri
    ) internal {
        documentURIs[_documentId] = _documentUri;
    }

    function _setDocumentMetadata (
        string memory _documentUri,
        DocumentMetadata memory _documentMetadata
    ) internal {
        documents[_documentUri] = _documentMetadata;
    }
}