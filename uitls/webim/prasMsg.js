import TimeTool from '@/uitls/tools/timeTool.js';
import ArrayTool from '@/uitls/tools/arrayTool.js';
import Emoji from './emoji.js';
class PrasMsg {
  constructor() {
  }
}

PrasMsg.msgList=null;//消息列表
PrasMsg.msgnum=0;//消息数量
PrasMsg.maxMsgLength=20;//每个聊天最大缓存消息条数

//保存缓存消息列表
PrasMsg.saveMsg=function(){
	//console.log(PrasMsg.msgList)
	let uid= uni.getStorageSync('uid');
	let key='msglist'+uid;
	uni.setStorageSync(key,JSON.stringify(PrasMsg.msgList));
}

//提取缓存消息列表
PrasMsg.parseMsg=function(){
	let uid= uni.getStorageSync('uid');
	console.log(uid)
	if(!uid){
		PrasMsg.msgList=[]
		return PrasMsg.msgList}
	let key='msglist'+uid;
	let list=uni.getStorageSync(key);
	if(list){
		PrasMsg.msgList=JSON.parse(list);
	}else{
		PrasMsg.msgList=[];
	}
	console.log(PrasMsg.msgList)
	PrasMsg.comMsgnum();
	return PrasMsg.msgList;
	
}

PrasMsg.msgType={
	txt:1,
	bq:2,
	pic:3,
	audio:4
}

//发送消息
PrasMsg.textSend=function(message) {
	console.log(message)
	let txt=message.msg;
	let duration=1000;
	if(message.msgtype=='bq'){
		let emoji=ArrayTool.findList(Emoji.list,message.msg,'title');
		if(emoji){
			txt=emoji.url;
		}
	}else if(message.msgtype=='audio'){
		duration=message.duration;
	}
	let data={
		txt:txt,
		time:TimeTool.getTime(),
		msgType:PrasMsg.msgType[message.msgtype],//1文本 2表情
		issend:true,
		duration:duration,
		isread:true,
		tzid:message.tzid
	}
	//console.log(message.to)
	let index=-1;
	if(PrasMsg.msgList.length>0){
		index=ArrayTool.findList(PrasMsg.msgList,message.to,'from',true);
	}
	let obj=null;
	if(index==-1){
		obj={
			from:message.to,
			name:message.name,
			photo:message.photo,
			type:message.type,
			list:[data],
			isread:true,
			shield:false,
			tzid:message.tzid
		}
		// console.log(obj)
		PrasMsg.msgList.unshift(obj);
	}else{
		PrasMsg.msgList[index].list.push(data);
		if(PrasMsg.msgList[index].list.length>PrasMsg.maxMsgLength){
			PrasMsg.msgList[index].list.splice(0,1);
		}
		obj=PrasMsg.msgList[index];
		PrasMsg.msgList.splice(index,1);
		PrasMsg.msgList.unshift(obj);
		PrasMsg.readMsg('',index);
		if(message.photo!=PrasMsg.msgList[0].photo||message.name!=PrasMsg.msgList[0].name){
			PrasMsg.msgList[0].photo=message.photo;
			PrasMsg.msgList[0].name=message.name;
		}
	}
	PrasMsg.saveMsg();
	return obj;
}

//获取
PrasMsg.textMessage=function(message) {
	console.log(message)
	let txt=message.data;
	let duration=1000;
	if(message.ext.msgtype=='bq'){
		let emoji=ArrayTool.findList(Emoji.list,message.data,'title');
		if(emoji){
			txt=emoji.url;
		}
	}else if(message.ext.msgtype=='audio'){
		duration=message.ext.duration;
	}
	let data={
		txt:txt,
		time:TimeTool.getTime(parseInt(message.time)),
		msgType:PrasMsg.msgType[message.ext.msgtype],//1文本 2表情
		issend:false,
		duration:duration,
		isread:false,
		tzid:message.ext.tzid
	}
	let index=-1;
	if(PrasMsg.msgList.length>0){
		index=ArrayTool.findList(PrasMsg.msgList,message.from,'from',true);
	}
	if(index==-1){
		let obj={
			from:message.from,
			name:message.ext.name,
			photo:message.ext.photo,
			type:message.ext.type,
			list:[data],
			isread:false,
			shield:false,
			tzid:message.ext.tzid
		}
		PrasMsg.msgList.unshift(obj);
	}else{
		if(PrasMsg.msgList[index].shield){return} //如果屏蔽则不接受消息
		PrasMsg.msgList[index].list.push(data);
		if(PrasMsg.msgList[index].list.length>PrasMsg.maxMsgLength){
			PrasMsg.msgList[index].list.splice(0,1);
		}
		let objs=PrasMsg.msgList[index];
		PrasMsg.msgList.splice(index,1);
		PrasMsg.msgList.unshift(objs);
		PrasMsg.msgList[0].isread=false;
		if(message.ext.photo!=PrasMsg.msgList[0].photo||message.ext.name!=PrasMsg.msgList[0].name){
			PrasMsg.msgList[0].photo=message.ext.photo;
			PrasMsg.msgList[0].name=message.ext.name;
		}
		uni.$emit('msgReceive', {toid:message.from})
	}
	PrasMsg.comMsgnum();
	PrasMsg.saveMsg();
	
}



PrasMsg.emojiMessage=function(message) {
	//console.log(message)
}

//计算未读消息
PrasMsg.comMsgnum=function(){
	let num=0;
	PrasMsg.msgList.map(k=>{
		let i=0;
		k.list.map(v=>{
			if(!v.isread){
				num++;
				i++
			}
		})
		if(i>0){
			k.isread=false;
		}else{
			k.isread=true;
		}
	})
	PrasMsg.msgnum=num;
	// console.log(num)
	// console.log(getCurrentPages().length)
	try{
		if(getCurrentPages().length==1){
			PrasMsg.getMsgnum();
		}
	}catch(e){
		//TODO handle the exception
	}
	
}
PrasMsg.getMsgnum=function(){
	
	let num=Math.min(99,PrasMsg.msgnum);
	let textnum=num>0?num.toString():'';
	if(num>0){
		wx.setTabBarBadge({
			index:1,
			text:textnum,
			success:function(res){
				//console.log(res)
			},fail(err){
				////console.log(err)
			}
		})
	}else{
		wx.removeTabBarBadge({
		index:1,
	})
	}
	
}

//阅读消息
PrasMsg.readMsg=function(from,index=-1){
	if(index!=-1){
		
	}else{
		index=ArrayTool.findList(PrasMsg.msgList,from,'from',true);
	}
	try{
		PrasMsg.msgList[index].list.map(v=>{
			v.isread=true;
		})
		PrasMsg.msgList[index].isread=true;
	}catch(e){
		//TODO handle the exception
	}
	PrasMsg.saveMsg();
	PrasMsg.comMsgnum();
	
}

//屏蔽
PrasMsg.shield=function(from,shield=true){
	let index=ArrayTool.findList(PrasMsg.msgList,from,'from',true);
	if(index!=-1){
		PrasMsg.msgList[index].shield=shield;
	}else{
		let obj={
			from:from,
			name:'',
			photo:'',
			type:1,
			list:[],
			isread:true,
			shield:shield
		}
		PrasMsg.msgList.push(obj);
	}
}


export default PrasMsg;
