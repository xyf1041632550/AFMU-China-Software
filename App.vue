<script>
	// import pageAnimation from './components/page-animation'
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
	
	
	export default {
		// mixins: [pageAnimation],
		onLaunch: function() {
			console.log(uni.getLocale())
			
			// #ifdef H5
				let obj=getHrefObj();
				console.log(obj)
				if(obj.token){
					uni.setStorageSync('uid',obj.token)
				}
			// #endif
			
			
			
			// #ifdef APP-PLUS
			let system = uni.getSystemInfoSync();
			
			
			let sysInfo = wx.getSystemInfoSync();
			
			let sale =750/(system.windowWidth || system.screenWidth) ;
			console.log(sale)
			let paddingTop = system.statusBarHeight * sale + 0;
			
			
			uni.setStorageSync('paddingTop', paddingTop)
			
			// #endif
			
			// #ifdef H5
				let system=uni.getSystemInfoSync();
				let sale=system.screenWidth/375*2;
				let paddingTop=system.statusBarHeight*sale+2;
				if(paddingTop<10){paddingTop=10}
				uni.setStorageSync('paddingTop',paddingTop)
			// #endif
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		}
	};
</script>

<style>
	@import '@/css/global.css';
	@import '@/css/reset.css';
	@import '@/css/ani.css';
	
	
	
	.w100{
		width: 100%;
	}
	.page{
		min-height: 100vh;
		background: #F9FCFF;
	}
	page {
		background: #F9FCFF;
	}
	@media (min-width: 900px) {
	  page{
	  	max-width:375px;
	  	
	  }
	}
	
	
	.b-img{
	width: 90%;
	margin: 0 5%;
	}
</style>
