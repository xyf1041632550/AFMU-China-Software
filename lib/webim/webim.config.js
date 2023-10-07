const config = {
	xmppURL: 'wss://im-api-wechat.easemob.com/websocket', // xmpp Server地址，对于在console.easemob.com创建的appKey，固定为该值

	apiURL: 'https://a1.easemob.com', // rest Server地址，对于在console.easemob.com创建的appkey，固定为该值

	appkey: 'easemob-demo#chatdemoui', // App key

	https: false, // 是否使用https

	isHttpDNS: true, //防止DNS劫持从服务端获取XMPPUrl、restUrl

	isMultiLoginSessions: false, // 是否开启多页面同步收消息，注意，需要先联系商务开通此功能

	isAutoLogin: true, // 自动出席，（如设置为false，则表示离线，无法收消息，需要在登录成功后手动调 用conn.setPresence()才可以收消息）

	isDebug: false, // 打开调试，会自动打印log，在控制台的console中查看log

	autoReconnectNumMax: 2, // 断线重连最大次数

	autoReconnectInterval: 2, // 断线重连时间间隔

	heartBeatWait: 4500, // 使用webrtc（视频聊天）时发送心跳包的时间间隔，单位ms

	delivery: true, // 是否发送已读回执
}

import websdk from "./webimSDK3.1.2.js";

const WebIM = websdk;
WebIM.conn = new WebIM.connection({
	appKey: config.appkey,
	isHttpDNS: config.isHttpDNS,
	isMultiLoginSessions: config.isMultiLoginSessions,
	https: config.https,
	url: config.xmppURL,
	apiUrl: config.apiURL,
	isAutoLogin: true,
	heartBeatWait: config.heartBeatWait,
	autoReconnectNumMax: config.autoReconnectNumMax,
	autoReconnectInterval: config.autoReconnectInterval,
	isStropheLog: config.isStropheLog,
	delivery: config.delivery
});

const login = options => {
	WebIM.conn.open(options);
}

const logout = () => {
	WebIM.conn.close();
}

var optionsIm = {
	apiUrl: config.apiURL,
	user: '', //换成自己申请的账号就行，密码也需要换
	pwd: '123456',
	appKey: config.appkey,
	success: function(re) {
		// console.log('登陆成功')
	},
	error: function(err) {
		// console.log(err)
	}
}

// 环信的监听
WebIM.conn.listen({
	onOpened: function(message) { //连接成功回调
		// console.log(message);
		uni.setStorageSync("hxToken", message.accessToken);
		// console.log(uni.getStorageSync("hxToken"));
		console.log("登录环信服务器")
	},

	onClosed: function(message) {
		console.log(message);
		console.log("退出环信服务器")
	},

	onTextMessage: function(message) {
		// console.log(message);
		// console.log("接收到的消息是：" + message.data);
	},

	onOnline: function() {
		console.log("本机网络连接成功");
	},

	onOffline: function() {
		console.log("本机网络掉线");
		uni.showToast({
			title: '您的网络有点不太良好哦',
			duration: 2000,
			icon: "none"
		})
	},

	onRoster: function(message) {
		console.log("添加成功了新的好友");
	}
});
module.exports = {
	optionsIm:optionsIm,
	conn: WebIM.conn,
	login: login,
	logout: logout,
	WebIM: WebIM
};
