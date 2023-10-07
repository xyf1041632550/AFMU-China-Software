<template>

	<view class="default-page col_c" :class="abs?'abe-all':''" v-if='show'>
		<image class="default-img" mode="aspectFit" :src="img"></image>
		<view class="default-title row_c" >{{txt}}</view>
		<view class="default-btn row_c" @click="onClick" v-if='btn'>{{btn}}</view>
	</view>

</template>

<script>
	export default {
		props: {
			//show
			show: {
				type: Boolean,
				default: true
			},
			//定位
			abs: {
				type: Boolean,
				default: false
			},

			//跳转
			url: {
				type: String,
				default: ''
			},
			
			showtxt:{
				type: Boolean,
				default: true
			},
			//txt
			txt: {
				type: String,
				default: '还没有内容'
			},
			//btn
			btn:{
				type: String,
				default: ''
			},
			btnSty:{
				type: String,
				default: ''
			},

			//图片
			img: {
				type: String,
				default: '/static/images/no_order.png'
			},


		},
		watch: {

		},
		computed: {

		},
		data() {
			return{}
		},
		methods: {
			// 点击Cell
			onClick() {
				this.$emit('click', this.url);
			},

		}
	}
</script>

<style scoped>
	.default-page {
		width: 100%;
		min-height: 800rpx;
	}

	.default-img {
		width: 100%;
		height: 200rpx;
	}

	.default-title {
		font-size: 28rpx;
		font-family: PlusJakartaSans-Light, PlusJakartaSans;
		font-weight: 300;
		color: #666;
		line-height: 64rpx;
	}
	.default-btn{
		width: 240rpx;
		height: 72rpx;
		background: #E62A1A;
		border-radius: 36rpx;
		
		font-size: 28rpx;
		
		font-weight: 500;
		color: #FFFFFF;
		line-height: 44rpx;
		text-shadow: 0px 2rpx 26rpx rgba(0, 0, 0, 0.11);
	}
</style>
