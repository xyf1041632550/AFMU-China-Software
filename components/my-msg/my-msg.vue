<template>
	<view class="box row_s" v-if='!issend'>
		<image class="box-img" :src='photo' mode="aspectFill"></image>
		<view class="box-right col">
			<view class="box-time">
				{{time}}
			</view>
			<view class="box-txt row_s" v-if='!msgType||msgType==1'>{{txt}}</view>
			<view class="box-pic" v-if='msgType==2||msgType==3'>
				<image class="box-pic-img" :src="txt" mode="aspectFit" @click="clickpic"></image>
			</view>
			<view class="box-audios row_s" v-if='msgType==4'>
				<view class="box-audio row_s ree" :style="'width:'+durationw"  @click='clickaudio'>
					<view class="bf-img" :class="isplay?'a1':''"></view>
					{{duration}}s
				</view>
			</view>
		</view>
	</view>
	
	<view class="box row_e" v-else>
		
		<view class="box-right1 col">
			<view class="box-time">
				{{time}}
			</view>
			<view class="box-txt1 row_s" v-if='msgType==1'>{{txt}}</view>
			<view class="box-pic" v-if='msgType==2||msgType==3'>
				<image class="box-pic-img" :src="txt" mode="aspectFit" @click="clickpic"></image>
			</view>
			<view class="box-audios row_e" v-if='msgType==4'>
				<view class="box-audio row_e ree" :style="'width:'+durationw"  @click='clickaudio'>
					{{duration}}s
					<view class="bf-img1" :class="isplay?'a1':''"></view>
				</view>
			</view>
			
		</view>
		<image class="box-img" :src='photo' mode="aspectFill"></image>
	</view>
	
	
</template>

<script>
	
	export default {
		name: 'myMsg',
		components: {
		},
		props: {
			issend: {
				type: Boolean,
				default: true
			},
			photo: {
				type: String,
				default: ""
			},
			time: {
				type: String,
				default: ""
			},
			msgType: {
				type: Number,
				default: ""
			},
			
			txt: {
				type: String,
				default: ""
			},
			duration:{
				type:Number,
				default:1
			},
			durationw:{
				type: String,
				default: "10%"
			}
			
		},
		
		data() {
			return {
				isplay:false,
				tt:'',
			}
		},
		methods: {
			// 点击Cell
			clickpic() {
				this.$emit('clickpic',this.txt)
			},
			
			clickaudio(){
				if(this.isplay){
					this.$emit('stopaudio',this.txt)
					clearTimeout(this.tt);
				}else{
					this.$emit('clickaudio',this.txt)
					clearTimeout(this.tt);
					let this_=this;
					let time=this.duration*1000;
					this.tt=setTimeout(()=>{this_.isplay=false},time)
				}
				this.isplay=!this.isplay;
				
			},
			
		}
	}
</script>

<style>
	.box {
		background: none;
		width: 100%;
		align-items: flex-start;
		margin-bottom: 32rpx;
	}
	.box-img{
	  border-radius: 50%;
	  width: 70rpx;
	  height: 70rpx;
	  margin:0 20rpx;
	  border:#f8f8f8 1px solid;
	  background-color: #f8f8f8;
	}
	.box-right {
	
	}
	.box-right1{
		align-items: flex-end;
	}
	.box-time{
		
			font-size: 18rpx;
			font-weight: normal;
			font-stretch: normal;
			line-height: 36rpx;
			letter-spacing: 0rpx;
			color: #999;
			margin-bottom: 8rpx;
	}
	.box-txt{
		width: max-content;
		border-radius:10rpx ;
		background-color: #fff;
		max-width: 480rpx;
		min-width: 50rpx;
		padding: 10rpx 15rpx;
		
			font-size: 28rpx;
			font-weight: normal;
			font-stretch: normal;
			line-height: 36rpx;
			letter-spacing: 0rpx;
			color: #333333;
			word-break:break-word;
	}
	.box-txt1{
		width: max-content;
		border-radius:10rpx ;
		background-color: #4C8EF8;
		max-width: 480rpx;
		min-width: 50rpx;
		padding: 10rpx 15rpx;
		
			font-size: 28rpx;
			font-weight: normal;
			font-stretch: normal;
			line-height: 36rpx;
			letter-spacing: 0rpx;
			color: #fff;
			word-break:break-word;
	}
	.box-pic{
		width: 200rpx;
		height: 200rpx;
	}
	.box-pic-img{
		width: 100%;
		height: 100%;
	}
	.box-audios{
		width: 480rpx;
		height: 40rpx;
	}
	.box-audio{
		min-width: 20rpx;
		height: 46rpx;
		background-color: #fff;
		border: #f5f5f5 1px solid;
		border-radius: 10rpx;
		font-size: 22rpx;
		padding: 0 12rpx;
	}
	.yy{
		width: 30rpx;
		height: 30rpx;
		top: -5rpx;
		right: -10rpx;
	}
	.yy1{
		width: 30rpx;
		height: 30rpx;
		top: -5rpx;
		left: -10rpx;
	}
	.bf-boxs{
		height: 46rpx;
		margin:0 6rpx;
	}
	.bf-box{
		width: 10rpx;
		height: 10rpx;
		background-color: #999;
		margin: 4rpx;
		border-radius: 50%;
	}
	.bf1{
		animation: changesz1 .8s infinite .2s;
	}
	.bf2{
		animation: changesz1 .8s infinite .4s;
	}
	.bf3{
		animation: changesz1 .8s infinite .6s;
	}
	.bf-img{
		width: 20rpx;
		height: 20rpx;
		background-repeat: round;
		background-size: contain;
		background-image: url(../../static/images/msg/w1.png);
		transform: rotate(-180deg);
		margin-right: 8rpx;
	}
	.bf-img1{
		width: 20rpx;
		height: 20rpx;
		background-repeat: round;
		background-size: contain;
		background-image: url(../../static/images/msg/w1.png);
		margin-left: 8rpx;
	}
	.a1{
		animation: changesa1 .8s infinite .1s;
	}
	@keyframes changesz1 {
	0% {
		/* transform:scale(0.7); */
		width: 10rpx;
		height: 10rpx;
		opacity: .5;
	}
	100% {
		/* transform:scale(1.5); */
		width: 10rpx;
		height: 10rpx;
		opacity: 1;
	}
	}
	
	@keyframes changesa1 {
	
	0% {
		background-image: url(../../static/images/msg/w1.png);
	}
	40% {
		background-image: url(../../static/images/msg/w3.png);
	}
	90% {
		background-image: url(../../static/images/msg/w5.png);
	}
	}

</style>
