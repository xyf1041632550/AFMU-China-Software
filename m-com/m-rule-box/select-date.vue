<template>
	<view class="rule-bg col_e" v-if='showRule' @click.stop='onClose'>
		<view class="rules col yup ree" @click.stop=''>
			<view class="city-head row_b">
				<view class="head-close row_c" @click="onClose">取消</view>
				<view class="head-title">选择时间</view>
				<view class="head-close row_c" @click="onConfirm">确认</view>
			</view>
			<view class="listsss row_c">
				<scroll-view scroll-y="true" class="rule-ppp col" >
					<view class="rule-box row_c" v-for="(item,index) of typeList"
					 :key="index" @click.stop="onSelect(index)">
						<view class="rule-title row_c" :class="typeIndex==index?'rule-act':''">{{item.title}}</view>
					</view>
				</scroll-view>
				<scroll-view scroll-y="true" class="rule-ppp col" :scroll-into-view="'id'+sonIndex" >
					<view class="rule-box row_c"  v-for="(item,index) of sonList"
					 :key="index" @click.stop="onSelectSon(index)" :id="'id'+index">
						<view class="rule-title row_c" :class="sonIndex==index?'rule-act':''">{{item.title}}</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
	

</template>

<script>
	export default {
		components: {},
		props: {
			//showRule
			showRule: {
				type: Boolean,
				default: false,
			},
			
		},
		data() {
			return {
				selIndex:0,
				typeIndex: 0,
				sonIndex:0,
				sonList:[],
				sunIndex:0,
				typeList:[]
			}
		},
		
		methods: {
			onClose() {
				this.$emit('close', {});
			},
			changeCity(){
				console.log(11)
			},
			//onSelect 
			onSelect(i) {
				this.typeIndex = i;
				this.selIndex=1;
				this.sonIndex=-1;
			},

			//onSelectSon
			onSelectSon(i) {
				this.sonIndex=i;
				this.onConfirm();
			},
			
			
			//onBack
			onBack(){
				this.$emit('close');
			},
			
			//onConfirm
			onConfirm(){
				let ydate=this.typeList[this.typeIndex];
				let mdate=this.sonList[this.sonIndex];
				let data={
					title: ydate.title+' '+mdate.title,
					start:ydate.val+'-'+mdate.val[0],
					end:ydate.val+'-'+mdate.val[1],
				}
				this.$emit('click',data);
				// this.$emit('click',data);
			},
			
			
			
		},
		mounted() {
		},
		created() {
			let y=this.TimeTool.getTime('','y')-4;
			let list=[];
			for (var i = 0; i <5; i++) {
				list.push({title:(y+i)+'年',val:y+i});
			}
			this.typeList=list;
			this.typeIndex=4;
			this.sonList=[
				// {title:'第一季度',val:["01","03"]},
				// {title:'第二季度',val:["04","06"]},
				// {title:'第三季度',val:["07","09"]},
				// {title:'第四季度',val:["10","12"]},
				{title:'1月',val:["01-01","01-31"]},
				{title:'2月',val:["02-01","02-28"]},
				{title:'3月',val:["03-01","03-31"]},
				{title:'4月',val:["04-01","04-30"]},
				{title:'5月',val:["05-01","05-31"]},
				{title:'6月',val:["06-01","06-30"]},
				{title:'7月',val:["07-01","07-31"]},
				{title:'8月',val:["08-01","08-31"]},
				{title:'9月',val:["09-01","09-30"]},
				{title:'10月',val:["10-01","10-31"]},
				{title:'11月',val:["11-01","11-30"]},
				{title:'12月',val:["12-01","12-31"]},
				]
				this.sonIndex=parseInt(this.TimeTool.getTime('','m'))-1;
		}
	}
</script>

<style>
	.close-img{
		padding: 12rpx;
		left: 12rpx;
		width: 34rpx;
			height: 34rpx;
	}
	.rule-bg {
		width: 100%;
		position: fixed;
		top: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .75);
		z-index: 111;
	
	}
	
	.rule {
		
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
		/* margin-bottom: 1rpx; */
		/* width: 658rpx; */
		min-height: 620rpx;
		border-radius: 20rpx 20rpx 0 0;
		background-color: #fff;
	}
	
	.city-head{
		width: 100%;
		height: 100rpx;	
	}
	.head-title{
		font-size: 32rpx;
		
		font-weight: 500;
		color: #000000;
			
	}
	.head-close{
		padding: 0 30rpx;
		font-size: 32rpx;
		
		font-weight: 500;
		color: #808080;
	}
	.rule-ppp {
		width: 44%;
		max-height: 600rpx;
		overflow-y: scroll;
	
	}
	
	.rule-box {
		/* border-bottom: #f5f5f5 1rpx solid; */
		width: 100%;
		height: 90rpx;	margin: 0 auto;
	}
	
	.rule-title {
			font-size: 28rpx;
			
			font-weight: 500;
			color: #A6A6A6;
	}
	.rule-act{
		font-size: 32rpx;
		
		font-weight: bold;
		color: #1A1A1A;
	}
	
	
	.sel-icon {
		width: 44rpx;
		height: 28rpx;
		margin-right: 30rpx;
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
