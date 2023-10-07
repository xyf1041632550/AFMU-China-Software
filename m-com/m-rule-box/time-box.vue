<template>

	<view class="rule-bg col" v-if='showRule' @click.stop='onClose'>
		<view class="rule col a1" @click.stop=''>
			<view class="rules col a1" @click.stop=''>
				<view class="rule-top ree row_b">
					<view class="rule-close row_s" @click.stop='onClose'>取消</view>
					<view class="rule-title">{{title||'请选择'}}</view>
					<view class="rule-sure row_s" @click.stop='onSure'>确定</view>
				</view>
				<view class="rule-box row_c" v-for="(item,index1) of list" :key="index1" @click="onChangeNum(index1)">
					<view class="rule-title1">{{item.title}}</view>
				</view>
			</view>
		</view>
	</view>


</template>

<script>
	export default {
		name: 'ruleBox',
		components: {},
		props: {
			title:{
				type: String,
				default: '请选择'
			},

			//数组
			list: {
				type: Array,
				default: null
			},

			//showRule
			showRule: {
				type: Boolean,
				default: false,
			},

		},
		watch: {

			// showRule:function(){
			// 	this.startItem();
			// },

		},
		computed: {
			// itemNew:function(v,o){
			// 	return this.item;
			// }
		},
		data() {
			return {
				index: -1
			}
		},

		methods: {

			/**
			 * onChangeNum
			 */
			onChangeNum(index) {
				this.index = index;
			},

			onClose() {
				this.$emit('close', {});
			},

			// 点击Cell
			onSure() {
				// console.log(this)
				let data = {
					index: this.index
				}
				this.$emit('click', data);
			},

		}
	}
</script>

<style>
	.rule-bg {
		width: 100%;
		position: fixed;
		top: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .75);
		z-index: 111;

	}

	.rule {
		width: 100%;
		min-height: 368rpx;
		position: fixed;
		bottom: 0;
		top: 0;
		z-index: 999;
		overflow-y: scroll;
		justify-content: flex-end;
	}

	.rules {
		position: relative;
		width: 100%;
		padding-bottom: 180rpx;
		/* margin-bottom: 1rpx; */
		border-radius: 20rpx 20rpx 0 0;
		background-color: #fff;
	}

	.rule-top {
		width: 750rpx;
		height: 100rpx;
	}

	.rule-title {
		font-size: 32rpx;
		
		font-weight: 500;
		color: #000000;
	}

	.rule-close {
		width: 120rpx;
		height: 100rpx;
		font-size: 32rpx;
		
		font-weight: 500;
		color: #4D4D4D;
	}
	
	.rule-sure{
		width: 120rpx;
		height: 100rpx;
		font-size: 32rpx;
		
		font-weight: 500;
		color: #18BB8B;
	}

	.rule-box {
		border-top: #f5f5f5 1rpx solid;
		width: 750rpx;
		height: 80rpx;
		background: #FFFFFF;
	}

	.rule-title {
		margin-left: 30rpx;
		font-size: 32rpx;
		
		font-weight: bold;
		color: #1A1A1A;
	}
	.rule-title1 {
		margin-left: 30rpx;
		font-size: 30rpx;
		
		font-weight: 500;
		color: #1A1A1A;
	}

	.sel-icon {
		width: 34rpx;
		height: 34rpx;
		margin-right: 30rpx;
	}



	.rule-btns {
		position: fixed;
		width: 100%;
		background-color: #fff;
		height: 80rpx;
		bottom: 40rpx;
	}

	.rule-btn {
		width: 640rpx;
		height: 80rpx;
		background: #18bbbb;
		border-radius: 40rpx;
		
		font-size: 30rpx;
		font-weight: normal;
		font-stretch: normal;
		line-height: 42rpx;
		letter-spacing: 0rpx;
		color: #ffffff;
	}


	.a1 {
		-webkit-transform: translate(0, 0);
		-webkit-animation: animations 0.5s ease-out;
		transform: translate(0, 0);
		animation: animations 0.5s ease-out;
	}

	@-webkit-keyframes animations {
		0% {
			-webkit-transform: translate(0, 100%);
			opacity: .5;
		}

		100% {
			-webkit-transform: translate(0, 0);
			opacity: 1;
		}
	}

	@keyframes animations {
		0% {
			-webkit-transform: translate(0, 100%);
			opacity: 0.5;
		}

		100% {
			-webkit-transform: translate(0, 0);
			opacity: 1;
		}
	}
</style>
