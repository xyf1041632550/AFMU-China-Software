<template>
	<view class="mask fid-all col_c" style="opacity: 0.01;">
		<view class="auth-box col_c">
			<view class="auth-logo-box row_c">
				<image class="auth-logo" src="/static/images/logo.png" mode="aspectFit"></image>
				<view class="auth-name">健康商城</view>
			</view>
			<view class="auth-txt row_c">
				<text>应用需要使用您的头像和昵称</text>
			</view>
			<view class="btns row_a">
				<view class="auth-btn btn row_c" @click="onBack" v-if='showCancel'>先看看</view>
				<button class="auth-btn btn-act btn row_c" open-type="getUserInfo" @getuserinfo='getUserInfo'>好的</button>
			</view>
		</view>
		<!-- <button class="mask fid-all" open-type="getUserInfo" @getuserinfo='getUserInfo' ></button> -->
	</view>
</template>

<script>
	export default {
		components: {},
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
			}
		},
		mounted() {
			let this_ = this;
			this.isShow = true;
			uni.login({
				success(r) {
					//console.log(r)
					this_.code = r.code;
					wx.getUserInfo({
						success(e) {
							//console.log(e)
							this_.getUserInfo({detail:e})
						},fail(err) {
							//console.log(err)
						},complete(com) {
							//console.log(com)
						}
					})
				}
			})
			return
			if (!uni.getStorageSync('uid')) {
				// uni.hideTabBar();
				this.isShow = true;
				uni.login({
					success(r) {
						//console.log(r)
						this_.code = r.code;
						wx.getUserInfo({
							success(e) {
								//console.log(e)
								this_.getUserInfo({detail:e})
							},fail(err) {
								//console.log(err)
							},complete(com) {
								//console.log(com)
							}
						})
					}
				})
			} else {
				// this.$Global.tool.routerBack(0);
			}


		},
		methods: {
			onBack() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			//getUserInfo
			getUserInfo(e) {
				// //console.log(e)
				let this_ = this;
				if(!this_.$Global.tool.checkClick()){return};
				// //console.log(e)
				// //console.log(e.detail.encryptedData)
				// //console.log(e.detail.iv)
				let data = {
					code: this_.code,
					encryptedData: e.detail.encryptedData,
					iv: e.detail.iv
				}
				uni.showLoading({
					title:'授权中...'
				})
				console.log('code:'+this_.code)
				// return
				// https://ydkapp.usfsoft.com/ydk/app/live/wx/small/033n6J0w3cnJxZ2Wxs0w3fSGE62n6J0B
				uni.request({
					method:'GET',
					url:`https://ydkapp.usfsoft.com/ydk/app/live/wx/small/${this_.code}`,
					header:{appid:'wx3c18db36475ea7d5'},
					success(res) {
						console.log(res)
						uni.hideLoading()
						uni.setStorageSync('uid', res.data.token)
						uni.navigateBack({
							fail() {
								uni.switchTab({
									url: '/pages/index/index'
								})
							}
						})
						
					}
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
