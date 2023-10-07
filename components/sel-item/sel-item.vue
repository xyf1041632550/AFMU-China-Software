<template>
	<view class="box row_b" :style="boxStyle" v-if='isRight' @click="onClick">
		<view class="box-title" :style="titleStyle">{{title}}</view>
		<view class="box-left1" :style="boxLeftStyle">
			<i class="iconfont" :style="{'color':iconColor,'font-size':iconSize}" v-if='isSelect'>&#xe603;</i>
			<!-- <i class="iconfont" :style="{color:iconColor}" v-else>&#xe63e;</i> -->
		</view>
	</view>
	<view class="box row_s" :style="boxStyle" v-else @click="onClick">
		<view class="box-left" :style="boxLeftStyle">
			<i class="iconfont" :style="{color:iconColor,'font-size':iconSize}" v-if='isSelect'>&#xe61b;</i>
			<i class="iconfont" :style="{color:iconColor,'font-size':iconSize}" v-else>&#xe63e;</i>
		</view>
		<view class="box-title" :style="titleStyle">{{title}}</view>
	</view>
</template>

<script>
	
	export default {
		name: 'selItem',
		components: {
		},
		props: {
			boxStyle: {
				type: String,
				default: ''
			},
			
			iconColor: {
				type: String,
				default: '#999'
			},
			iconSize: {
				type: String,
				default: '32rpx'
			},
			
			boxLeftStyle: {
				type: String,
				default: ''
			},
			
			// 标题
			title: String,
			titleStyle:{
				type: String,
				default: ''
			},
			
			//内容是否靠右
			isRight:{
				type: Boolean,
				default: false
			},
			
			//选中状态
			isSelect:{
				type: Boolean,
				default: false
			}
			
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
	@font-face {
	  font-family: 'iconfont';  /* project id 1845613 */
	  src: url('//at.alicdn.com/t/font_1845613_xi0zgwpj34.eot');
	  src: url('//at.alicdn.com/t/font_1845613_xi0zgwpj34.eot?#iefix') format('embedded-opentype'),
	  url('//at.alicdn.com/t/font_1845613_xi0zgwpj34.woff2') format('woff2'),
	  url('//at.alicdn.com/t/font_1845613_xi0zgwpj34.woff') format('woff'),
	  url('//at.alicdn.com/t/font_1845613_xi0zgwpj34.ttf') format('truetype'),
	  url('//at.alicdn.com/t/font_1845613_xi0zgwpj34.svg#iconfont') format('svg');
	}
	.iconfont {
	  font-family:"iconfont" !important;
	  font-size:16px;
	  font-style:normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	
	
	.box {
		background-color: #fff;
		padding: 0 30rpx;
		height: 80rpx;
		width: 690rpx;
		border-bottom: 1px #999 solid;
	}
	
	.box-left {
		margin-right: 30rpx;
	}
	
	.icon-left{
		width: 36rpx;
		height: 36rpx;
		margin-right: 28rpx;
	}
	
	.box-title{
		
		font-size: 30rpx;
		line-height: 36rpx;
		color: #333;
	}
	
	
	

</style>
