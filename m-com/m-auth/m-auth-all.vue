<template>
	<view class="">
		<view class="mask fid-all" v-if='isShows' @click="onClick"></view>
		<button class="mask fid-all" open-type="getUserInfo" @getuserinfo='getUserInfo' v-if='isShow'></button>
	</view>
</template>

<script>
	export default {
		components: {},
		props: {
			
		},
		watch: {

		},
		computed: {

		},
		data() {
			return {
				isShow: false,
				isShows:false,
			}
		},
		mounted() {
			if(!uni.getStorageSync('mobile')){
				this.isShows=true;
				
			}
			
			if(!uni.getStorageSync('uid')){
				uni.hideTabBar();
				this.isShow=true;
			}else{
				this.$Global.actions.getUserInfo(true).then(r=>{
					if(r.mobile){
						uni.setStorageSync('mobile',r.mobile);
						this.isShows=false;
					}
				})
			}
			
		},
		methods: {
			//onClick
			onClick() {
				this.mint.confirm('需要先注册才能使用，是否立即注册？').then(r=>{
					this.$Global.tool.routerTo('/pages/account/register/register',0);
				});
			},
			//getUserInfo
			getUserInfo(e) {
				let this_=this;
				// console.log(e)
				// console.log(e.detail.encryptedData)
				// console.log(e.detail.iv)
				uni.login({
					success(r) {
						let data={
							code:r.code,
							encryptedData:e.detail.encryptedData,
							iv:e.detail.iv
						}
						// console.log(data)
						// return
						this_.base.post('vip/getAppletUser',data,false).then(res=>{
							uni.showTabBar();
							this_.isShow=false;
							uni.setStorageSync('uid',res.data.token)
							this_.$Global.actions.getUserInfo(true).then(r=>{
								if(r.mobile){
									uni.setStorageSync('mobile',r.mobile)
									this_.isShows=false;
								}
							})
						})
					}
				})
			},
		}
	}
</script>

<style>
	.mask {
		background-color: rgba(0, 0, 0, 0);
	}

	
</style>
