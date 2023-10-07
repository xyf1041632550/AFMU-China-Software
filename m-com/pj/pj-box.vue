<template>
	<view class="pj-box col">
		<view class="pj-head1 row_s">
			<image class="pj-head" :src="item.userLogo||item.user.avatar||'/static/images/my/head.png'" mode="aspectFill"></image>
			<view class="pj-right col_e">
				<view class="pj-r-t row_s">
					<view class="pj-name nowarp">{{item.userName||item.user.nickName}}</view>
					<view class="pj-time">{{item.createDate}}</view>
				</view>
				<view class="pj-xxs row_s">
					<image :src='item.star>=v?"/static/images/index/xx-s.png":"/static/images/index/xx-n.png"'
						v-if="item.star>=v" class='xx-img' v-for="(v,index) of '12345'" :key='index'></image>
				</view>
			</view>
		</view>
		<view class="pj-txt row_s"><text>{{item.content||'默认好评'}}</text></view>
		<view class="pic-list row_s">
			<view class="pic-box col_c ree" v-for="(v,i) of imgList" :key='i'>
				<image class="pic-img" :src="v" mode="aspectFill" @click="onPreviewImage(v)"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			//数组
			item: {
				type: Object,
				default: null
			},


		},
		watch: {

		},
		computed: {
			imgList(){
				if(this.item&&this.item.images){
					console.log(this.item.images.split('|'))
					return this.item.images.split('|')
				}else{
					return []
				}
			}
		},
		data() {
			return {
				pjTxtList:['差','差', '一般', '好', '很好', '非常好', '非常非常好'],
			}
		},
		methods: {
			// 点击Cell
			onClick() {
				// console.log(this)
				this.$emit('click');
			},
			onPreviewImage(e) {
				uni.previewImage({
					current: e,
					urls: imgList
				})
			},
		}
	}
</script>

<style>
	.pj-box {
		width: 702rpx;
		min-height: 160rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		padding-bottom: 24rpx;
	}

	.pj-head1 {
		width: 716rpx;
		padding-left: 10rpx;
		height: 106rpx;
	}

	.pj-head {
		width: 72rpx;
		height: 72rpx;
		background: rgba(255, 190, 190, 0.39);
		border-radius: 50%;
	}

	.pj-right {
		padding-left: 22rpx;
		width: 600rpx;
		height: 72rpx;
	}

	.pj-r-t {
		width: 100%;
		margin-bottom: 6rpx;
	}

	.pj-name {
		max-width: 330rpx;
		font-size: 24rpx;
		
		font-weight: 400;
		color: #3D3D3D;
		line-height: 34rpx;
	}

	.pj-time {
		font-size: 22rpx;
		
		font-weight: 400;
		color: #666666;
		line-height: 30rpx;
		margin-left: 30rpx;
	}

	.pj-xxs {
		width: 100%;
	}

	.xx-img {
		width: 26rpx;
		height: 26rpx;
		margin-right: 2rpx;
	}

	.pj-txt {
		margin-left: 104rpx;
		width: 575rpx;
		font-size: 28rpx;
		
		font-weight: 400;
		color: #3D3D3D;
		line-height: 40rpx;
	}

	.pic-list {
		margin-left: 104rpx;
		width: 580rpx;
		flex-wrap: wrap;
	}

	.pic-box {
		width: 170rpx;
		height: 170rpx;
		border-radius: 8rpx 8rpx 8rpx 8rpx;
		margin: 0 10rpx 10rpx 0;
	}

	.pic-img {
		width: 170rpx;
		height: 170rpx;
		background: rgba(1, 1, 1, 0.39);
		border-radius: 12rpx;
	}
</style>
