let baseUrl='';  //web2app h5 基础域名
let url='https://hnyixiang.vip/';							//紫色一番赏
// #ifdef H5
	// baseUrl=window.location.protocol+"//"+window.location.host;
	// url='https://hnyixiang.vip/';							//紫色一番赏
// #endif
// #ifndef H5
	baseUrl=url; 						//NO H5写死域名
// #endif

let basePath='';                                       //项目路径
baseUrl=url;

let projectName='';				//项目名称

let userKey='uid';												//项目用户标识

let isWxPublic=false;											//是否为公众号

let appId='wx9ad3288a6a46dfd1';									//公众号APPID

let wxPublicUserKey='1001';										//测试公众号模拟用户标识  略过授权

let scopeMode={info:'snsapi_userinfo',base:'snsapi_base'}.info; //公众号的授权模式 info||base

let redirectUri = encodeURIComponent(baseUrl + basePath + 'index.html#/pages/wxpublic/wxpublic'); //公众号的登录回调地址

let wxPublicLoginUrl='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+appId+'&redirect_uri='+redirectUri+'&response_type=code&scope='+scopeMode+'&state=1&connect_redirect=1#wechat_redirect';		//公众号授权URL

let requestBaseUrl='api/';									//代理适配

let prefixUrl=url+basePath;                                     //代理域名



if(process.env.NODE_ENV === 'development'){
	//测试公众号模拟用户标识  略过授权
    if(isWxPublic){
		localStorage[userKey]=wxPublicUserKey;
	}
	
	
}else{
	//正式环境不使用代理
    requestBaseUrl=baseUrl+basePath;
}

// #ifndef H5
console.log(1)
requestBaseUrl=baseUrl+basePath;
// #endif
const config = {
		baseUrl,
		basePath,
		projectName,
		userKey,
		appId,
		isWxPublic,
		redirectUri,
		wxPublicLoginUrl,
		requestBaseUrl,
		prefixUrl
    }
export default config;
