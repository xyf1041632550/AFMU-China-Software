<template>

	<view class="mask fid-all" @click.stop='onBack' @touchmove.stop.prevent=''>
		<view class="pop-top row_c fid-t-l">
			<view class="top-back row_s abe-b-l"  @click.stop='onBack'>
				<image class="back" src="/static/images/back.png" mode="aspectFit"></image>
			</view>
			<view class="pop-title row_c">选择城市</view>
			<view class="top-back row_e abe-b-r"  @click.stop='onConfirm'>
				<view class="top-btn row_c" >确定</view>
			</view>
		</view>
		<view class="pop-boxs row_s abe-all" style="background-color: #222333;">
			<scroll-view scroll-y="true" class="pop-left-list abe-all left" >
				<view class="left-box row_c" :class="typeIndex==index?'left-box-act':'left-box-nor'" v-for="(item,index) of typeList"
				 :key="index" @click.stop="onSelect(index)">{{item.name}}</view>
			</scroll-view>
			<scroll-view scroll-y="true" class="pop-left-list abe-all right" v-if='typeList[typeIndex].sub&&sonList.length>0' >
				<view class="left-box row_c" :class="sonIndex==index?'left-box-act':'left-box-nor'" v-for="(item,index) of sonList"
				 :key="index" @click.stop="onSelectSon(index)">{{item.name}}</view>
			</scroll-view>
			<scroll-view scroll-y="true" class="pop-left-list abe-all right1" v-if='sonList[sonIndex].sub&&sunList.length>0'>
				<view class="left-box row_c" :class="sunIndex==index?'left-box-act':'left-box-nor'" v-for="(item,index) of sunList"
				 :key="index" @click.stop="onSelectSun(index)">{{item.name}}</view>
			</scroll-view>
		</view>
	</view>


</template>

<script>
	export default {
		name: 'popCity',
		components: {},
		props: {
			typeList:{
				type:Array,
				default:[]
			}
		},
		data() {
			return {
				typeIndex: 0,
				sonIndex:0,
				sonList:[],
				sunIndex:0,
				sunList:[]
			}
		},
		methods: {
			
			changeCity(){
				console.log(11)
			},
			//onSelect 
			onSelect(i) {
				this.typeIndex = i;
				this.sonList=this.typeList[i].sub;
				this.onSelectSon(0);
			},

			//onSelectSon
			onSelectSon(i) {
				this.sonIndex=i;
				this.sunList=this.sonList[i].sub;
				this.sunIndex=0;
			},
			
			onSelectSun(i){
				this.sunIndex=i;
				
			},
			
			//onBack
			onBack(){
				this.$emit('close');
			},
			
			//onConfirm
			onConfirm(){
				let index = this.typeIndex;
				let i = this.sonIndex;
				// adcode=adcode.substr(0,6)
				// console.log(adcode)
				let data={
					cityId: this.sonList[this.sonIndex].id,
					cityName:this.sonList[this.sonIndex].name,
					provinceId:  this.typeList[this.typeIndex].id,
					provinceName: this.typeList[this.typeIndex].name,
					areaId: this.sunList[this.sunIndex].id,
					areaName: this.sunList[this.sunIndex].name,
				}
				this.$emit('click',data);
				// this.$emit('click',data);
			},
			
			//getCity
			getCity(pid=0,index=0){
				let data={
					pid:pid
				};
				this.base.post('consumer/houses/getDiQuByPid',data).then(res=>{
					if(index==0){
						this.typeList=res.data;
						this.getCity(this.typeList[this.typeIndex].id,1)
					}else if(index==1){
						this.sonIndex=0;
						this.sonList=res.data;
						this.getCity(this.sonList[this.sonIndex].id,2)
					}else if(index==2){
						this.sunIndex=0;
						this.sunList=res.data;
					}
				})
			},
		},
		created() {
			// this.getCity();
			this.sonList=this.typeList[this.typeIndex].sub;
			this.onSelectSon(this.typeIndex);
		}
	}
</script>

<style>
	.mask {
		width: 100%;
		top: 0;
		min-height: 320rpx;
		background-color: rgba(0, 0,0, .7);
		    z-index: 999;
			animation: yup .5s;
	}
	
	.pop-top{
		width: 100%;
		height: 88rpx;
		top: 400rpx;
		background-color: #fff;
		
	}
	.top-back{
		padding-left: 30rpx;
		min-width: 70rpx;
		height: 88rpx;
		padding-right: 30rpx;
	}
	.back{
		width: 22rpx;
		height: 88rpx;
	}
	.pop-title{
		font-size: 30rpx;
		color: #333;
	}
	.top-btn{
		width: 120rpx;
		height: 50rpx;
		background-color: #2f9bfe;
		border-radius: 6rpx;
		font-size: 28rpx;
		color: #fff;
	}
	.pop-boxs {
		/* border-top: rgba(238,238,238,.1) 1rpx solid; */
		border-top: rgba(0,0,0,.1) 1rpx solid;
		min-width: 100rpx;
		/* height: 100%; */
		top: 488rpx;
		background-color: #fff;
		/* animation: xleft .3s; */
	}

	.pop-left-list {
		width: 248rpx;
		/* min-height: 750rpx; */
		background-color: #ffffff;
		bottom: 0rpx;
		border-right: rgba(0,0,0,.1) 1px solid;
	}
	.left{
		left: 0;
		bottom: 0;
		height: 100%;
	}
	.right{
		left: 250rpx;
	}
	.right1{
		left: 500rpx;
	}
	.left-box {
		width: 248rpx;
		height: 70rpx;
		font-size: 28rpx;
		/* font-weight: bold; */
		font-stretch: normal;
		line-height: 30rpx;
		letter-spacing: 0rpx;

	}

	.left-box-act {
		background-color: #f8f8f8;
		color: #000;
	}

	.left-box-nor {
		background-color: 'none';
		color: #999;
	}
	.pop-bot{
		width: 100%;
		border-top: 1px solid rgba(122,122,122,.5);
		height: 88rpx;
	}
	.pop-bot-btn{
		width: 50%;
		height: 88rpx;
		font-size: 32rpx;
		font-weight: bold;
		/* animation: yup .4s; */
	}
	.nor{
		background-color: #999;
		color: #fff;
	}
	.act{
		background-color: #0e65fe;
		color: #fff;
	}
	
</style>
