<template>
	<view class="item-box row_e ree" v-if='item' @click="onClick">
		<image :src="item.logo||'/static/images/logo.png'" class="item-img abe-t-l" mode="aspectFill"></image>
		<view class="item-right col_b">
			<text class="item-title ellipsis">{{item.name}}</text>
			
			<view class="item-bot row_b" >
				<view class="item-price">
					<text style="font-size: 24rpx;">￥</text>
					{{item.salePrice||'0.00'}}
					<text class="qi">起</text>
				</view>
				<view class="item-count">已售{{item.saleCount||'0'}}</view>
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
			
		},
		data() {
			return {
				
			}
		},
		methods: {
			// 点击Cell
			onClick() {
				let url='/pages/index/item_info/item_info?type=select&id='+this.item.id;
				this.$Global.tool.routerTo(url);
			},

		}
	}
</script>

<style>
	
.item-box {
	width: 650rpx;
	height: 210rpx;
	margin-bottom: 22rpx;
}

.item-img{
	width: 220rpx;
	height: 180rpx;
	border-radius: 12rpx 40rpx 40rpx 12rpx;
	top: 15rpx;
	background-color: #fff;
}
.item-right{
	padding: 30rpx 20rpx 26rpx 94rpx;
	width: 392rpx;
	height: 154rpx;
	background: #FFFFFF;
	border-radius: 24rpx 24rpx 24rpx 24rpx;
}
.item-title {
	width: 100%;
	font-size: 30rpx;
	
	font-weight: 400;
	color: #333333;
	line-height: 42rpx;
}

.item-bot {
	width: 100%;
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
