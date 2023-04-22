const { Dropbox } = require('dropbox');

const { filesUpload, sharingCreateSharedLinkWithSettings } = new Dropbox({
	accessToken: DROPBOX_ACCESS_TOKEN
});

module.exports = async ({ date, name }, path) => {
	// Upload file
	const {
		result: { path_display }
	} = await filesUpload({
		path: `/iCertify/${path}.${name.split('.')[1]}`,
		contents: data
	});

	// Create sharable link
	const {
		result: { url }
	} = await sharingCreateSharedLinkWithSettings({ path: path_display });

	// Make url to image uri
	url = url.replace('www.dropbox.com', 'dl.dropboxusercontent.com');

	return url;
};
