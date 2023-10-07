<template>

	<view class="mask fid-all col_e" @click.stop='onBack' @touchmove.stop.prevent=''>
		<view class="ran-boxs col_c fid-b-l yup" @click.stop=''>
			<view class="ran-title row_s ">获取您的头像、昵称</view>
			<view class="ran-txt row_s">获取用户头像、昵称，主要用于向用户提供具有辨识度的用户中心界面</view>
			
			<!-- @click="onSelectImgList" -->
			<!-- #ifdef MP-WEIXIN -->
				<view class="ran-box row_s ree">
					<view class="ran-left row_s">头像</view>
					<image class="ran-head" :src="wxPhoto" mode="aspectFill"></image>
					<image class="ran-right abe-t-r" src="/static/images/right.png" mode=""></image>
					<button class='share-btn' open-type='chooseAvatar' @chooseavatar='bindchooseavatar'></button>
				</view>
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
				<view class="ran-box row_s ree"  @click="onSelectImgList">
					<view class="ran-left row_s">头像</view>
					<image class="ran-head" :src="wxPhoto" mode="aspectFill"></image>
					<image class="ran-right abe-t-r" src="/static/images/right.png" mode=""></image>
				</view>
			<!-- #endif -->
			
			<view class="ran-box row_s">
				<view class="ran-left row_s">昵称</view>
				<input class="ran-name" type="text" v-model="name" placeholder="请输入昵称">
			</view>
			<view class="ran-btn row_c" v-if="name" @click="onclick">保存</view>
			<view class="ran-btn ran-btn-nor row_c" v-else>保存</view>
		</view>
	</view>


</template>

<script>
	const OBSuploadFile = require('@/lib/obs/OBSUploadFile.js');
	export default {
		components: {},
		props: {
			oldname: {
				type: String,
				default: '',
			},
			type: {
				type: String,
				default: 'wxx',
			},
		},
		data() {
			return {

				name: '',
				wxPhoto: '',
			}
		},
		methods: {
			bindchooseavatar(e){
				console.log(e)
				const { avatarUrl } = e.detail
				// this.wxPhoto=avatarUrl
				
				let this_=this;
				this_.select(avatarUrl).then(r=>{
					this_.wxPhoto = r;
				})
				
			},
			onBack() {
				this.$emit('close')
			},
			rand() {
				this.wxPhoto = '';
				this.photoIndex = parseInt(Math.random() * this.list.length)
			},
			onWxBack(e) {
				console.log(e)
				this.upFile(e.detail.avatarUrl).then(r => {
					this.wxPhoto = r
				})

			},
			onclick() {
				let data = {
					name: !this.name ? '微信用户' : this.name,
					photo: this.wxPhoto
				}
				this.$emit('click', data);
			},

			//选择图片
			onSelectImgList() {

				let this_ = this;
				wx.chooseImage({
					count: 1,
					success: function(res) {
						//console.log(res)
						// this_.photo = res.tempFilePaths[0]
						this_.upload(res.tempFilePaths[0]).then(r => {
							this_.wxPhoto = r;
						});
					},
				})
			},

			//小程序华为云上传
			async upObs(path) {
				return await new Promise((resolve, reject) => {
					let fileExtension = path.substring(path.lastIndexOf('.'));
					let fileName = 'back/' + new Date().getTime() + '_' + parseInt(Math.random() * 100 + 100) +
						fileExtension; //指定上传到OBS桶中的对象名
					OBSuploadFile(path, fileName, res => {
						// //console.log(res)
						resolve(res)
					})
				})
			},
			
			async upload(tempFilePath){
				return await new Promise((resolve, reject) => {
					let data={};
					this.base.upload('app/user/uploadPhoto', tempFilePath, data, 'imgFile').then(res=>{
						resolve(res.data)
					})
				})
			},
			
			// 获取上传状态
			async select(e) {
				console.log(e)
				return new Promise((r, j) => {
			
					let data = {
						file:'user',
					};
					this.base.upload('app/user/uploadPhoto', e, data, 'imgFile').then(res=>{
						r(res.data)
					})
					
				})
			},
		},
		created() {
			this.$Global.actions.getUserInfo().then(res => {
				this.wxPhoto = res.photo||'';
				this.name = res.name=='微信用户'?'':res.name;
			});
		}
	}
</script>

<style scoped>
	.mask {
		width: 100%;
		top: 0;
		min-height: 320rpx;
		background-color: rgba(0, 0, 0, .7);
		z-index: 9999;
	}

	.ran-boxs {
		width: 100%;
		background-color: #fff;
		border-radius: 20rpx 20rpx 0 0;
		padding: 20rpx 0;
	}



	.ran-title {
		width: 670rpx;
		margin: 0 40rpx;
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
		line-height: 60rpx;
	}

	.ran-txt {
		width: 670rpx;
		margin: 0 40rpx;
		font-size: 24rpx;
		color: #999;
		padding-bottom: 18rpx;
		border-bottom: #e8e8e8 1px solid;
	}

	.ran-box {
		width: 670rpx;
		margin: 0 40rpx;
		height: 100rpx;
		border-bottom: #e8e8e8 1px solid;
	}

	.ran-left {
		font-size: 30rpx;
		font-weight: bold;
		color: #333;
		width: 120rpx;
	}

	.ran-head {
		width: 70rpx;
		height: 70rpx;
		background-color: #f1f1f1;
		border-radius: 12rpx;

	}

	.ran-right {
		width: 10rpx;
		height: 20rpx;
		top: 40rpx;
	}


	.ran-name {
		width: 400rpx;
		height: 70rpx;
		font-size: 30rpx;
		color: #333;
	}

	.ran-btn {
		margin-top: 40rpx;
		width: 200rpx;
		height: 70rpx;
		border-radius: 12rpx;
		font-size: 30rpx;
		color: #fff;
		background-color: #07c160;
	}

	.ran-btn-nor {
		background-color: #f1f1f1;
		color: #999;
	}

	.share-btn{
		width: 100%;
		height: 100%;
		position: absolute;
		opacity: 0.01;
	}

</style>
