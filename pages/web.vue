<template>
	<view class="page" style="color: #fff;" >
		{{a}}|{{b}}
	</view>
</template>

<script>
	function getHrefObj() {
		var loc =window.location.href;
		
		var n1 = loc.length; //地址的总长度
		var n2 = loc.indexOf("s/?"); //取得?号的位置
		var urlParams = '';
		
		if (n2 != -1) {
			urlParams = decodeURI(loc.substr(n2 + 3, n1 - n2)); //从?号后面的内容
		}
		
		let nn1=urlParams.indexOf('#');
		if (nn1 != -1) {
			urlParams = decodeURI(urlParams.substr(0,nn1)); //从?号后面的内容
		}
		
		let nn2=urlParams.indexOf('/');
		if (nn2 != -1) {
			urlParams = decodeURI(urlParams.substr(0,nn2)); //从?号后面的内容
		}
		return urlParams;
	}
	export default {
		components: {
			
		},
	
	
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(op) {
			// #ifdef H5
				this.a=window.location.href;
				
				let obj=getHrefObj();
				this.b=obj;
				console.log(obj)
				if(obj){
					this.getData(obj)
				}
			// #endif
			// window.location.href=('https://wxaurl.cn/rZMyH07bgtk')
		},
	
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow() {
	
	
		},
	
		methods: {
			/**
			 * huoqu
			 */
			getData(id){
				let this_=this;
				this.base.post('api/promote/getAssociation',{id:id}).then(res=>{
					window.location.href=res.data;
				})
				
			},
	
	
		},
	
	
	
		/**
		 * 生命周期函数--下拉刷新
		 */
		onPullDownRefresh() {
	
	
		},
	
	
		/**
		 * 生命周期函数--触底
		 */
		onReachBottom() {
	
		},
	
		data() {
			return {
				url:'',
				a:'',
				b:'',
				c:''
			}
		},
	
	
	}
	
</script>

<style>
</style>