<template>
	<view class="item-box col ree" v-if='item' @click="onClick"  >
		
		<image :src="item.logo||'/static/images/logo.jpg'" class="item-img " mode="aspectFill" />
		
		<view class="item-title ellipsis">{{item.name}}</view>
		
		
		<view class="item-bot row_b" >
			<view class="item-price">
				<text style="font-size: 24rpx;">￥</text>
				{{item.salePrice||'0.00'}}
				<text class="qi">起</text>
			</view>
			<view class="item-count">已售{{item.saleCount||'0'}}</view>
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
			
		},
		data() {
			return {
				
			}
		},
		methods: {
			// 点击Cell
			onClick() {
				let url='/pages/index/item_info/item_info?id='+this.item.id;
				this.$Global.tool.routerTo(url);
			},

		}
	}
</script>

<style>
	
.item-box {
	width: 702rpx;
	border-radius: 24rpx 24rpx 16rpx 16rpx;
	min-height: 320rpx;
	background: #FFFFFF;
	box-shadow: 0rpx 8rpx 20rpx 0rpx rgba(189,250,235,0.47);
	padding-bottom: 16rpx;
	margin-top: 22rpx;
}

.item-img{
	width: 702rpx;
	height: 370rpx;
	border-radius: 24rpx 24rpx 24rpx 24rpx;
}
.item-title {
	width: 662rpx;
	margin: 12rpx auto 8rpx;
	font-size: 28rpx;
	
	font-weight: 400;
	color: #333333;
	line-height: 40rpx;
}

.item-bot {
	width: 662rpx;
	margin: 0 auto 0;
}

.item-price {
  width: max-content;
	font-size: 32rpx;
	
	font-weight: 400;
	color: #FF0000;
}
.qi{
	color: #666;
	margin-left: 10rpx;
	font-size: 24rpx;
}
.item-count {
	font-size: 20rpx;
	
	font-weight: 400;
	color: #666666;
	line-height: 28rpx;
}

</style>
