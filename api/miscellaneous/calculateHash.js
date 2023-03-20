const { importer } = require('ipfs-unixfs-importer');

module.exports = async (content) => {
	let lastCID;

	for await (const { cid } of importer(
		[{ content }],
		{
			get: async (cid) => {
				throw new Error(`unexpected block API get for ${cid}`);
			},
			put: async () => {
				throw new Error('unexpected block API put');
			}
		},
		{ onlyHash: true }
	)) {
		lastCID = cid;
	}

	return `${lastCID}`;
};
