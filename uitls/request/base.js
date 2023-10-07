import Config from '../config.js';

let isWxPublic = Config.isWxPublic; //是否开启公众号自动登录

let isShowLoad = false; //展示或关闭loading

let isReRequest = false; //是否开启错误重连

let loginCode = 2; //后端返回需要登录的code

let loginMsg = '请先登录'; //后端返回需要登录的msg

let requestBaseUrl = Config.requestBaseUrl; //请求基础URL

let USERKEY = Config.userKey; //缓存key的名称
let serverKey = 'token'; //后端约定的标识

class Base {
	constructor() {}

	request(url, method = 'GET', data = {}, success, fail) {
		return new Promise((resolve, reject) => {
			if (isShowLoad) {
				uni.showLoading({
					title: "加载中...",
					mask: true
				})
			}
			uni.request({
				method: method,
				url: url,
				data: data,
				header: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'channel':'1',
					'project-Type':'1',
					'version-Code':'1',
					token: uni.getStorageSync('uid'),
					Authorization:'170493ad-0351-4348-ac55-35d817f3e7ff'
					// userToken:uni.getStorageSync('userToken'),
					// 'user-Token':uni.getStorageSync('userToken')
				},
				dataType: "json",
				success: (res) => {
					
					
					if (this.checkResponse(res, {
							url,
							method,
							data,
							success,
							fail
						})) {
						success(res.data);
					} else {
						fail(res);
					}

				},
				fail: (err) => {
					uni.showModal({
						title: '提示',
						content: '网络连接失败，请稍后再试',
						showCancel: false,
					});
					fail(err);
				},
				complete: () => {
					try {
						setTimeout(() => {
							uni.hideLoading();
						}, 300)

					} catch (e) {
						//TODO handle the exception
					}

				}
			})
		})
	}

	wxLogin(reobj) {

		let this_ = this;
		let code = ''
		uni.login({
			success(r) {
				code = r.code;
				console.log(code)
				// return
				uni.showLoading({
					title: '授权中...'
				})
				let data = {
					pid: uni.getStorageSync('pid') || '1678248342853451776',
					code: code
				}
				this_.post('vip/getAppletUser', data, false).then(res => {
					uni.hideLoading()
					// uni.setStorageSync('shareid', res.data.id)
					uni.setStorageSync('uid', res.data.token)
					reobj.data['uid']=res.data.token;
					reobj.data['token']=res.data.token;
					this_.request(reobj.url, reobj.method, reobj.data, reobj
						.success, reobj.fail)
				})

			},
			fail(fa) {
				// uni.showModal({
				// 	content:'shibai'+JSON.stringify(fa)
				// })
			}
		})
	}

	/**
	 * checkResponse
	 */
	checkResponse(res, reobj) {
		if (res.data.code == 9 ) {
			uni.showModal({
				title: '提示',
				content: '完善资料后方可下单，是否去填写？',
				showCancel: false,
				success: function(res) {
					if (res.confirm) {
						uni.navigateTo({
							url: '/pages/my/info/info'
						})
					} else if (res.cancel) {
						// console.log('用户点击取消');
					}
				}
			});
			return false;
		}
		
		//需要登录
		if (res.data.code == loginCode || res.data.msg == loginMsg) {
			uni.showToast({
				icon: 'none',
				title: "需要授权方可使用"
			})
			// #ifdef MP-WEIXIN
				this.wxLogin(reobj);
			// #endif
			// #ifndef MP-WEIXIN
				if (getCurrentPages()[0].route == '/pages/login/login') {
					return false;
				}
				
				uni.redirectTo({
					url: '/pages/login/login'
				})
			// #endif
			
			return false;
		}


		//code异常
		if (res.data.code == 1 || res.data.code == 999) {
			uni.showModal({
				title: '提示',
				content: res.data.msg,
				showCancel: false,
				success: function(res) {
					if (res.confirm) {
						// console.log('用户点击确定');
					} else if (res.cancel) {
						// console.log('用户点击取消');
					}
				}
			});
			return false;
		}
		return true;
	}

	/**
	 * 微信公众号授权登录
	 */
	loginWxPublic() {
		let r = '/home/index';
		let nowPath = r.replace(/\//g, "ZZZ")
		let loginUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + Config.appId +
			'&redirect_uri=' +
			Config.redirectUri + '&response_type=code&scope=' + Config.scopeMode + '&state=' + nowPath +
			'&connect_redirect=1#wechat_redirect';
		window.location.href = loginUrl;
	}

	/**
	 * post request
	 */
	post(url, data = {}, isAddKey = true) {
		url = requestBaseUrl + url; //拼接url

		//附加用户标识-data
		if (isAddKey && !data[serverKey]) {
			let userKey = uni.getStorageSync(USERKEY);
			data[serverKey] = userKey;
		}

		//公众号登录
		if (isWxPublic && !userKey) {
			this.loginWxPublic();
			return
		}

		let method = 'POST';
		return new Promise((resolve, reject) => {
			if (isShowLoad) {
				uni.showLoading({
					title: "加载中...",
					mask: true
				})
			}
			this.request(url, method, data, function(res) {
				resolve(res);
			}, function(res) {
				reject(res);
			});

		})

	}

	/**
	 * post request
	 */
	upload(url, tempFilePath, data, fileName = 'file', isAddKey = true, showloading = true) {
		url = requestBaseUrl + url; //拼接url

		//附加用户标识-data
		if (isAddKey) {
			let userKey = uni.getStorageSync(USERKEY);
			data[serverKey] = userKey;
		}

		return new Promise((resolve, reject) => {
			console.log(tempFilePath)
			let upLoad = uni.uploadFile({
				url: url, //仅为示例，非真实的接口地址
				filePath: tempFilePath,
				name: fileName,
				formData: data,
				header: {
					// 'Content-Type': 'multipart/form-data',
					token: uni.getStorageSync('uid'),
					appid: 'wx3c18db36475ea7d5'
				},
				success: (res) => {
					console.log(res)
					let d = JSON.parse(res.data) || res.data;
					resolve(d);
				},
				fail: (err) => {
					reject(err);
				},
				complete: (err) => {
					// try {
					// 	uni.hideLoading();
					// } catch (e) {
					// 	//TODO handle the exception
					// }
				}
			});
			upLoad.onProgressUpdate((res) => {
				// console.log('上传进度' + res.progress);
				// console.log('已经上传的数据长度' + res.totalBytesSent);
				// console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
				if (!showloading) {
					return
				};
				uni.showLoading({
					title: "上传中" + res.progress + "/100",
					mask: true
				})
				// 测试条件，取消上传任务。
				if (res.progress >= 99) {
					uni.hideLoading();
				}
			});

		})
	}

	/**
	 * post request
	 */
	download(url) {
		url = url; //拼接url
		return new Promise((resolve, reject) => {
			let upLoad = uni.downloadFile({
				url: url, //仅为示例，非真实的接口地址

				success: (res) => {
					resolve(res);
				},
				fail: (err) => {
					reject(err);
				},
				complete: (err) => {
					// try {
					// 	uni.hideLoading();
					// } catch (e) {
					// 	//TODO handle the exception
					// }
				}
			});


		})
	}

	/**
	 * get request
	 */
	get(url, data = {}, isAddKey = true) {
		url = requestBaseUrl + url; //拼接url

		//附加用户标识-data
		if (isAddKey) {
			let userKey = uni.getStorageSync(USERKEY);
			data[serverKey] = userKey;
		}

		//公众号登录
		if (isWxPublic && !userKey) {
			this.loginWxPublic();
			return
		}

		let method = 'GET';
		return new Promise((resolve, reject) => {
			if (isShowLoad) {
				uni.showLoading({
					title: "加载中...",
					mask: true
				})
			}
			this.request(url, method, data, function(res) {
				resolve(res);
			}, function(res) {
				reject(res);
			});

		})
	}

}
export {
	Base
};
