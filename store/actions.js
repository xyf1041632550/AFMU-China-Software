import TimeTool from '@/uitls/tools/timeTool.js';
import ArrayTool from '@/uitls/tools/arrayTool.js';
import {
	Base
} from '@/uitls/request/base.js'
let base = new Base();
//tx地图
var QQMapWX = require('../lib/qqmap-wx-jssdk.js');
var qqmapsdk = null;

//高德地图
// var amapFile = require('../lib/amap-wx.js')
// var myAmapFun = new amapFile.AMapWX({
// 	key: '2d2929c0481cf3bba01921c156ffea73'
// });

class Actions {
	constructor() {}
}

Actions.state = null; //state

//获取规则
Actions.getCustomer = async function(isreq = false) {
	return await new Promise((resolve, reject) => {
		if (Actions.state.customer && !isreq) {
			resolve(Actions.state.customer)
		} else {
			base.post('app/user/constan',{type:'kefu'}).then(r=>{
				console.log(r)
				Actions.state.customer=r.data.value;
				resolve(Actions.state.customer);
			})
			base.post('app/activity/getRules', {}).then(res => {
				Actions.state.customer = res.data;
				resolve(Actions.state.customer);
			})
		}
	})
}

//获取分类
Actions.getTypeList = async function(isreq = false) {
	return await new Promise((resolve, reject) => {
		if (Actions.state.typeList && !isreq) {
			resolve(Actions.state.typeList)
		} else {
			base.post('app/goods/categoryList', {isTop:1}).then(res => {
				Actions.state.typeList = res.data;
				resolve(Actions.state.typeList);
			})
		}
	})
}

//获取用户信息
Actions.getUserInfo = async function(isreq = false) {
	return await new Promise((resolve, reject) => {
		if (Actions.state.userinfo && !isreq) {
			resolve(Actions.state.userinfo)
		} else {
			base.post('app/user/getUserInfo', {}).then(res => {
				// res.data.headImg=res.data.headImg || '/static/images/my/head.png'
				// if (res.data.mobile) {
				// 	res.data['tel'] = res.data.mobile.substr(0, 3) + '****' + res.data.mobile.substr(-4, 4);
				// } else {
				// 	res.data['tel'] = '';
				// }

				Actions.state.userinfo = res.data;
				resolve(Actions.state.userinfo);
			})
		}
	})
}

//经纬度转详细地址
Actions.showTabBarRed =async function() {
	return await new Promise((resolve, reject) => {
		if (!uni.getStorageSync('uid')) {
			resolve(0)
			return
		}
		base.post('app/cart/cartCount', {}).then(res => {
			if (getCurrentPages().length == 1) {
				if (res.data.count > 0) {
					uni.setTabBarBadge({
						index: 2,
						text: res.data.count.toString(),
					})
				} else {
					uni.removeTabBarBadge({
						index: 2,
						text: res.data.count,
					})
				}
			}
			resolve(res.data.count)
		})
	})
}

//经纬度转详细地址
Actions.getCodePoint = async function(lat, lng) {
	return await new Promise((resolve, reject) => {
		let url =
			`https://restapi.amap.com/v3/geocode/regeo?key=68dda1f7f5de7acdf0084b408c0d2551&location=${lat},${lng}&poitype=&radius=&extensions=base&batch=false&roadlevel=0`


		uni.request({
			url: url,
			success(res) {
				// console.log(1)
				console.log(res)
				if (res.statusCode != 200) {
					reject(res.data);
					return
				}
				if (res.data.regeocode && res.data.regeocode.addressComponent) {
					resolve(res.data.regeocode.addressComponent)
				}

			}
		})	

	})

}

//获取银行列表
Actions.getBankList = function() {
	let list = [{
			icon: '/static/images/adviser/bank/zs.png',
			name: '招商银行'
		},
		{
			icon: '/static/images/adviser/bank/yz.png',
			name: '邮政银行'
		},
		{
			icon: '/static/images/adviser/bank/js.png',
			name: '建设银行'
		},
		{
			icon: '/static/images/adviser/bank/gs.png',
			name: '工商银行'
		},
		{
			icon: '/static/images/adviser/bank/ny.png',
			name: '农业银行'
		},
		{
			icon: '/static/images/adviser/bank/jt.png',
			name: '交通银行'
		},
		{
			icon: '/static/images/adviser/bank/bj.png',
			name: '北京银行'
		},
		{
			icon: '/static/images/adviser/bank/cs.png',
			name: '长沙银行'
		}
	];
	return list;

}


//天气
Actions.getWeather = async function(isreq = true) {
	return await new Promise((resolve, reject) => {
		if (Actions.state.weather && !isreq) {
			resolve(Actions.state.weather)
		} else {
			myAmapFun.getWeather({
				success: function(data) {
					//成功回调
					console.log(data)
					Actions.state.weather = data;
					resolve(Actions.state.weather)
				},
				fail: function(info) {
					//失败回调
					console.log(info)
					reject(info);
				}
			})
		}
	})

}





//get省市区列表
Actions.getAreaList = function() {
	return new Promise((resolve, reject) => {
		if (Actions.state.areaList) {
			resolve(Actions.state.areaList)
		} else if (uni.getStorageSync('arealist')) {
			Actions.state.areaList = uni.getStorageSync('arealist');
			resolve(Actions.state.areaList)
		} else {
			base.post('app/madvert/getAreas', {}).then(res => {
				Actions.state.areaList = res.data;
				uni.setStorageSync('arealist', res.data)
				resolve(Actions.state.areaList);
			})
		}
	})
}

//经纬度获取位置详情
Actions.getAmapLoaction = function(longitude, latitude, isAll = 'base') {
	//isShowNibi  base 基础     all 基础、附近 POI 内容、道路信息以及道路交叉口信息
	return new Promise((resolve, reject) => {
		uni.request({
			url: `https://restapi.amap.com/v3/geocode/regeo?key=2d2929c0481cf3bba01921c156ffea73&location=${longitude||'112.93886'}%2C${latitude||'28.22778'}&extensions=${isAll}&s=rsx&platform=WXJS&appname=2d2929c0481cf3bba01921c156ffea73&sdkversion=1.2.0&logversion=2.0`,
			method: 'GET',
			data: {},
			success: res => {
				resolve(res.data);
			},
			fail: (err) => {
				uni.showToast({
					icon: 'none',
					title: '获取地址失败' + JSON.stringify(err)
				})
				reject(err);
			},
			complete: () => {}
		});
	})
}

//定位
Actions.getLoaction = function() {
	return new Promise((resolve, reject) => {
		if (Actions.state.city) {
			resolve(Actions.state.city)
		} else {
			// 实例化API核心类
			if (!qqmapsdk) {
				qqmapsdk = new QQMapWX({
					key: 'EYOBZ-4XV6O-X75WV-SNZSM-ROXD7-IAFQB'
				});
			}
			uni.showLoading({
				title: '读取位置中...',
				icon: 'none',
				mask: true
			})
			setTimeout(() => {
				qqmapsdk.reverseGeocoder({
					success: function(res) {
						uni.hideLoading();
						res.result.ad_info.city_code = res.result.ad_info.adcode;
						Actions.state.city = res.result.ad_info
						resolve(Actions.state.city);
					},
					fail: function(err) {
						reject(err)
					}
				})
			}, 500)
		}
	})
}

//定位
Actions.choosLoaction = function(data) {
	return new Promise((resolve, reject) => {
		// 实例化API核心类
		if (!qqmapsdk) {
			qqmapsdk = new QQMapWX({
				key: 'EYOBZ-4XV6O-X75WV-SNZSM-ROXD7-IAFQB'
			});
		}
		uni.showLoading({
			title: '读取位置中...',
			icon: 'none',
			mask: true
		})
		setTimeout(() => {
			qqmapsdk.reverseGeocoder({
				location:data,
				success: function(res) {
					uni.hideLoading();
					res.result.ad_info.city_code = res.result.ad_info.adcode;
					Actions.state.city = res.result.ad_info
					resolve(Actions.state.city);
				},
				fail: function(err) {
					reject(err)
				}
			})
		}, 500)
	})
}


Actions.getCode = function() {
	return new Promise((resolve, reject) => {
		uni.login({
			success: (data) => {
				resolve(data.code);
			},
			fail: (err) => {
				console.log('uni.login 接口调用失败，将无法正常使用开放接口等服务', err)
				reject(err)
			}
		})
	})
}

Actions.getUserOpenId = async function() {
	return await new Promise((resolve, reject) => {
		if (Actions.state.openid) {
			resolve(Actions.state.openid)
		} else {
			uni.login({
				success: (data) => {
					setTimeout(function() { //模拟异步请求服务器获取 openid
						const openid = '123456789'
						console.log('uni.request mock openid[' + openid + ']');
						Actions.state.openid = openid;
						resolve(openid)
					}, 1000)
				},
				fail: (err) => {
					console.log('uni.login 接口调用失败，将无法正常使用开放接口等服务', err)
					reject(err)
				}
			})
		}
	})
}



export default Actions;
