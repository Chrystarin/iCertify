const { Dropbox } = require('dropbox');

const { DBX_KEY, DBX_SECRET, DBX_REFRESH } = process.env;

const dropbox = new Dropbox({
	clientId: DBX_KEY,
	clientSecret: DBX_SECRET,
	refreshToken: DBX_REFRESH
});

module.exports = async (image, path) => {
	const { data, name } = image;

    // Upload image
	const {
		result: { path_display }
	} = await dropbox.filesUpload({
		path: `/iCertify/${path}.${name.split('.')[1]}`,
		contents: data
	});

	let url;

	try {
		// Create share link
		({
			result: { url }
		} = await dropbox.sharingCreateSharedLinkWithSettings({
			path: path_display
		}));
	} catch (error) {
		const {
			error: {
				error: {
					'.tag': tag,
					shared_link_already_exists: { metadata }
				}
			}
		} = error;

		/**
		 * Check if error is shared_link_already_exists
         * If so, get the existing shared link
         * Otherwise, throw the error
		 */
		if (tag === 'shared_link_already_exists') ({ url } = metadata);
		else throw error;
	}

	// Make share link to image uri
	url = url?.replace('www.dropbox.com', 'dl.dropboxusercontent.com');

	return url;
};
