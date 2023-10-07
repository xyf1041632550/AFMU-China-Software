<template>

	<view class="rule-bg col" v-if='item&&showRule' @click.stop='onClose'>
		<view class="rule col yup">
			<view class="rules col" @click.stop=''>
				<!-- <image class="rule-cancal" src="/static/newimgs/close.png" @click.stop='onClose'></image> -->
				<view class="rule-item-box row_s">
					<image class="rule-item-img row_c" :src="item.logo" mode="aspectFit"></image>
					<view class="rule-item-right col_b">
						<view class="item-name">{{item.name}}</view>
						<view class="rule-item-top row_s">
							<view class="rule-item-price"><text style="font-size: 20rpx;">￥</text>{{salePrice}}</view>
							<!-- <view class="rule-item-price1">￥{{price}}</view> -->
						</view>
						<view class="row_b" style="width: 100%;">
							<view class="rule-item-sel col" v-if='item.isSpec==1'>已选择:{{item.goodsSpecs[ruleIndex].name}}
							</view>
							<view class="rule-item-kc col">库存:{{remainStockKeeping}}</view>
						</view>
					</view>
				</view>

				<view class="rule-boxs row_s">
					<view :class="index==ruleIndex?'rule-box1 row_c':'rule-box row_c'"
						v-for='(v,index) of item.goodsSpecs' :key='index' @click.stop='onSelect(index)'>
						{{v.name}}
					</view>
				</view>

				<view class="rule-nums row_b">
					<view class="nums-title row_c">选择数量</view>
					<view class="nums-boxs row_c">
						<view class="nums-img row_c" @click='onDel'>
							<image class="nums-img-img" src="/static/images/shop/del.png" mode='aspectFit'>
						</view>
						<input type="number" v-model="num" class="nums-box ipt row_c" disabled="true" @focusout="onChangeNum">
						<view class="nums-img1 row_c" @click='onAdd'>
							<image class="nums-img-img" src="/static/images/shop/add.png" mode='aspectFit'>
						</view>
					</view>
				</view>

			</view>
			<view class="rule-btns row_c">
				<view class="rule-btn row_c" style="background-color: #aaa;color: #fff;" @click.stop=""
					v-if='remainStockKeeping==0'>已售罄</view>
				<view class="rule-btn row_c" style="background-color: #FB7E20;color: #fff;" v-else
					@click.stop="onSure('now')">确定</view>

				<!-- <view class="rule-btn1 row_c" @click.stop="onSure('car')" v-else>加入购物车</view>
				<view class="rule-btn2 row_c" @click.stop="onSure('now')" v-if='remainStockKeeping!=0'>立即购买</view> -->
			</view>
		</view>
	</view>


</template>

<script>
	export default {
		name: 'ruleBox',
		components: {},
		props: {


			//数组
			item: {
				type: Object,
				default: null
			},

			//showRule
			showRule: {
				type: Boolean,
				default: false,
			},


		},
		watch: {
			// item:function(v,o){
			// 	console.log(o)
			// 	console.log(v)

			// },
			showRule: function() {
				this.num=1;
				this.startItem();
			},
		},
		computed: {
			// itemNew:function(v,o){
			// 	return this.item;
			// }
		},
		data() {
			return {
				ruleId: '', //规格id
				goodsSpecsId: '', //规格
				salePrice: '', //现价
				price: '', //原价
				remainStockKeeping: 0, //库存
				num: 1, //数量
				rulename: '',
				ruleIndex: 0,
			}
		},

		methods: {

			/**
			 * onChangeNum
			 */
			onChangeNum() {
				if (!this.num) {
					this.num = 1;
				}
			},

			onClose() {
				this.$emit('close', {});
			},

			// 点击Cell
			onSure(type) {
				// console.log(this)
				let data = {
					id: this.item.id,
					goodsSpecs: this.item.isSpec==1?this.item.goodsSpecs[this.ruleIndex].id:'',
					goodsSpecsName:this.item.isSpec==1?this.item.goodsSpecs[this.ruleIndex].name:'',
					num: this.num,
					salePrice: this.salePrice, //现价
					remainStockKeeping: this.remainStockKeeping, //库存
					isDistribution:this.item.isDistribution
				}
				this.$emit('click', data);
			},

			//
			startItem() {
				if (this.item.isSpec == 0) {
					this.salePrice = this.item.salePrice; //现价
					this.price = this.item.price; //原价
					this.remainStockKeeping = this.item.stock; //库存
					return
				} else {
					this.onSelect(0)
				}
			},

			/**
			 * onSelect选择规格
			 */
			onSelect(i) {
				// console.log(n,i)
				this.ruleIndex = i;
				this.remainStockKeeping = this.item.goodsSpecs[i].stock;
				this.salePrice = this.item.goodsSpecs[i].salePrice; //现价
			},


			/**
			 * 增加数量
			 */
			onAdd() {
				//todo remainStockKeeping判断库存值
				// console.log(this.num)
				if (this.num < this.remainStockKeeping) {
					this.num += 1;
				}
			},

			/**
			 * 减少数量
			 */
			onDel() {
				// console.log(this.num)
				if (this.num > 1) {
					this.num -= 1;
				}
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
		border-radius: 30rpx 30rpx 0 0;
		background-color: #fff;
	}

	.rule-cancal {
		position: absolute;
		width: 34rpx;
		height: 34rpx;
		right: 20rpx;
		top: 20rpx;
		padding: 2rpx;
	}

	.rule-item-box {
		padding: 40rpx 30rpx 0;
		width: 750rpx;
		min-height: 170rpx;
		margin-bottom: 30rpx;
	}

	.rule-item-img {
		width: 180rpx;
		height: 180rpx;
		background-color: #f7f7f7;
		border-radius: 16rpx;
	}

	.rule-item-right {
		margin-left: 24rpx;
		width: 500rpx;
		height: 180rpx;
	}
	
	.rule-item-top {
		width: 100%;
		/* margin-top: 20rpx; */
	}
	.item-name{
		width: 100%;
		font-size: 30rpx;
		
		font-weight: normal;
		color: #333333;
		line-height: 38rpx;
	}
	.rule-item-price {
		width: 100%;
		font-size: 32rpx;
		
		font-weight: normal;
		color: #F91616;
	}

	.rule-item-price1 {
		margin-left: 26rpx;
		
		font-size: 26rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: #666666;
		text-decoration: line-through;
	}

	.rule-item-kc {
		font-size: 28rpx;
		
		font-weight: 500;
		color: #999999;
	}

	.rule-item-sel {
		font-size: 28rpx;
		
		font-weight: 500;
		color: #333;
		line-height: 36rpx;
	}

	.rule-item-title {
		
		font-size: 30rpx;
		
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		line-height: 36rpx;
		width: 100%;
		padding-left: 30rpx;
	}

	.rule-title {
		margin-top: 36rpx;
		margin-bottom: 10rpx;

		font-size: 26rpx;
		
		font-weight: bold;
		color: #3d3d3d;
		line-height: 36rpx;
		padding-left: 50rpx;
	}

	.rule-boxs {
		margin: 0 30rpx;
		padding: 0rpx 0 20rpx;
		flex-wrap: wrap;
		width: 690rpx;
		border-bottom: 1rpx #EEEEEE solid;
	}

	.rule-box1 {
		min-width: 70rpx;
		padding: 0 18rpx;
		height: 58rpx;
		background: #fff;
		border: 1px solid #FB7E20;
		border-radius: 10rpx;
		margin: 10rpx 15rpx;

		font-size: 28rpx;
		
		font-weight: normal;
		color: #FB7E20;
	}

	.rule-box {
		min-width: 70rpx;
		padding: 0 18rpx;
		height: 58rpx;
		background: #F6F6F6;
		border: 1px solid #F6F6F6;
		border-radius: 10rpx;
		margin: 10rpx 15rpx;

		font-size: 28rpx;
		
		font-weight: normal;
		color: #3d3d3d;
	}

	.rule-nums {
		min-height: 110rpx;
		width: 690rpx;
		margin: 0rpx 30rpx;
		border-bottom: #EEEEEE 1rpx solid;
	}

	.nums-title {

		font-size: 30rpx;
		
		font-weight: normal;
		color: #3d3d3d;
		line-height: 36rpx;
		margin-left: 10rpx;
	}

	.nums-boxs {
		min-width: 180rpx;
		height: 56rpx;

		border-radius: 5rpx;
	}

	.nums-img {
		width: 56rpx;
		height: 56rpx;
		/* background-color: #f7f7f7;
		border-radius: 6rpx 0 0 6rpx; */
		font-size: 40rpx;
		line-height: 56rpx;
	}

	.nums-img1 {
		width: 56rpx;
		height: 56rpx;
		/* background-color: #f7f7f7;
		border-radius:0 6rpx  6rpx 0; */
		font-size: 40rpx;
		line-height: 56rpx;
	}

	.nums-img-img {
		width: 44rpx;
		height: 44rpx;
	}

	.nums-box {
		width: 70rpx;
		height: 56rpx;
		padding: 0;
		margin: 0;
		background-color: #fefefe;
		margin: 0 2rpx;
		/* margin: 0 .1rpx; */
		font-size: 30rpx;
		
		font-weight: 500;
		color: #333;
		text-align: center;
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
		background: rgba(24, 164, 251, 1);
		border-radius: 40rpx;
		
		font-size: 30rpx;
		font-weight: normal;
		font-stretch: normal;
		line-height: 42rpx;
		letter-spacing: 0rpx;
		color: #ffffff;
	}

	.rule-btn1 {
		width: 336rpx;
		height: 80rpx;
		background: #E93E3E;
		border-radius: 40rpx 0px 0px 40rpx;

		font-size: 28rpx;
		
		font-weight: 500;
		color: #FEFDFD;
		line-height: 36rpx;
	}

	.rule-btn2 {
		width: 336rpx;
		height: 80rpx;
		background: #E62A1A;
		border-radius: 0px 40rpx 40rpx 0px;

		font-size: 28rpx;
		
		font-weight: 500;
		color: #FEFDFD;
		line-height: 36rpx;
	}

	
</style>
