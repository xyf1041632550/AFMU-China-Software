import Config from '../config.js';
let isWxPublic = Config.isWxPublic; //是否开启公众号自动登录
let isShowLoad = false; //展示或关闭loading
let isReRequest = false; //是否开启错误重连
let loginCode = 2; //后端返回需要登录的code
let loginMsg = '请先登录'; //后端返回需要登录的msg
let requestBaseUrl = Config.requestBaseUrl; //请求基础URL
let USERKEY = Config.userKey; //缓存key的名称
let serverKey = 'token'; //后端约定的标识
class Baseother {
	constructor() {
		//#ifdef MP-WEIXIN
		let accountInfo = uni.getAccountInfoSync()
		this.version = accountInfo.miniProgram.version;
		this.env = accountInfo.miniProgram.envVersion;
		//#endif
	}
	request(url, method = 'GET', data = {}) {
		return new Promise((resolve, reject) => {
			if (isShowLoad) {
				uni.showLoading({
					title: "加载中...",
					mask: true
				})
			}
			//  0公众号 1小程序 2app
			let type;
			// #ifdef H5
			type = 0
			//#endif
			//#ifdef MP-WEIXIN
			type = 1
			//#endif
			// #ifdef APP-PLUS
			type = 2
			// #endif
			uni.request({
				method: method,
				url: url,
				data: data,
				header: {
					'Content-Type': 'application/x-www-form-urlencoded',
					projectType: type,
					version: this.version,
					env: this.env == 'trial' ? 0 : this.env == 'release' ? 1 : 0
				},
				dataType: "json",
				success: (res) => {
					if (this.checkResponse(res)) {
						resolve(res.data);
					} else {
						reject(res);
					}
				},
				fail: (err) => {
					uni.showModal({
						title: '提示',
						content: '网络连接失败，请稍后再试',
						showCancel: false,
					});
					reject(err);
				},
				complete: () => {
					try {
						setTimeout(() => { uni.hideLoading(); }, 300)
					} catch (e) {
						//TODO handle the exception
					}
				}
			})
		})
	}
	/**
	 * checkResponse
	 */
	checkResponse(res) {
		//需要登录
		if (res.data.code == loginCode || res.data.msg == loginMsg) {
			if (getCurrentPages()[0].route == 'pages/auth/auth') {
				return false;
			}
			uni.showToast({
				icon: 'none',
				title: "请重新登录授权"
			})
			uni.removeStorage({
				key: 'userInfo'
			})
			return false;
		}
		if (res.data&&res.data.msg&&res.data.msg.indexOf('禁用')!=-1) {
			this.delClose();
			return false;
		}
		// if (res.data.code ==1) {
		// 	uni.showModal({
		// 		content:res.data.msg,
		// 		showCancel:false
		// 	})
		// 	return false;
		// }
		//code异常
		
		return true;
	}
	
	delClose(){
		let this_=this;
		uni.showModal({
			title:'提示',
			content:'您已被禁用',
			showCancel:false,
			success() {
				this_.delClose();
			},fail() {
				this_.delClose();
			}
		})
	}
	/**
	 * 微信公众号授权登录
	 */
	loginWxPublic() {
		let r = '/home/index';
		let nowPath = r.replace(/\//g, "ZZZ")
		let loginUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + Config.appId +
			'&redirect_uri=' + Config.redirectUri + '&response_type=code&scope=' + Config.scopeMode + '&state=' +
			nowPath + '&connect_redirect=1#wechat_redirect';
		window.location.href = loginUrl;
	}
	/**
	 * post request
	 */
	post(url, data = {}, isAddKey = true) {
		if(url.indexOf('http')==-1){
			url = requestBaseUrl + url; //拼接url
		}
		
		//附加用户标识-data
		let userKey;
		if (isAddKey && !data[serverKey]) {
			userKey = uni.getStorageSync('userInfo')?.token;
			data[serverKey] = userKey;
		}
		//公众号登录
		if (isWxPublic) {
			userKey = uni.getStorageSync(USERKEY);
			if (!userKey) {
				this.loginWxPublic();
				return
			} else {
				data[serverKey] = userKey;
			}
		}
		return this.request(url, 'POST', data);
	}
	/**
	 * post request
	 */
	upload(url, tempFilePath, data, fileName = 'file', isAddKey = true, showloading = true) {
		if(url.indexOf('http')==-1){
			url = requestBaseUrl + url; //拼接url
		}
		//附加用户标识-data
		if (isAddKey) {
			let userKey = uni.getStorageSync(USERKEY);
			data[serverKey] = userKey;
		}
		return new Promise((resolve, reject) => {
			let upLoad = uni.uploadFile({
				url: url, //仅为示例，非真实的接口地址
				filePath: tempFilePath,
				name: fileName,
				formData: data,
				success: (res) => {
					resolve(JSON.parse(res.data));
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
				if (!showloading) { return };
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
		if(url.indexOf('http')==-1){
			url = requestBaseUrl + url; //拼接url
		}
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
		return this.request(url, 'GET', data);
	}
}
export {
	Baseother
};
