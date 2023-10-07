<template>
	<view class="item-box row_e ree" v-if='item' @click="onClick">
		<image :src="item.logo||'/static/images/logo.png'" class="item-img abe-t-l" mode="aspectFill"></image>
		<view class="item-right col_b">
			<text class="item-title ellipsis">{{item.name}}</text>
			
			<view class="w100 rulename col">
				<view class="">{{item.rulename}}</view>
				<!-- <view class="">天数：两天1晚</view> -->
			</view>
			<view class="item-bot row_b" >
				<view class="item-price">
					<text style="font-size: 24rpx;">￥</text>
					{{item.salePrice||'0.00'}}
				</view>
				<view class="item-count">x{{item.num||'1'}}</view>
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
				let url='/pages/index/item_info/item_info?id='+this.item.id;
				this.$Global.tool.routerTo(url);
			},

		}
	}
</script>

<style>
	
.item-box {
	width: 702rpx;
	height: 210rpx;
	margin:0 auto 22rpx;
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
	width: 436rpx;
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
.rulename{
	font-size: 24rpx;
	
	font-weight: 400;
	color: #666666;
	line-height: 34rpx;
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

.item-count {
	font-size: 20rpx;
	
	font-weight: 400;
	color: #666666;
	line-height: 28rpx;
}

</style>
