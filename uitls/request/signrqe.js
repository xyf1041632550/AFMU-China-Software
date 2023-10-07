import store from '../../store/index.js';
import Config from '../config.js';
import TimeTool from '../tools/timeTool.js';

let isWxPublic = Config.isWxPublic; //是否开启公众号自动登录

let isShowLoad = false; //展示或关闭loading

let isReRequest = false; //是否开启错误重连

let loginCode = 2; //后端返回需要登录的code

let loginMsg = '请先登录'; //后端返回需要登录的msg

let requestBaseUrl = Config.requestBaseUrl; //请求基础URL

let USERKEY = Config.userKey; //缓存key的名称

let serverKey = 'userId'; //后端约定的标识

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
				header:{'Content-Type':'multipart/form-data;charset=UTF-8'},
				dataType:"json",
				success: (res) => {
					if(this.checkResponse(res)){
						success(res.data);
					}else{
						fail(res);
					}
				},
				fail: (err) => {
					uni.showModal({
						title: '提示',
						content: JSON.stringify(err),
						showCancel: false,
					});
					fail(err);
				},
				complete: () => {
					try {
						uni.hideLoading();
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

			uni.redirectTo({
				url: 'acclogin'
			});
			return false;
		}

		//code异常
		if (res.data.code == 1) {
			uni.showModal({
				title: '提示',
				content: res.data.msg,
				showCancel: false,
				success: function(res) {
					if (res.confirm) {
						console.log('用户点击确定');
					} else if (res.cancel) {
						console.log('用户点击取消');
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
		let r = store.state.nowPath;
		let nowPath = r.replace(/\//g, "ZZZ")
		let loginUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + Config.appId + '&redirect_uri=' +
			Config.redirectUri + '&response_type=code&scope=' + Config.scopeMode + '&state=' + nowPath +
			'&connect_redirect=1#wechat_redirect';
		window.location.href = loginUrl;
	}

	/**
	 * post request
	 */
	post(url, data = {}, isAddKey = true) {

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
		
		let req = {
			"service": url,
			"data": data,
			"time": parseInt(TimeTool.getTimestamp() / 1000),
			"sign": "5b21bfb55dc5e402df6a58f5cdd37128"
		}
		let strreq = JSON.stringify(req)
		let reurl = 'http://fangtest.hnqinghuang.com/index.php?m=api&c=app&a=index';
		let method = 'POST';
		return new Promise((resolve, reject) => {
			if (isShowLoad) {
				uni.showLoading({
					title: "加载中...",
					mask: true
				})
			}
			this.request(reurl, method, strreq, function(res) {
				resolve(res);
			}, function(res) {
				reject(res);
			});

		})

	}

	/**
	 * post request
	 */
	upload(url, tempFilePath, data, fileName = 'file') {
		url = requestBaseUrl + url; //拼接url

		//附加用户标识-data
		if (isAddKey) {
			let userKey = uni.getStorageSync(USERKEY);
			data[serverKey] = userKey;
		}

		return new Promise((resolve, reject) => {
			if (isShowLoad) {
				uni.showLoading({
					title: "上传中...",
					mask: true
				})
			}
			uni.uploadFile({
				url: url, //仅为示例，非真实的接口地址
				filePath: tempFilePath,
				name: fileName,
				formData: data,
				success: (res) => {
					resolve(res.data);
				},
				fail: (err) => {
					reject(err);
				},
				complete: (err) => {
					try {
						uni.hideLoading();
					} catch (e) {
						//TODO handle the exception
					}
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
