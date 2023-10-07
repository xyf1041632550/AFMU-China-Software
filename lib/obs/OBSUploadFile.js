const config = require('./Configuration.js');
const util = require('./util.js');
const getPolicyEncode = require('./getPolicy.js');
const getSignature = require('./GetSignature.js');

const OBSupload = function(filePath, fileName, callback) {
	if (!filePath) {
		wx.showToast({
			title: '文件路径不能为空',
			icon: '请重新选择路径',
		});
	} else {
		//指定上传到OBS桶中的对象名   
		const time = util.formatTime(new Date()).replace('/','-').replace('/','-').replace(' ','T').concat('.000Z');
		let xx =  util.formatTime(new Date()).replace('/','-').replace('/','-')
		let xs = xx.split(' ')
		let expiration = xs[0]+'T'+xs[1].concat('.000Z');
		var timestamp = Date.parse(new Date());
		const OBSPolicy = { //设定policy内容
			// "expiration": "2021-01-29T20:00:00.000Z",
			// 2021-01-29 13:59:51.000Z
			"expiration": expiration,
			"conditions": [{
					"bucket": config.Bucket
				}, //Bucket name
				{
					'key': fileName
				},
				{
					'content-type': 'image/jpeg'
				},
				{
					'x-obs-acl': 'public-read'
				}
			]
		}


		








		const policyEncoded = getPolicyEncode(OBSPolicy); //计算policy编码值
		const signature = getSignature(policyEncoded, config.SecretKey); //计算signature

		wx.uploadFile({
			url: config.EndPoint,
			filePath: filePath,
			name: 'file',
			header: {
				'content-type': 'multipart/form-data; boundary=-9431149156168',
			},
			formData: {
				'AccessKeyID': config.AccessKeyId,
				'policy': policyEncoded,
				'signature': signature,
				'key': fileName,
				'content-type': 'image/jpeg',
				'x-obs-acl': 'public-read'
			},

			success: function(res) {
				if (res.statusCode == '204') {
					let filename = config.EndPoint + '/' + fileName
					callback && callback(filename)

				} else {
					wx.showToast({
						title: '上传失败',
						icon: '失败'
					});
				}
			},
			fail: function(e) {
				console.log(e);
			}
		})

	}
}

module.exports = OBSupload;
