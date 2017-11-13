var Sha1 = require('./Sha1');

export default {
	config: function(options) {
		this.options = options;
	},

	upload: function (uri, successCb, errorCb) {
		var timestamp = Date.now(),
				keys = "timestamp=" + timestamp + this.options.apiSecret,
				signature = Sha1.hash( keys ),
				uploadUrl = "https://api.cloudinary.com/v1_1/" + this.options.cloudName + "/image/upload";

		const data = new FormData();
		data.append('file', {
			uri,
			name: 'file',
			type: 'image/jpeg'
		});
		data.append('api_key', this.options.apiKey);
		data.append('timestamp', timestamp);
		data.append('signature', signature);

		return fetch(uploadUrl, {
			  method: 'post',
			  body: data
			})
			.then(r => r.json())
	}
};
