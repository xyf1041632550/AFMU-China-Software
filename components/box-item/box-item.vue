<template>
	<view class="">
		<view class="box row_b" :style="boxStyle" @click="onClick">
			
			<view class="box-left row_s" :style="boxLeftStyle">
				<image class="icon-left" :src="iconLeft" mode="aspectFit" :style="iconLeftStyle" v-if='iconLeft'></image>
				<view class="box-title" :style="titleStyle">{{title}}</view>
			</view>
			
			<view class="box-right row_e" :style="boxRightStyle" @click="onClick">
				<view class="box-text" :class="isTextRight?'row_e':'row_s'" :style="textStyle"  v-if='text'>{{text}}</view>
				<image class="icon-right" :src="iconRight" mode="aspectFit" :style="iconRightStyle" v-if='isShowRight'></image>
			</view>
			
		</view>
		<view class="box-line" :style="boxLineStyle"></view>
	</view>
	<!--头像式-->
	<!-- <view class="box row_b">
	  <view class="box-name">营业执照</view>
	  <image class='head-img' mode="aspectFill" :src='headUrl' ></image>
	</view> -->
	
	<!-- 完全式 -->
	
	
</template>

<script>
	
	export default {
		name: 'boxItem',
		components: {
		},
		props: {
			boxLineStyle: {
				type: String,
				default: ""
			},
			boxStyle: {
				type: String,
				default: ""
			},
			boxLeftStyle: {
				type: String,
				default: ""
			},
			boxRightStyle: {
				type: String,
				default: ""
			},
			
			// 左侧图标
			iconLeft: {
				type: String,
				default: ""
			},
			iconLeftSelect: {
				type: String,
				default: ""
			},
			iconLeftStyle: {
				type: String,
				default: ""
			},
			
			isShowRight:{
				type: Boolean,
				default: true
			},
			// 右侧图标
			iconRight: {
				type: String,
				default: "/static/components/box-item/right.png"
			},
			iconRightSelect: {
				type: String,
				default: ""
			},
			
			iconRightStyle: {
				type: String,
				default: ""
			},
			
			// 标题
			title: String,
			
			titleStyle: {
				type: String,
				default: ""
			},
			
			//内容
			text:{
				type: String,
				default: ""
			},
			
			//内容是否靠右
			isTextRight:{
				type: Boolean,
				default: false
			},
			
			textStyle: {
				type: String,
				default: ""
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
			
		}
	}
</script>

<style>
	.box-line{
		width: 100%;
		background-color: #f5f5f5;
		height: 1px;
		transform: scaleY(.5);
	}
	.box {
		background-color: #fff;
		padding: 0 30rpx;
		height: 80rpx;
		width: 690rpx;
		/* border-bottom: 1px #999 solid; */
	}
	
	.box-left {
	
	}
	
	.icon-left{
		width: 36rpx;
		height: 36rpx;
		margin-right: 28rpx;
	}
	
	.box-title{
		
		font-size: 32rpx;
		line-height: 36rpx;
		color: #333;
	}
	
	.box-right {
		
	}
	
	.box-text{
		font-size: 30rpx;
		color: #666;
		margin: 0 30rpx;
	}
	
	.icon-right{
		width: 40rpx;
		height: 40rpx;
	}
	

</style>
