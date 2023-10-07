<template>
	<view class="mask fid-all col_c" v-if='isShow' style="opacity: 0;">
		<view class="auth-box col_c">
			<view class="auth-logo-box row_c">
				<image class="auth-logo" src="/static/images/logo.jpg" mode="aspectFit"></image>
				<view class="auth-name">健康商城</view>
			</view>
			<view class="auth-txt row_c">
				<text>应用需要使用您的头像和昵称</text>
			</view>
			<view class="btns row_a">
				<view class="auth-btn btn row_c" @click="isShow=false" v-if='showCancel'>先看看</view>
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
			if (!uni.getStorageSync('uid')) {
				// uni.hideTabBar();
				this.isShow = true;
				uni.login({
					success(r) {
						// console.log(r)
						this_.code = r.code;
						wx.getUserInfo({
							success(e) {
								// console.log(e)
								this_.getUserInfo({detail:e})
							},fail(err) {
								console.log(err)
							}
						})
					}
				})
			} else {

			}


		},
		methods: {

			//getUserInfo
			getUserInfo(e) {
				let this_ = this;
				if(!this_.$Global.tool.checkClick()){return};
				// console.log(e)
				// console.log(e.detail.encryptedData)
				// console.log(e.detail.iv)
				let data = {
					pid:uni.getStorageSync('pid')||'',
					code: this_.code,
					encryptedData: e.detail.encryptedData,
					iv: e.detail.iv
				}
				// console.log(data)
				// return
				uni.showLoading({
					title:'授权中...'
				})
				this_.base.post('vip/getAppletUser', data, false).then(res => {
					uni.hideLoading()
					this_.isShow = false;
					uni.setStorageSync('shareid', res.data.id)
					uni.setStorageSync('uid', res.data.token)
					this_.$emit('click')
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
		margin-top: 40rpx;
		border-radius: 20rpx;
		background-color: #fff;
		width: 610rpx;
		min-height: 300rpx;
		padding: 50rpx 20rpx 60rpx;
	}

	.auth-logo-box {
		
	}

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
