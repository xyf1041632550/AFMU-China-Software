// import TimeTool from '@/uitls/tools/timeTool.js';
// import ArrayTool from '@/uitls/tools/arrayTool.js';
// import {Base} from '@/uitls/request/base.js'
// let base = new Base();
let isClick = false;
class Tool {
	constructor() {}
}

Tool.state = null; //state


//setTimeOut
Tool.setTimeOut = async function(t=1000) {
	return await new Promise((resolve, reject) => {
		setTimeout(()=>{
			resolve('out')
		},t)
	})
}

//setClose
Tool.setClose = function(op) {
	if (op.close == 1) {
		Tool.state.isClose = true;
	}
}

//setUid
Tool.setUid = function(op) {
	if (op.uid) {
		uni.setStorageSync('uid', op.uid)
	}
}

//CheckClick
Tool.checkClick = function(time = 1000) {
	if (isClick) {
		return false;
	}
	isClick = true;
	setTimeout(() => {
		isClick = false;
	}, time)
	return true;
}

//routerback
Tool.routerBack = function(time = 1000) {
	setTimeout(() => {
		uni.navigateBack()
	}, time)
}

//routerto
Tool.routerTo = function(url, time = 0) {
	setTimeout(() => {
		uni.navigateTo({
			url: url
		})
	}, time)
}

//redirectTo
Tool.redirectTo = function(url, time = 0) {
	setTimeout(() => {
		uni.redirectTo({
			url: url
		})
	}, time)
}

//reLaunch
Tool.reLaunch = function(url, time = 0) {
	setTimeout(() => {
		uni.reLaunch({
			url: url
		})
	}, time)
}

//预览单图
Tool.onPreviewImage = function(img) {
	uni.previewImage({
		urls: [img]
	})
}

//setUid
Tool.setUid = function(op) {
	if (op.uid) {
		uni.setStorageSync('uid', op.uid)
	}
}

//是否ios
//是否ios
Tool.isIos = function() {
	let u = uni.getSystemInfoSync().platform;
	let isAndroid = u=='android'; //android终端
	// let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if (isAndroid) {
		return false;
	} else {
		return true;
	}
}

Tool.isWeiXin = function() {
		var ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true;
		} else {
			return false;
		}
	}



export default Tool;
