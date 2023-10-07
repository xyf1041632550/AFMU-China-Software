<template>
	
	<view class="item-box row_b"  v-if='item' @click="onClick">
		<view class="item-img-box row_c" >
			<image :src="logo" class="item-img row_c" mode="aspectFill">
		</view>
		<view class="item-right col ree">
			<view class="w100 row_b" style="align-items: flex-start;">
				<view class="item-name ellipsis">{{item.name}}</view>
				<view class="item-price" v-if="payType==3">{{item.lowPrice}}积分</view>
				<view class="item-price" v-else>￥{{item.lowPrice}}</view>
			</view>
			<view class="w100 row_b" style="margin-top: 16rpx;">
				<view class="item-gg nowarp">{{goodsSpecsName}}</view>
				<view class="item-num">x{{item.num||1}}</view>
			</view>
			
			<view class="item-bot row_e" v-if='!isSh'>
				<view class="item-btn row_c">{{item.type==5?'申请售后':'退款'}}</view>
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
			type:{
				type:String,
				default:'nor'
			},
			payType: {
				type: String,
				default: '0'
			},
			payState: {
				type: String,
				default: '0'
			},
			isSh: {
				type: Boolean,
				default: false
			},
			
		},
		watch: {

		},
		computed: {
			logo() {
				if (!this.item || !this.item.image) {
					return ''
				}
				return this.item.image.split('|')[0];
			},goodsSpecsName() {
				
				return (this.item.goodsNum||'1')+(this.item.unit||'件');
			},
		},
		data() {
			return {

			}
		},
		methods: {
			
			// 点击Cell
			onClick() {
				// console.log(this)
				// this.onNav('/pages/shop/item_info/item_info?id='+this.item.goodsId);
				
				this.$emit('click');
			},
			
		}
	}
</script>

<style>
	
	.item-box {
		width: 100%;
		min-height: 106rpx;
		padding: 28rpx 0 10rpx;
		margin-bottom: 14rpx;
		background-color: #fff;
		border-radius: 8rpx;
	}
	.item-img-box{
		width: 180rpx;
		height: 180rpx;
	}
	.item-img {
		width: 170rpx;
		height: 170rpx;
		border-radius: 8rpx 0rpx 0rpx 8rpx;
	}
	
	.item-right {
		padding-left: 16rpx;
		padding-right: 10rpx;
		flex: 1;
		min-height: 180rpx;
	}

	.item-name {
		max-width: 344rpx;
		 max-height: 72rpx;
		font-size: 26rpx;
		
		font-weight: 400;
		color: #3D3D3D;
		line-height: 36rpx;
		 
	}
	.item-price {
	
		font-size: 22rpx;
		
		font-weight: 400;
		color: #3D3D3D;
		line-height: 30rpx;
	}
	.item-gg{
		max-width: 344rpx;
		font-size: 22rpx;
		
		font-weight: 400;
		color: #A2A2A2;
		line-height: 30rpx;
	}
	.item-num{
		font-size: 20rpx;
		
		font-weight: 400;
		color: #666666;
		line-height: 30rpx;
	}

	.item-bot{
		margin-top: 16rpx;
		width: 100%;
	}
	
	
	


	
	.item-yprice{
		margin-top: 10rpx;
		font-size: 24rpx;
		
		font-weight: 400;
		color: #3D3D3D;
		line-height: 34rpx;
	} 
	.item-mj{
			min-width: 80rpx;
			padding: 0 6rpx;
			height: 32rpx;
			background: #FFFFFF;
			border-radius: 4rpx 4rpx 4rpx 4rpx;
			opacity: 1;
			border: 1px solid #EE2D2D;
			font-size: 18rpx;
			
			font-weight: 400;
			color: #EE2D2D;
			line-height: 26rpx;
		}
		.item-zk{
			min-width: 30rpx;
			padding: 0 6rpx;
			height: 32rpx;
			background: #FFFFFF;
			border-radius: 4rpx 4rpx 4rpx 4rpx;
			opacity: 1;
			border: 1px solid #EE2D2D;
			font-size: 18rpx;
			
			font-weight: 400;
			color: #EE2D2D;
			line-height: 26rpx;
		}
		.item-btn{
			margin-top: 14rpx;
			min-width: 74rpx;
			padding: 0 24rpx;
			height: 55rpx;
			background: #FFFFFF;
			border-radius: 27rpx 27rpx 27rpx 27rpx;
			opacity: 1;
			border: 1px solid #D8D8D8;
			font-size: 24rpx;
			
			font-weight: 400;
			color: #D8D8D8;
			line-height: 34rpx;
		}

</style>
