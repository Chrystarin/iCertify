const getContract = Promise.resolve({
	tokenURI: (id) => Promise.resolve(`This is the uri if this ${id}`),
	getDocumentData: (id) => Promise.resolve(`This is the data if this ${id}`)
});

// This function takes in an nftId as a parameter
const getTokenData = (nftId) =>
    // getContract is a Promise that resolves to a contract object
    getContract.then((contract) =>
        // Promise.all takes an array of Promises and returns a Promise that resolves to an array of the resolved values
        Promise.all([
            // This Promise calls the tokenURI function on the contract object, passing in the nftId parameter
            contract.tokenURI(nftId),
            // This Promise calls the getDocumentData function on the contract object, passing in the nftId parameter
            contract.getDocumentData(nftId)])
    );

// Below is an example of how you could use this function:
const [tokenURI, documentData] = await getTokenData(54)
console.log(tokenURI, documentData);
// ['This is the uri if this 5104', 'This is the data if this 5104']

// Below is an example of how you could use this function using for loop:
// Using the array of nftIds
const nftIds = [1, 2, 3, 4, 5];
for (let i = 0; i < nftIds.length; i++) {
    const [tokenURI, documentData] = await getTokenData(nftIds[i]);
    console.log(tokenURI, documentData);
}
// ['This is the uri if this 1', 'This is the data if this 1']
// ['This is the uri if this 2', 'This is the data if this 2']
// ['This is the uri if this 3', 'This is the data if this 3']
// ['This is the uri if this 4', 'This is the data if this 4']
// ['This is the uri if this 5', 'This is the data if this 5']