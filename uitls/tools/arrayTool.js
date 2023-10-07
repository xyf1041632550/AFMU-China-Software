
class ArrayTool {
  constructor() {
  }
}
//获取最小值
ArrayTool.getMinVal=function(list) {
	let val;
	Math.min.apply(null, list)
	return val;
}
//获取最大值
ArrayTool.getMaxVal=function(list) {
	let val;
	Math.max.apply(null, list)
	return val;
}
//数组排序从小到大
ArrayTool.sortMin=function(list, pro = '') {
	if (pro == '') {
		let i = 0;
		let l = 1;
		while (l < list.length) {
			for (let j = l; j > i; j--) {
				if (list[j] < list[j - 1]) {
					let v = list[j - 1];
					list[j - 1] = list[j];
					list[j] = v;
				} else {
					break;
				}
			}
			l++
		}
		return list;
	} else {
		let i = 0;
		let l = 1;
		while (l < list.length) {
			for (let j = l; j > i; j--) {
				if (list[j][pro] < list[j - 1][pro]) {
					let v = list[j - 1];
					list[j - 1] = list[j];
					list[j] = v;
				} else {
					break;
				}
			}
			l++
		}
		return list;
	}
}
//数组排序从大到小
ArrayTool.sortMax=function(list, pro = '') {
	if (pro == '') {
		let i = 0;
		let l = 1;
		while (l < list.length) {
			for (let j = l; j > i; j--) {
				if (list[j] > list[j - 1]) {
					let v = list[j - 1];
					list[j - 1] = list[j];
					list[j] = v;
				} else {
					break;
				}
			}
			l++
		}
		return list;
	} else {
		let i = 0;
		let l = 1;
		while (l < list.length) {
			for (let j = l; j > i; j--) {
				if (list[j][pro] > list[j - 1][pro]) {
					let v = list[j - 1];
					list[j - 1] = list[j];
					list[j] = v;
				} else {
					break;
				}
			}
			l++
		}
		return list;
	}
}
//查找并返回值,可选返回index
ArrayTool.findList=function(list, val, pro = '', findIndex = false) {
	let temp = val;
	if (pro != '') {
		// temp = val[pro];
		for (let i = 0; i < list.length; i++) {
			// console.log(list[i][pro],temp)
			if (list[i][pro] == temp) {
				return findIndex ? i : list[i]
			}
		}
	} else {
		for (let i = 0; i < list.length; i++) {
			if (list[i] == temp) {
				return findIndex ? i : list[i]
			}
		}
	}
	return findIndex?-1:false;
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
export default ArrayTool;
