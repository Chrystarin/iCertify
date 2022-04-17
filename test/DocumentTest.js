const DocumentNFT = artifacts.require('DocumentNFT')

contract('DocumentNFT', () => {
    let contract;

    before('Should deployed the contract properly', async() => {
        contract = await DocumentNFT.deployed();
        console.log(contract.address);

        assert(contract.address !== '');
    });

    let metadata = [
        {
            name: 'RED VELVET - Seulgi',
            type: 'Image',
            uri: 'https://instagram.fcrk3-2.fna.fbcdn.net/v/t51.2885-15/278171104_297228265900771_3162029805154469998_n.jpg?stp=dst-webp_e35_p640x640_sh0.08&cb=9ad74b5e-95d2b877&_nc_ht=instagram.fcrk3-2.fna.fbcdn.net&_nc_cat=1&_nc_ohc=CA46xtZ411sAX9z9Tsj&edm=AIQHJ4wBAAAA&ccb=7-4&ig_cache_key=MjgxMzI5MTIxNjY2NzMzNjQxNg%3D%3D.2-ccb7-4&oh=00_AT-DlbpFqbFqfalr2cu1uC-QsKybSW6opXfoo-9rST7PEA&oe=625B56DD&_nc_sid=7b02f1'
        },
        {
            name: 'VIVIZ - Umji',
            type: 'Image',
            uri: 'https://instagram.fcrk3-2.fna.fbcdn.net/v/t51.2885-15/278105241_1032848354243783_4313512160954901141_n.jpg?stp=dst-webp_e35_p640x640_sh0.08&cb=9ad74b5e-95d2b877&_nc_ht=instagram.fcrk3-2.fna.fbcdn.net&_nc_cat=1&_nc_ohc=9xnBoeRh7hgAX9VSAKo&tn=EmiGNtjXrNmgLqbY&edm=AJ9x6zYBAAAA&ccb=7-4&ig_cache_key=MjgxMzg1MTU3MTc1Njk1MzU0Ng%3D%3D.2-ccb7-4&oh=00_AT9Z5OJ4t3qiikP1kVXoSzk7OxcQDNtQEXP5TbIbhg85ug&oe=625B8959&_nc_sid=cff2a4'
        },
        {
            name: 'TWICE - Jihyo',
            type: 'Image',
            uri: 'https://instagram.fcrk3-2.fna.fbcdn.net/v/t51.2885-15/278071468_2616001788533981_781365475976981316_n.jpg?stp=dst-webp_e35_p640x640_sh0.08&cb=9ad74b5e-95d2b877&_nc_ht=instagram.fcrk3-2.fna.fbcdn.net&_nc_cat=1&_nc_ohc=TLJnT4GwROcAX93bZSk&tn=EmiGNtjXrNmgLqbY&edm=AJ9x6zYBAAAA&ccb=7-4&ig_cache_key=MjgxMzIyOTQwMjk0NDMzMjgxMA%3D%3D.2-ccb7-4&oh=00_AT-44Tc8cjW2t1AB10VD9Qo7LezEqt5-yr6gzkLq4nC62Q&oe=625B9500&_nc_sid=cff2a4'
        }
    ];
    let documentIds = [];

    it('Should be minted', async() => {
        for(var data of metadata) {
            const { name, type, uri } = data;
            let result = await contract.mint(name, type, uri);
            documentIds.push(result.logs[0].args.tokenId.toNumber());
        }
    });

    it('Should be transferred', async() => {
        await contract.transfer(documentIds[0], '0xcD6A055Df7eAB7a57377b41fee710e9EbFf4d36d');
        await contract.transfer(documentIds[1], '0xcD6A055Df7eAB7a57377b41fee710e9EbFf4d36d');
        await contract.transfer(documentIds[2], '0xF95034Cd9dC827d4221196140c4DB6e4c30D74c2');
    });

    it('Should retrieve the metadata', async() => {
        for(var id of documentIds) {
            const { name, docType, organization, owner, uri } = await contract.retrieveMetadata(id);
            console.log(name);
            console.log(docType);
            console.log(organization);
            console.log(owner);
            console.log(uri);
            console.log();
        }
    });
});