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

//url传参转为对象
function getHrefObj() {
	var loc = window.location.href;
	var n1 = loc.length; //地址的总长度
	var n2 = loc.indexOf("?"); //取得?号的位置
	var urlParams = '';
	if (n2 != -1) {
		urlParams = decodeURI(loc.substr(n2 + 1, n1 - n2)); //从?号后面的内容
	}else{
		return {};
	}
	
	let nn1=urlParams.indexOf('#');
	if (nn1 != -1) {
		urlParams = decodeURI(urlParams.substr(0,nn1)); //从?号后面的内容
	}
	
	let arr = urlParams.split('&');
	let arrs = [];
	for (let i = 0; i < arr.length; i++) {
		let data = {
			str: arr[i]
		}
		arrs.push(data);
	}

	let object = {};
	arrs.map(v => {
		let n3 = v.str.indexOf("="); //取得?号的位置
		let n4 = v.str.length;
		let str = v.str.substr(n3 + 1, n4 - n3 - 1);
		let pro = v.str.substr(0, n3);
		object[pro] = str;
	})
	return object;
}

function formatRichText(html){
	html=html.replace('<!--HTML-->','')
	html=html.replace('style=""','')
	html=html.replace(/style=""/gi,'')
  let newContent= html.replace(/<img[^>]*>/gi,function(match,capture){
    match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
    match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
    match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
    return match;
  });
  newContent = newContent.replace(/style="[^"]+"/gi,function(match,capture){
    match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
    return match;
  });
  newContent = newContent.replace(/<br[^>]*\/>/gi, '');
  newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;width:100%;height:auto;display:block;margin-top:0;margin-bottom:0;"');
  return newContent;
}

/**
 * 解表情方法
 */
function Analysis(text) {
	let array = [];
	let isHava = true;
	let str = text;
	let strSub = "";
	let find = function(e) {
		str = e;
		strSub = e;
		let length = e.length;
		let startIndex = e.indexOf("[!");
		let endIndex = e.indexOf("!]");
		if (startIndex == -1 || endIndex == -1) {
			isHava = false;
			let strr = strSub;
			for (let i = 0; i < strr.length; i++) {
				let strrr = strr;
				let val = strrr.slice(i, i + 1)

				let data = {
					type: 0,
					val: val
				}
				array.push(data);
			}
			return;
		}
		let strr = strSub.slice(0, startIndex);
		for (let i = 0; i < strr.length; i++) {
			let strrr = strr;
			let val = strrr.slice(i, i + 1)

			let data = {
				type: 0,
				val: val
			}
			array.push(data);
		}

		strSub = str;
		let data1 = {
			type: 1,
			val: "https://m.uobrand.com/knowledge/public/static/tp/bq/" + strSub.slice(startIndex + 2, endIndex) + ".png"
		}
		strSub = str;
		str = strSub.slice(endIndex + 2);
		array.push(data1);
	}
	while (isHava) {
		find(str)
	}
	// console.log(array, str);
	return array;
}


/**
 * 解出url携带参数
 */
function getUrlData() {
	var loc = window.location.href;
	var n1 = loc.length; //地址的总长度
	var n2 = loc.indexOf("?"); //取得?号的位置
	var urlParams = '';
	if (n2 != -1) {
		urlParams = decodeURI(loc.substr(n2 + 1, n1 - n2)); //从?号后面的内容
	}
	console.log(urlParams.split('&'));
	let arr = urlParams.split('&');
	let arrs = [];
	for (let i = 0; i < arr.length; i++) {
		let data = {
			name: '',
			value: '',
			str: arr[i]
		}
		arrs.push(data);
	}
	let object = {};
	arrs.map(v => {
		let n3 = v.str.indexOf("="); //取得?号的位置
		let n4 = v.str.length;
		let str1 = v.str.substr(n3 + 1, n4 - n3 - 1);
		let pro = v.str.substr(0, n3);
		v.name = pro;
		v.value = str1;
		object[pro] = str1;
	})

	return object;
}

export {
	Analysis,
	getHrefObj,
	formatRichText
};
