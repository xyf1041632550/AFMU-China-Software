
class TimeTool {
  constructor() {
  }
}
/**
 * getTime(value,type,str)           时间戳转日期(日期||时间戳，转换类型，连接符)
 * 
 * getTimestamp(value='')   		 获取时间戳(可传日期)
 * 
 * getTimeDate(value='')   			 日期转日期(日期，转换类型，连接符)
 * 
 * passTime(value,s,m,h,d,mm,y)      获取距现在的时间间隔(日期||时间戳，转换符)
 * 
 * formatSeconds(value)     		 秒转00：00字符显示

 */



//解析时间 dhms->天时分秒结尾
TimeTool.getTime = function(value, type ='ym',str='-'){
	let time;
	if(typeof value === 'number' && !isNaN(value)){
		  time=String(value).length < 13?value *1000:value;
	}else{
		  time=TimeTool.getTimestamp(value)
	}
  var nows = new Date(time);
  var years = nows.getFullYear();
  var months = nows.getMonth() + 1;
  var days = nows.getDate();
  var hour = nows.getHours();
  var min = nows.getMinutes();
  var s = nows.getSeconds();

  s=s < 10?'0' + s:s;
  hour=hour < 10?'0' + hour:hour;
  min=min < 10?'0' + min:min;

  let data={
	  y:years,
	  m:months,
	  d:days,
	  h:nows.getHours(),
	  mine:nows.getMinutes(),
	  s:nows.getSeconds(),
	  Ymdate:years + "年" + months + "月" + days + "日" + hour + ":" + min,
	  YDdate:years + "年" + months + "月" + days + "日",
	  MDdate:months + "月" + days + "日",
	  yd:[years,months,days].join(str),
	  ym:[years,months,days].join(str)+' '+[hour,min].join(':'),
	  ys:[years,months,days].join(str)+' '+[hour,min,s].join(':'),
	  hs:[hour,min,s].join(':'),
	  hm:[hour,min].join(':'),
	  ms:[min,s].join(':'),
	yh:[months,days].join(str)+' '+hour+'点',
  }
  return data[type]||data.ys;
}

//日期转时间戳
TimeTool.getTimestamp=function(value=''){
  var date = new Date(); //时间对象
  if(value!=''){
    date = new Date(Date.parse(value.replace(/-/g, "/")));
  }
  var str = date.getTime(); //转换成时间戳
  // var time2 = date.valueOf();
  // var time3 = Date.parse(date);
  return str;
}

//日期转换格式
TimeTool.getTimeDate=function(n, type ='ym',str='-'){
	return TimeTool.getTime(TimeTool.getTimestamp(n),type,str);
}

//日期距现在的时间
TimeTool.passTime=function(value,s='秒前',m='分钟前',h='小时前',d='天前',mm='月前',y='年前'){
  let oldTime;
  if(typeof value === 'number' && !isNaN(value)){
	  oldTime=String(value).length < 13?value *1000:value;
  }else{
	  oldTime=TimeTool.getTimestamp(value)
  }
  let nowTime=TimeTool.getTimestamp();
  let invTime=(nowTime-oldTime)/1000;
  
  if(invTime>60*60*24*30*365){
	  return parseInt(invTime/(60*60*24*30*365))+y;
  }else if(invTime>60*60*24*30){
	  return parseInt(invTime/(60*60*24*30))+mm;
  }else if(invTime>60*60*24){
	  return parseInt(invTime/(60*60*24))+d;
  }else if(invTime>60*60){
	  return parseInt(invTime/(60*60))+h;
  }else if(invTime>60){
	  return parseInt(invTime/60)+m;
  }else {
	  return parseInt(invTime)+s;
  }
}

//将进度转00：00时间
TimeTool.formatSeconds=function(value,type=0) {
  var theTime = parseInt(value);// 秒 
  var theTime1 = 0;// 分 
  var theTime2 = 0;// 小时 
  // alert(theTime); 
  if (theTime > 60) {
    theTime1 = parseInt(theTime / 60);
    theTime = parseInt(theTime % 60);
    // alert(theTime1+"-"+theTime); 
    if (theTime1 > 60) {
      theTime2 = parseInt(theTime1 / 60);
      theTime1 = parseInt(theTime1 % 60);
    }
  }
  // var result = "" + parseInt(theTime) + "秒";
  var result = "" + parseInt(theTime);
  if (result < 10) {
    result = "0" + parseInt(theTime);
  }
  if (theTime1 > 0) {
    if (theTime1 < 10) {
      result = "0" + parseInt(theTime1) + ":" + result;
    } else {
      result = "" + parseInt(theTime1) + ":" + result;
    }
  } else {
    result = "00:" + result;
  }
  if (theTime2 > 0) {
    if (theTime2 < 10) {
      result = "0" + parseInt(theTime2) + ":" + result;
    } else {
      result = "" + parseInt(theTime2) + ":" + result;
    }
  }
  if(type==1){
    var list = [parseInt(theTime2), parseInt(theTime1), parseInt(theTime)];
    list.map(function(v){
      if(v<10){
        v='0'+v;
      }
    })
    result = list[0]+'时 '+list[1]+'分 '+list[2]+'秒';
  }
  return result;
}

/**
 * 字符串处理
 * str.split(s)  把str用s分割为数组 若s为空则对每个字符进行分割
 * str.substr(n1,:n2) 从n1开始截取n2个长度的str  n2不传则开始之后全部截取 
 * str.charAt(n) 返回str在n位置的字符 
 * str.indexOf(s) 找出str里的第一个s所在的位置，无则返回-1,s对大小写不敏感
 * str.lastIndexOf(s) 同上 s对大小写敏感
 * str.replace(s,ss)  把str的s用ss替换掉
 */

/**
 * 数组处理
 * array.shift(); 删除并返回首位元素
 * array.pop()   删除并返回末位元素
 * array.splice(n1,n2) 从n1开始 删除n2位元素
 */
export default TimeTool;
