<template>
	<view class="page" >
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	
	export default {
		components: {
			
		},
	
	
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(op) {
			let list=[
				{url:'https://h5.usfsoft.com/mall/zkd',title:'赚咖豆'},
				{url:'https://h5.usfsoft.com/mall/aboutMall',title:'关于商城'},
			]
			this.url=list[op.type||0].url;
			wx.setNavigationBarTitle({
			  title: list[op.type||0].title
			})
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
			getData(){
				let this_=this;
				this.base.get('mall/explain',{code:'gysc'}).then(res=>{
					this_.content=res.data.content;
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
				url:''
			}
		},
	
	
	}
	
</script>

<style>
</style>