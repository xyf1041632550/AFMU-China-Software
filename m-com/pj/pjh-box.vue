<template>
	<view class="pj-box row_b">
		<view class="pj-left col">
			<view class="pj-head1 row_s">
				<image class="pj-head" :src="item.userLogo||item.user.avatar||'/static/images/my/head.png'" mode="aspectFill"></image>
				<view class="pj-right col">
					<view class="pj-r-t row_s">
						<view class="pj-name nowarp">{{item.userName||item.user.nickName}}</view>
						<!-- <view class="pj-time">{{item.commentTime}}</view> -->
					</view>
					<view class="pj-xxs row_s">
						<image :src='item.star>=v?"/static/images/index/xx-s.png":"/static/images/index/xx-n.png"'
							v-if="item.star>=v" class='xx-img' v-for="(v,index) of '12345'" :key='index'></image>
					</view>
				</view>
			</view>
			<view class="pj-txt row_s"><text>{{item.content||'默认好评'}}</text></view>
		</view>
		
		
		<image class="pic-img" :src="imgsss" v-if="imgsss" mode="aspectFill" @click="onPreviewImage(imgsss)"></image>
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
			imgsss(){
				if(this.item&&this.item.images){
					return this.item.images.split('|')[0]
				}else{
					return ''
				}
			},
			imgList(){
				if(this.item&&this.item.images){
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
					urls: [e]
				})
			},
		}
	}
</script>

<style>
	.pj-box {
		padding: 0 16rpx;
		min-height: 200rpx;
		background: rgba(228,228,228,0.149);
		border-radius: 12rpx 12rpx 12rpx 12rpx;
		margin-right: 20rpx;
	}
	.pj-left{
		width: 408rpx;
	}
	.pj-head1 {
		width: 100%;
		height: 108rpx;
	}

	.pj-head {
		width: 72rpx;
		height: 72rpx;
		background: rgba(255, 190, 190, 0.39);
		border-radius: 50%;
	}

	.pj-right {
		padding-left: 16rpx;
		width: 310rpx;
	}

	.pj-r-t {
		width: 100%;
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
		margin-top: 8rpx;
		width: 100%;
		font-size: 28rpx;
		
		font-weight: 400;
		color: #3D3D3D;
		line-height: 40rpx;
	}

	

	.pic-img {
		width: 160rpx;
		height: 160rpx;
		border-radius: 8rpx 8rpx 8rpx 8rpx;
		background: rgba(1, 1, 1, 0.39);
	}
</style>
