<template>

	<view class="rule-bg col_e" v-if='showRule' @click.stop='onClose'>
		<view class="rules col yup" @click.stop=''>
			<view class="rule-top ree row_c">
				<view class="rule-title111">{{title||'请选择'}}</view>
				<view class="rule-close row_c abe-t-r" @click.stop='onClose'>取消</view>
			</view>
			<scroll-view scroll-y="true" style="width: 100%;height: 200rpx;">
				<view class="rule-box row_c"  v-for="(item,index1) of list" :key="index1" @click="onChangeNum(index1)">
					<view class="rule-title row_c" >{{item.text}}</view>
				</view>
			</scroll-view>
			<!-- <view class="rule-sure row_c" @click.stop='onSure'>确定</view> -->
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

			

		},
		computed: {
			// itemNew:function(v,o){
			// 	return this.item;
			// }
		},
		data() {
			return {
				index: -1,
			}
		},

		methods: {
			
			/**
			 * onChangeNum
			 */
			onChangeNum(index) {
				this.index = index;
				this.onSure()
			},

			onClose() {
				this.$emit('close', {});
			},

			// 点击Cell
			onSure() {
				// console.log(this)
				let data =this.list[this.index]
				this.$emit('click', data);
			},

		},
		mounted() {
			this.sList=this.list;
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
		padding-bottom: 40rpx;
		/* margin-bottom: 1rpx; */
		border-radius: 20rpx 20rpx 0 0;
		background-color: #fff;
	}

	.rule-top {
		width: 750rpx;
		height: 100rpx;
	}

	.rule-title111 {
		font-size: 32rpx;
		
		font-weight: bold;
		color: #333;
	}

	.rule-close {
		width: 120rpx;
		height: 100rpx;
		font-size: 28rpx;
		
		font-weight: 500;
		color: #999;
	}
	
	.rule-sure{
		margin:30rpx 72rpx 0;
		width: 604rpx;
		height: 78rpx;
		background: #29CFA4;
		border-radius: 40rpx;
		font-size: 30rpx;
		
		font-weight: bold;
		color: #FFFFFF;
	}

	.rule-box {
		width: 670rpx;
		height: 90rpx;
		padding: 0 48rpx;
		background: #FFFFFF;
	}

	.rule-title {
		font-size: 36rpx;
		
		font-weight: 400;
		color: #3D3D3D;
	}
	.rule-title1 {
		font-size: 30rpx;
		
		font-weight: 500;
		color: #999;
	}
	.sel-icon{
		width: 40rpx;
		height: 40rpx;
	}
	.rule-act{
		font-weight: bold;
		color: #333;
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
		-webkit-animation: animations 0.2s ease-out;
		transform: translate(0, 0);
		animation: animations 0.2s ease-out;
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
