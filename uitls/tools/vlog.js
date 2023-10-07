
let logLv=1;   //0不显示日志 1显示普通日志  2显示警告及以下日志  3 显示错误及以下日志  4显示debug及以下日志


function vclog(txt,lv=logLv){
	let list=[
		function(){
			
		},
		function(){
			console.log(txt);
		},
		function(){
			console.warn(txt);
		}
		,
		function(){
			console.error(txt);
		}
		,
		function(){
			console.debug(txt);
		}
	]
	list[lv](txt);
}

export {
	vclog
}
