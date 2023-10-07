
import Actions from './actions.js'
import Tool from './tool.js'
//环信	
// let WebIM = require("../uitls/webim/WebIM.js")["default"];
// import PrasMsg from '../uitls/webim/prasMsg.js'



class Global {
	constructor(arg) {

	}
}

//全局属性
Global.state = {
	//start tool 工具类
	isClick: false,
	isClose:false,
	//end tool

	//start 
	areaList: null,  //省市区
	userInfo:null,  //用户数据
	address:null,//选择的地址
	
	lxObj:null,//购物车列表
	orderItem:null,//下单规格
	//end 

	//start webim
	// msgList: [],
	//end webim

}


//全局通用方法
Actions.state=Global.state;
Global.actions=Actions;

//全局工具方法
Tool.state=Global.state;
Global.tool = Tool;


//环信方法
// Global.webim={
// 	//getMsgnum
// 	getMsgnum:function() {
// 		PrasMsg.getMsgnum()
// 	},
// 	//阅读消息
// 	readMsg:function(from){
// 		PrasMsg.readMsg(from);
// 	},

// 	//屏蔽与解除
// 	shield:function(from,shield=true){
// 		PrasMsg.shield(from,shield);
// 	}, 

// 	//初始化聊天数组
// 	startMsgList:function(){
// 		if(!PrasMsg.msgList){
// 			Global.state.msgList=PrasMsg.parseMsg();
// 			// PrasMsg.msgList=Global.state.msgList;
// 		}
// 	},

// 	quit:function(){
// 		WebIM.conn.close();
// 	},

// 	//登录
// 	login:function(username){
// 		WebIM.optionsIm.user = username;
// 		WebIM.optionsIm.pwd = '123456';
		
// 		WebIM.conn.open(WebIM.optionsIm);

// 		// 监听回调
// 		WebIM.conn.listen({
// 		  onOpened: function(message) {
// 			Global.state.msgList=PrasMsg.parseMsg();
// 		    console.log("用户已上线");
// 		  },
// 		  onClosed: function(message) {
// 		    console.log("用户下线");
// 		  },
// 		   onTextMessage: function ( message ) {
// 			   console.log(message)
// 			   PrasMsg.textMessage(message);

// 		   },    //收到文本消息
// 		      onEmojiMessage: function ( message ) {
// 				  PrasMsg.textMessage(message);
// 			  },   //收到表情消息
// 		      onPictureMessage: function ( message ) {}, //收到图片消息
// 		      onCmdMessage: function ( message ) {},     //收到命令消息
// 		      onAudioMessage: function ( message ) {},   //收到音频消息
// 		      onLocationMessage: function ( message ) {},//收到位置消息
// 		      onFileMessage: function ( message ) {},    //收到文件消息
// 		      onCustomMessage: function ( message ) {},  //收到自定义消息
// 		      onVideoMessage: function (message) {
// 		          var node = document.getElementById('privateVideo');
// 		          var option = {
// 		              url: message.url,
// 		              headers: {
// 		                'Accept': 'audio/mp4'
// 		              },
// 		              onFileDownloadComplete: function (response) {
// 		                  var objectURL = WebIM.utils.parseDownloadResponse.call(conn, response);
// 		                  node.src = objectURL;
// 		              },
// 		              onFileDownloadError: function () {
// 		                  console.log('File down load error.')
// 		              }
// 		          };
// 		          WebIM.utils.download.call(conn, option);
// 		      },   //收到视频消息
// 		      onPresence: function ( message ) {},       //处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
// 		      onRoster: function ( message ) {},         //处理好友申请
// 		      onInviteMessage: function ( message ) {},  //处理群组邀请
// 		      onOnline: function () {},                  //本机网络连接成功
// 		      onOffline: function () {},                 //本机网络掉线
// 		      onError: function ( message ) {},          //失败回调
// 		      onBlacklistUpdate: function (list) {       //黑名单变动
// 		          // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
// 		          console.log(list);
// 		      },
// 		      onRecallMessage: function( message ){},    //收到消息撤回回执
// 		      onReceivedMessage: function(message){
// 				  // console.log('收到消息送达服务器回执')
// 				  // console.log(message)
// 			  },    //收到消息送达服务器回执
// 		      onDeliveredMessage: function(message){
// 				  // console.log('收到消息送达客户端回执')
// 				  // console.log(message)
// 			  },   //收到消息送达客户端回执
// 		      onReadMessage: function(message){
// 				  // console.log('收到消息已读回执')
// 				  // console.log(message)
// 			  },        //收到消息已读回执
// 		      onCreateGroup: function(message){},        //创建群组成功回执（需调用createGroupNew）
// 		      onMutedMessage: function(message){}        //如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
// 		});
// 	},

// 	// 单聊发送文本消息
// 	sendPrivateText:async function(msgs, toid,myname='111',myphoto='www.baidu.com',type=1,msgtype='txt') {
// 		return await new Promise((resolve, reject) => {
// 		  var id = WebIM.conn.getUniqueId();
// 		  var msg = new WebIM.message('txt', id); // 创建文本消息
// 		  console.log(toid)
// 		  console.log(Global.state.userinfo)
// 		  msg.set({
// 			msg: msgs, // 消息内容
// 			to: toid, // 接收消息对象（用户id）
// 			roomType: false,
// 			ext:{
// 			  name:Global.state.userinfo.name,
// 			  photo:Global.state.userinfo.photo,
// 			  msgtype:msgtype,
// 			  type:type
// 			},
// 			//扩展消息
// 			success: function(id, serverMsgId) {
// 				let data=PrasMsg.textSend({
// 					msg: msgs, // 消息内容
// 					to: toid, // 接收消息对象（用户id）
// 					name:myname,
// 					photo:myphoto,
// 					msgtype:msgtype,
// 					type:type
// 				});
// 				console.log(data)
// 				resolve(data);
// 				console.log('send private text Success');
// 			}, 
// 			fail: function(e) {
// 				// console.log("Send private text error"+JSON.stringify(e));
// 				reject(e);

// 			} 
// 		  });

// 		  WebIM.conn.send(msg.body);
// 	  })
// 	},

// 	// 单聊发送表情消息
// 	sendEmoji:async function(msgs, toid,myname='111',myphoto='www.baidu.com',type=1,msgtype='bq') {
// 		return await new Promise((resolve, reject) => {
// 		  var id = WebIM.conn.getUniqueId();
// 		  var msg = new WebIM.message('txt', id); // 创建文本消息
// 		  msg.set({
// 			msg: msgs, // 消息内容
// 			to: toid, // 接收消息对象（用户id）
// 			roomType: false,
// 			ext:{
// 			  name:Global.state.userinfo.name,
// 			  photo:Global.state.userinfo.photo,
// 			  msgtype:msgtype,
// 			  type:type
// 			},
// 			//扩展消息
// 			success: function(id, serverMsgId) {
// 				resolve(PrasMsg.textSend({
// 					msg: msgs, // 消息内容
// 					to: toid, // 接收消息对象（用户id）
// 					name:myname,
// 					photo:myphoto,
// 					msgtype:msgtype,
// 					type:type
// 				}));
// 				// console.log('send private text Success');
// 			}, 
// 			fail: function(e) {
// 				// console.log("Send private text error");
// 				reject(e);

// 			} 
// 		  });

// 		  WebIM.conn.send(msg.body);
// 	  })
// 	},

// 	// 单聊发送表情消息
// 	sendPic:async function(msgs, toid,myname='111',myphoto='www.baidu.com',type=1,msgtype='pic') {
// 		return await new Promise((resolve, reject) => {
// 		  var id = WebIM.conn.getUniqueId();
// 		  var msg = new WebIM.message('txt', id); // 创建文本消息
// 		  msg.set({
// 			msg: msgs, // 消息内容
// 			to: toid, // 接收消息对象（用户id）
// 			roomType: false,
// 			ext:{
// 			  name:Global.state.userinfo.name,
// 			  photo:Global.state.userinfo.photo,
// 			  msgtype:msgtype,
// 			  type:type
// 			},
// 			//扩展消息
// 			success: function(id, serverMsgId) {
// 				resolve(PrasMsg.textSend({
// 					msg: msgs, // 消息内容
// 					to: toid, // 接收消息对象（用户id）
// 					name:myname,
// 					photo:myphoto,
// 					msgtype:msgtype,
// 					type:type
// 				}));
// 				// console.log('send private text Success');
// 			}, 
// 			fail: function(e) {
// 				// console.log("Send private text error");
// 				reject(e);

// 			} 
// 		  });

// 		  WebIM.conn.send(msg.body);
// 	  })
// 	},

// 	// 单聊发送语音消息
// 	sendAudio:async function(msgs, toid,myname='111',myphoto='www.baidu.com',type=1,msgtype='audio',duration=1000) {
// 		duration=Math.max(parseInt(duration/1000),1)
// 		return await new Promise((resolve, reject) => {
// 		  var id = WebIM.conn.getUniqueId();
// 		  var msg = new WebIM.message('txt', id); // 创建文本消息
// 		  msg.set({
// 			msg: msgs, // 消息内容
// 			to: toid, // 接收消息对象（用户id）
// 			roomType: false,
// 			ext:{
// 			  name:Global.state.userinfo.name,
// 			  photo:Global.state.userinfo.photo,
// 			  msgtype:msgtype,
// 			  type:type,
// 			  duration:duration
// 			},
// 			//扩展消息
// 			success: function(id, serverMsgId) {
// 				resolve(PrasMsg.textSend({
// 					msg: msgs, // 消息内容
// 					to: toid, // 接收消息对象（用户id）
// 					name:myname,
// 					photo:myphoto,
// 					msgtype:msgtype,
// 					type:type,
// 					duration:duration
// 				}));
// 				// console.log('send private text Success');
// 			}, 
// 			fail: function(e) {
// 				// console.log("Send private text error");
// 				reject(e);

// 			} 
// 		  });

// 		  WebIM.conn.send(msg.body);
// 	  })
// 	},

// }

export {
	Global
};
