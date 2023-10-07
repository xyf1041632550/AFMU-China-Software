<template>
	<view class="item-box col ree" v-if='item' @click="onClick"  >
		
		<image :src="imgsss||'/static/images/logo.jpg'" class="item-img " mode="aspectFill" />
		
		<view class="box-bot col_s ree">
			<view class="item-title ellipsis">{{item.title}}</view>
			
			<view class="item-bot row_b" >
				<view class="item-user row_s">
					<image class="user-head" :src="item.aAppUser.photo||'/static/images/my/head.png'" mode="aspectFill"></image>
					<view class="user-name nowarp">{{item.aAppUser.name}}</view>
				</view>
				<view class="item-count row_s" @click.stop="onDz">
					<image src="/static/images/zan-s.png" class="sc-icon" v-if="item.isDz==2"></image>
					<image src="/static/images/zan-n.png" class="sc-icon" v-else></image>
					{{item.dzNumber||'0'}}
				</view>
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
			}

		},
		watch:{
			
		},
		computed:{
			imgsss(){
				if(this.item&&this.item.images){
					return this.item.images.split('|')[0]
				}else{
					return ''
				}
			},
		},
		data() {
			return {
				
			}
		},
		methods: {
			// 点击Cell
			onClick() {
				this.$emit('click')
			},
			
			onDz(){
				this.$emit('ondz')
				
			},

		}
	}
</script>

<style>
	
.item-box {
	width: 340rpx;
	margin-bottom: 22rpx;
}

.item-img{
	width: 340rpx;
	height: 340rpx;
	border-radius: 16rpx 16rpx 0 0rpx;
	background-color: #f8f8f8;
}
.box-bot{
	margin-top: -15rpx;
	width: 340rpx;
	padding: 20rpx 0 16rpx;
	min-height: 100rpx;
	background: #FFFFFF;
	box-shadow: 0rpx 6rpx 12rpx 0rpx rgba(154,239,218,0.3608);
	border-radius: 24rpx 24rpx 24rpx 24rpx;
}
.item-title {
	width: 308rpx;
	font-size: 32rpx;
	
	font-weight: 400;
	color: #3D3D3D;
	line-height: 40rpx;
}

.item-bot {
	margin-top: 16rpx;
	width: 308rpx;
	
}
.user-head{
	background-color: #f8f8f8;
	border: #f1f1f1 1px solid;
	width: 40rpx;
	height: 40rpx;
	border-radius: 50%;
}
.user-name{
	font-size: 24rpx;
	
	font-weight: 400;
	color: #3D3D3D;
	line-height: 34rpx;
	margin-left: 8rpx;
	max-width: 110rpx;
}

.item-count {
	font-size: 20rpx;
	
	font-weight: 400;
	color: #585858;
	line-height: 28rpx;
}
.sc-icon{
	width: 24rpx;
	height: 24rpx;
	margin-right: 4rpx;
}

</style>
