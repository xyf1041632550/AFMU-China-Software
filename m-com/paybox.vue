<template>

	<view class="mask fid-all col_e" @click.stop='onBack' @touchmove.stop.prevent=''>
		<view class="ran-boxs col_c fid-b-l yup" @click.stop=''>
			<view class="ran-title row_c ">选择支付方式</view>
			<view class="ran-colse abe-t-r" @click.stop='onBack'>取消</view>
			<view class="ran-price " v-if="type=='jf'">
				<text>{{price}}积分</text>
			</view>
			<view class="ran-price " v-else>
				<text style="font-size: 22rpx;">￥</text>
				<text>{{price}}</text>
			</view>
			<view class="ran-list col">
				<view class="box row_b"  v-if="type=='all'||type=='jf'">
					<view class="box-left row_s">
						<image class="box-icon" src="/static/images/index/jf.png" mode="aspectFit"></image>
						<text>积分支付</text>
						<view class="box-jf col">
							<view class="">可用{{jf}}积分</view>
							<!-- <view class="" v-if="sy>0">剩余{{sy}}微信支付</view> -->
						</view>
					</view>
					<image class="sel-icon" v-if="type=='all'"
						:src="isJf?'/static/images/shop/sel-s.png':'/static/images/shop/sel-n.png'"
						mode="aspectFit" @click="changeJf"></image>
				</view>
				<view class="box row_b"  v-if="type=='all'||type=='ye'">
					<view class="box-left row_s">
						<image class="box-icon" src="/static/images/index/ye.png" mode="aspectFit"></image>
						<text>余额支付</text>
						<view class="box-jf col">
							<view class="">余额剩余￥{{ye}}</view>
						</view>
					</view>
					<image class="sel-icon"
						:src="isYe?'/static/images/shop/sel-s.png':'/static/images/shop/sel-n.png'"
						mode="aspectFit" @click="changeYe"></image>
				</view>
				<view class="w100 col" v-if="showPay">
					<view class="box row_b" v-if="type=='all'||type=='price'">
						<view class="box-left row_s">
							<image class="box-icon" src="/static/images/index/wx.png" mode="aspectFit"></image>
							<text>微信支付</text>
						</view>
						<image class="sel-icon"
							:src="payIndex==1?'/static/images/shop/sel-s.png':'/static/images/shop/sel-n.png'"
							mode="aspectFit" @click="changePay(1)"></image>
					</view>
					<view class="box row_b" v-if="type=='all'||type=='price'">
						<view class="box-left row_s">
							<image class="box-icon" src="/static/images/index/zfb.png" mode="aspectFit"></image>
							<text>支付宝支付</text>
						</view>
						<image class="sel-icon"
							:src="payIndex==2?'/static/images/shop/sel-s.png':'/static/images/shop/sel-n.png'"
							mode="aspectFit" @click="changePay(2)"></image>
					</view>
				</view>
				
			</view>

			<view class="ran-btn ran-btn-nor row_c" @click="onclick">支付</view>
		</view>
	</view>


</template>

<script>
	export default {
		components: {},
		props: {
			price: {
				type: [String,Number],
				default: '0.00',
			},
			type:{
				type: String,
				default: 'all',
			}
		},
		data() {
			return {
				showPay:true,
				isYe:false,
				isJf:false,
				payIndex:1,
				selIndex: 1,
				jf: 0,
				ye:'0.00',
			}
		},
		computed:{
			sy(){
				if(this.jf<=0){
					return this.price;
				}else{
					let val=parseFloat(this.price)-this.jf;
					return val>0?val:0;
				}
			}
		},
		methods: {
			onBack() {
				this.$emit('close')
			},
			changePay(index){
				this.payIndex=index;
				this.changeJFYE()
			},
			
			changeJFYE(){
				if(this.isYe&&this.isJf){
					if(parseFloat(this.price)<=this.ye+this.jf){//够支付则取消微信支付宝
						this.isYe=false;
						this.isJf=false;
					}
				}
				if(this.isJf){
					if(parseFloat(this.price)<=this.jf){//够支付则取消微信支付宝
						this.isJf=false;
					}
				}
				if(this.isYe){
					if(parseFloat(this.price)<=this.ye){//够支付则取消微信支付宝
						this.isYe=false;
					}
				}
				
			},
			onclick() {
				if(this.payIndex==0){
					if(this.isYe&&this.isJf){
						if(parseFloat(this.price)>=this.ye+this.jf){//够支付则取消微信支付宝
							this.mint.toast('请选择支付方式');
							return
						}
					}else if(this.isJf&&!this.isYe){
						if(parseFloat(this.price)>=this.jf){//够支付则取消微信支付宝
							this.mint.toast('请选择支付方式');
							return
						}
					}else if(this.isYe&&!this.isJf){
						if(parseFloat(this.price)>=this.ye){//够支付则取消微信支付宝
							this.mint.toast('请选择支付方式');
							return
						}
					}
				}
				
				
				let data={
					isYe:this.isYe?1:0,
					isJf:this.isJf?1:0,
					payIndex:this.payIndex
				}
				this.$emit('click', data);
			},
			
			changeJf(){
				if(!this.isJf){
					this.isJf=true;
					console.log(parseFloat(this.price),this.jf)
					console.log(parseFloat(this.price)<=this.jf)
					
					
					if(parseFloat(this.price)<=this.jf){//够支付则取消微信支付宝
						this.payIndex=0;
						// this.showPay=false;
						this.isYe=false;
					}
					if(this.isYe){
						let totalPrice=this.jf+this.ye;
						if(parseFloat(this.price)<=totalPrice){//够支付则取消微信支付宝
							this.payIndex=0;
						}
					}
				}else{
					this.isJf=false;
					if(this.payIndex<1){//没选则默认微信
						// this.payIndex=1;
						this.showPay=true;
					}
				}
			},
			
			changeYe(){
				if(!this.isYe){
					this.isYe=true;
					if(parseFloat(this.price)<=this.ye){//够支付则取消微信支付宝
						this.payIndex=0;
						// this.showPay=false;
						this.isJf=false;
					}
					if(this.isJf){
						let totalPrice=this.jf+this.ye;
						if(parseFloat(this.price)<=totalPrice){//够支付则取消微信支付宝
							this.payIndex=0;
						}
					}
				}else{
					this.isYe=false;
					if(this.payIndex<1){//没选则默认微信
						// this.payIndex=1;
						this.showPay=true;
					}
				}
			},
			getScore() {
				this.$Global.actions.getUserInfo(true).then(res => {
					this.jf=res.point;
					this.ye=res.rewardMoney;
					if(this.jf>0){
						this.selIndex = 0;
					}
				});
			}

		},
		created() {
			this.getScore();
		}
	}
</script>

<style scoped>
	.mask {
		width: 100%;
		top: 0;
		min-height: 320rpx;
		background-color: rgba(0, 0, 0, .7);
		z-index: 999;
	}

	.ran-boxs {
		width: 100%;
		background-color: #fff;
		border-radius: 20rpx 20rpx 0 0;
		padding: 20rpx 0 46rpx;
	}



	.ran-title {
		width: 670rpx;
		margin: 0 40rpx;
		font-size: 32rpx;
		
		font-weight: bold;
		color: #333333;
		line-height: 60rpx;
	}

	.ran-colse {
		font-size: 28rpx;
		
		font-weight: normal;
		color: #999999;
		line-height: 33rpx;
		top: 30rpx;
		right: 38rpx;
	}

	.ran-price {
		margin-top: 50rpx;
		font-size: 50rpx;
		
		font-weight: bold;
		color: #333333;
	}

	.ran-list {
		width: 650rpx;
		padding: 20rpx 0 20rpx;
		min-height: 150rpx;
	}

	.box {
		width: 650rpx;
		height: 110rpx;
	}

	.box-left {
		
		font-size: 36rpx;
		
		font-weight: normal;
		color: #3D3D3D;
		line-height: 42rpx;
	}

	.box-icon {
		width: 50rpx;
		height: 50rpx;
		margin-right:17rpx;
	}

	.box-jf {
		width: 300rpx;
		padding-left: 12rpx;
		font-size: 24rpx;
		
		font-weight: normal;
		color: #3D3D3D;
		line-height: 28rpx;
	}

	.sel-icon {
		width: 40rpx;
		height: 40rpx;
	}



	.ran-btn {
		margin-top: 20rpx;
		width: 603rpx;
		height: 80rpx;
		background: linear-gradient(90deg, #734FF6 0%, rgba(0,243,255,0.7294) 100%);
		border-radius: 40rpx 40rpx 40rpx 40rpx;
		font-size: 30rpx;
		
		font-weight: bold;
		color: #FFFFFF;
	}
</style>
