class Verification {
	constructor() {}
}

/**
 * isNum(value)           			 是否为数字
 * 
 * getTimestamp(value='')   		 获取时间戳(可传日期)
 * 
 * getTimeDate(value='')   			 日期转日期(日期，转换类型，连接符)
 * 
 * passTime(value,s,m,h,d,mm,y)      获取距现在的时间间隔(日期||时间戳，转换符)
 * 
 * formatSeconds(value)     		 秒转00：00字符显示

 */


//isNum
Verification.isNum = function(value, txt = '') {
	if (typeof value === 'number' && !isNaN(value)) {
		return true;
	} else {
		!txt||showModel(txt+'不是数字');
		return false;
	}
}

//isNotEmpty
Verification.isNotEmpty = function(value, txt = '') {
	if (!value) {
		!txt||showModel(txt+'为空');
		return true;
	} else {
		return false;
	}
}

//is=0
Verification.isZero= function(value, txt = '') {
	if (value==0||value=='0') {
		!txt||showModel(txt+'为零');
		return true;
	} else {
		return false;
	}
}

Verification.isLenLarge = function(value,len,txt='') {
	if (String(value).length > len) {
		return true;
	} else {
		!txt||showModel(txt+'长度小于'+len);
		return false;
	}
}

Verification.isLenSmall = function(value,len,txt='') {
	if (String(value).length < len) {
		return true;
	} else {
		!txt||showModel(txt+'长度大于'+len);
		return false;
	}
}

Verification.isLenBett = function(value,small,large,txt='') {
	if (String(value).length <=large&&String(value).length >=small) {
		return true;
	} else {
		!txt||showModel(txt+'长度不符合规则');
		return false;
	}
}

Verification.isPhone = function(value,txt='') {
	value=String(value);
	if("1"==value.charAt(1)&&value.length==11){
		return true;
	} else {
		!txt||showModel('手机号格式不正确');
		return false;
	}
}

Verification.isEmail = function(value,txt='') {
	
	if (value.indexOf("@")!=-1 && value.indexOf(".")!=-1) {
		return true;
	} else {
		!txt||showModel('邮箱格式不正确');
		return false;
	}
}



function showModel(txt) {
	if (!txt) {
		return
	}

	uni.showToast({
		title: txt,
		mask: true,
		duration: 1500,
		icon: 'none'
	})

	// uni.showModal({
	// 	content:txt,title:'提示',showCancel:false
	// })
}

export default Verification;
