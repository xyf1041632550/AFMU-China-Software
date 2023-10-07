<template>
	<view class="mask fid-all col_c">
		<view class="auth-box col_c">
			<view class="auth-logo-box row_c">
				<image class="auth-logo" src="/static/images/logo.png" mode="aspectFit"></image>
				<view class="auth-name">健康商城</view>
			</view>
			<view class="auth-txt row_c">
				<text>应用需要使用您的联系方式</text>
			</view>
			<view class="btns row_a">
				<view class="auth-btn btn row_c" @click="onBack" v-if='showCancel'>先看看</view>
				<button class="auth-btn btn-act btn row_c" open-type="getPhoneNumber" @getphonenumber='getPhone'>好的</button>
			</view>
		</view>
		<!-- <button class="mask fid-all" open-type="getUserInfo" @getuserinfo='getUserInfo' ></button> -->
		<randomInfo  v-if="showRandUser" @close='onClose' @click='randInfo'></randomInfo>
	</view>
</template>

<script>
	import randomInfo from '@/m-com/randomInfo.vue'
	export default {
		components: {randomInfo},
		props: {
			showCancel: {
				type: Boolean,
				default: true
			},
		},
		watch: {

		},
		computed: {

		},
		data() {
			return {
				isShow: false,
				code: '',
				showRandUser:false
			}
		},
		mounted() {
			let this_ = this;
			this.isShow = true;
			uni.login({
				success(r) {
					//console.log(r)
					this_.code = r.code;
				}
			})

		},
		methods: {
			onBack() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			
			//getPhone
			getPhone(e){
				console.log(e)
				let this_=this;
				if(!this.$Global.tool.checkClick()){return};
				if(!e.detail.encryptedData){
					this.$Global.tool.routerBack(10);
					return
				}
				let data={
					code: this_.code,
					encryptedData:e.detail.encryptedData,
					iv:e.detail.iv
				}
				this.base.post('user/modifyWeChatMobile',data).then(res=>{
					this.showRandUser=true;
					return
					this.mint.confirm('是否更新用户头像昵称，需要您在稍后的弹窗点击允许').then(r=>{
						wx.getUserProfile({
						      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
						      success: (r) => {
								  console.log(r)
									console.log(r.userInfo.avatarUrl)
									console.log(r.userInfo.nickName)
									this_.updateUser(r.userInfo)
						      },fail(f) {
								  console.log(f)
						      	// this_.$Global.tool.routerBack(10);
								uni.reLaunch({
									url:'/pages/index/index'
								})
						      }
						    })
					});
					
					
				})
			},
			onClose(){
				this.showRandUser=false;
				this_.$Global.tool.routerBack(10);
				// uni.reLaunch({
				// 	url:'/pages/index/index'
				// })
			},
			//randInfo
			randInfo(e){
				this.showRandUser=false;
				console.log(e)
				e.id=123;
				let info={
					avatar:e.photo,
					  nickName:e.name
				};
				this.updateUser(info);
			},
			
			updateUser(res){
				let this_=this;
				let data={
					avatar:res.avatarUrl||res.avatar,
					nickName:res.nickName,
				}
				this_.base.post('user/modify',data).then(res=>{
					this.mint.toast(res.msg);
					this_.$Global.tool.routerBack(10);
					// uni.reLaunch({
					// 	url:'/pages/index/index'
					// })
				})
			},
		}
	}
</script>

<style>
	.mask {
		background-color: rgba(0, 0, 0, 0.6);
	}

	.auth-box {
		border-radius: 20rpx;
		background-color: #fff;
		width: 610rpx;
		min-height: 300rpx;
		padding: 50rpx 20rpx 60rpx;
	}

	.auth-logo-box {}

	.auth-name {

		font-size: 38rpx;
		
		font-weight: bold;
		color: #333333;
		line-height: 49rpx;
	}

	.auth-logo {
		background-color: #fff;
		width: 62rpx;
		height: 62rpx;
		border-radius: 50%;
		border: 1rpx solid #f1f1f1;
		margin-right: 18rpx;
	}

	.auth-txt {
		margin: 40rpx 0 80rpx;
		font-size: 32rpx;
		
		font-weight: bold;
		color: #333333;
		line-height: 48rpx;
	}

	.btns {
		width: 540rpx;
	}

	.auth-btn {
		width: 248rpx;
		height: 80rpx;
		background: #FFFFFF;
		border: 2rpx solid #D2D2D2;
		border-radius: 40rpx;
		font-size: 30rpx;
		
		font-weight: bold;
		color: #AEAEAE;
		line-height: 50rpx;


	}

	.btn-act {
		border: 2rpx solid #E62A1A;
		background: #E62A1A;
		color: #FFFFFF;
	}
</style>
