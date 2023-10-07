<template>
	<view class="">
		<movable-area class="row_b" style="width: 100%;height: 50rpx;">
			<view class="" style="width: 100%;height: 16rpx;background-color: #00FF00;" ></view>
		    <movable-view :x='minX' direction="horizontal" class="block" :disabled='disabledLeft' style="background-color: #00BCD4;" @change="onChangeLeft"></movable-view>
			<movable-view :x='maxX'  direction="horizontal" class="block" :disabled='disabledRight' style="background-color: #007AFF;" @change="onChangeRight"></movable-view>
		</movable-area>
	</view>
</template>

<script>
	
	export default {
		name: 'rangeSlide',
		components: {
		},
		props: {
			minVal:{
				type:Number,
				default:0
			},
			maxVal:{
				type:Number,
				default:5
			},
			step:{
				type:Number,
				default:1
			},
			width:{
				type:Number,
				default:690
			}
			
		},
		data() {
			return {
				minX:0,
				maxX:375,
				tt:0,//定时器管理
				isMove:false,//是否移动中
				widthLen:375,
				disabledLeft:false,
				disabledRight:false
			}
		},
		computed:{
			// widthLen:function(){
			// 	return this.width;
			// }
		},
		
		methods: {
			// 点击Cell
			onClick() {
				this.$emit('click')
			},
			
			//onChange
			onChangeLeft(e){
				// console.log(e)
				let this_=this;
				if(e.mp.detail.x>this.maxX){
					this.disabledLeft=true;
					this.disabledRight=false;
					this.minx=this.maxX-10;
					setTimeout(()=>{this_.disabledLeft=false;},500)
					return}
				this.isMove=true;
				
				clearTimeout(this.tt)
				this.tt=setTimeout(()=>{
					this_.isMove=false;
					this_.comPost(e,0);
				},50)
			},
			
			
			//onChange
			onChangeRight(e){
				// console.log(e)
				let this_=this;
				if(e.mp.detail.x<this.minx){
					this.disabledLeft=false;
					this.disabledRight=true;
					this.maxX=this.minx+10;
					setTimeout(()=>{this_.disabledRight=false;},500)
					return}
				this.isMove=true;
				
				clearTimeout(this.tt)
				this.tt=setTimeout(()=>{
					this_.isMove=false;
					this_.comPost(e,1);
				},200)
			},
			
			comPost(e,type){
				if(this.isMove){return};
				let stepx=(this.widthLen/this.maxVal);
				console.log(stepx)
				let x=Math.round(e.mp.detail.x/stepx)*stepx;
				if(type==1){
					if(x<this.minX){
						x=this.minX;
					}
					this.maxX=x;
				}else{
					if(x>this.maxX){
						x=this.maxX;
					}
					this.minX=x;
				}
				console.log(this.minX,this.maxX)
				this.$emit('rangechange',{e:e,minValue:Math.round(this.minX/stepx),maxValue:Math.round(this.maxX/stepx)})
			},
			
			tap(e){
				console.log(e)
			},
		},
		created() {
			this.widthLen=uni.getSystemInfoSync().screenWidth*690/750;
			this.maxX=this.widthLen-50/750*this.widthLen;
			console.log(this.maxX)
			this.minX=0;
			console.log(uni.getSystemInfoSync().screenWidth)
		}
	}
</script>

<style>
	.block {
		width: 50rpx;
		height: 50rpx;
		transform: translate(0, -50%);
		background: #fff;
		border-radius: 50%;
		box-shadow: 0rpx 0rpx 6rpx #ccc;
	}
	

</style>
