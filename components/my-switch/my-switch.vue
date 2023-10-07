<template>
	<view class="swicth-lists row_s" :class="isScroll?'switch-scroll':'switch'">
		<view :class="isScroll?'switch-list-scroll '+flexType:'switch '+flexType"  :style="listStyle">
			
			<view class="switch-box col_c" :style="boxStyle" v-for='(v,i) of list' :key='i' @click="onClick(i)">
				<view class="box-top row_c">
					<image class="box-icon" :src="v.iconUrl" mode="aspectFit" :style="iconStyle" v-if='showIcon&&switchIndex==i'></image>
					<image class="box-icon" :src="v.iconSelectUrl" mode="aspectFit" :style="iconStyle" v-if='showIcon&&switchIndex!=i'></image>
					<view class="box-title" :style="switchIndex==i?titleStyle+titleAct:titleStyle+titleNor" >{{v.title}}</view>
				</view>
				<view class="box-line" :style="lineAct" v-if='lineAct&&switchIndex==i'></view>
				<view class="box-line" :style="lineNor" v-if='lineNor&&switchIndex!=i'></view>
			</view>
		</view>
	</view>
	
</template>

<script>
	
	export default {
		name: 'mySwitch',
		components: {
		},
		props: {
			listStyle: {
				type: String,
				default: ""
			},
			flexType: {
				type: String,
				default: "row_a"
			},
			boxStyle: {
				type: String,
				default: ""
			},
			iconStyle: {
				type: String,
				default: ""
			},
			titleStyle: {
				type: String,
				default: ""
			},
			titleAct: {
				type: String,
				default: ""
			},
			titleNor: {
				type: String,
				default: ""
			},
			lineAct: {
				type: String,
				default: ""
			},
			lineNor: {
				type: String,
				default: ""
			},
			isScroll:{
				type: Boolean,
				default: false
			},
			// 左侧图标
			showIcon: {
				type: Boolean,
				default: false
			},
			switchIndex:{
				type:Number,
				default:0
			},
			list: {
				type: Array,
				default: []
			},
			
			
		},
		data() {
			return {
				
			}
		},
		methods: {
			// 点击Cell
			onClick(i) {
				this.$emit('click',{index:i});
			},
			
		}
	}
</script>

<style>
	.swicth-lists{
		background-color: #fff;
	}
	.switch-scroll{
		width: 100%;
		overflow-x: scroll;
	}
	.switch{
	width: 100%;
	}
	
	.switch{
	width: 100%;
	height: 88rpx;
	}
	.switch-list-scroll{
		width: max-content;
		height: 88rpx;
	}

	
	.switch-box {
		width: max-content;
		padding: 0 10rpx;
		margin: 0 auto;
		height: 100%;
	}
	
	.box-top {
	 min-width: 100%;
	 height: 94%;
	}
	
	.box-icon{
		width: 60rpx;
		height: 60rpx;
		margin-right: 20rpx;
	}
	
	.box-title{
		
			font-size: 32rpx;
			font-weight: normal;
			font-stretch: normal;
			line-height: 40rpx;
			letter-spacing: 0rpx;
			
	}
	.box-title-nor{
		color: #333;
	}
	.box-title-act{
		color: #4c8ef8;
	}
	
	.box-line{
		width: 100%;
		height: 1px;
		color: #4c8ef8;
	}
	


</style>
