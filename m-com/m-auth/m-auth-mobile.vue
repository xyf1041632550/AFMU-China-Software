<template>

	<!-- <button class="mask fid-all" open-type="getUserInfo" @getuserinfo='getUserInfo' v-if='isShow'></button> -->
	<view class="mask fid-all" v-if='isShow' @click="onClick"></view>
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
				isShow: false
			}
		},
		mounted() {
			if(!uni.getStorageSync('mobile')){
				this.isShow=true;
				if(uni.getStorageSync('uid')){
					this.$Global.actions.getUserInfo(true).then(r=>{
						if(r.mobile){
							uni.setStorageSync('mobile',r.mobile);
							this.isShow=false;
						}
					})
				}
			}
		},
		methods: {
			//onClick
			onClick() {
				if(!uni.getStorageSync('mobile')){
					this.isShow=true;
					if(uni.getStorageSync('uid')){
						this.$Global.actions.getUserInfo(true).then(r=>{
							if(r.mobile){
								uni.setStorageSync('mobile',r.mobile);
								this.isShow=false;
							}
						})
					}
				}else{
					this.isShow=false;
					return
				}
				
				this.mint.confirm('需要先注册才能使用，是否立即注册？').then(r=>{
					this.$Global.tool.routerTo('/pages/account/register/register',0);
				});
			},
		}
	}
</script>

<style>
	.mask {
		background-color: rgba(0, 0, 0, 0);
	}

	
</style>
