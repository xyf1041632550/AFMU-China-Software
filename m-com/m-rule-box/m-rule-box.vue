<template>
	
	<view class="rule-bg col" v-if='item&&showRule'  @click.stop='onClose'>
		<view class="rule col a1" >
			<view class="rules col" @click.stop=''>
				<image class="rule-cancal" src="/static/images/index/close.png"  @click.stop='onClose'></image>
				<view class="rule-item-box row_s" >
					<image class="rule-item-img row_c" :src="item.images[0]" mode="aspectFill"></image>
					<view class="rule-item-right col_b">
						<view class="rule-item-top col">
							<view class="rule-item-name ellipsis">{{item.name}}</view>
							
							<!-- <view class="rule-item-kc nowarp">{{item.title}}</view> -->
						</view>
						
						<view class="rule-item-price"><text style="font-size: 20rpx;">￥</text>{{salePrice}}</view>
					</view>
				</view>
				<view class="rule-line"></view>
				<view  v-for='(v,index) of item.goodsSpecsExtend.goodsSKUs' :key='index' >
					<view class="rule-title">{{v.name}}</view>
					<view class="rule-boxs row_s">
						<view  v-for='(v,i) of v.specsItems' :key='i' >
							<view :class="i==ruleList[index]?'rule-box1 row_c':'rule-box row_c'"  @click.stop='onSelect(i,index)'>
								{{v.name}}
							</view>
						</view>
					</view>
				</view>
		
				<view class="rule-nums row_b">
					<view class="nums-title row_c" >数量</view>
					<view class="nums-boxs row_c" >
						<view class="nums-img row_c"  @click='onDel'>
							<image class="nums-img-img"  src="/static/images/index/del.png" mode='aspectFit' >
						</view>
						<input type="number" v-model="num" class="nums-box ipt row_c" @focusout="onChangeNum">
						<view class="nums-img1 row_c" @click='onAdd'>
							<image class="nums-img-img"  src="/static/images/index/add.png" mode='aspectFit' >
						</view>
					</view>
				</view>
		
			</view>
			<view class="rule-btns row_c" >
				<!-- <view class="rule-btn row_c" @click.stop="onSure('now')" >立即购买</view> -->
				<view class="rule-btn row_c ree"  @click.stop="onSure('now')" >
					<image class="btn-bg" src="/static/images/btn-bg.png" mode=""></image>
					<view class="abe-all row_c">立即下单</view>
				</view>
			</view>
		</view>
	</view>
	
	
</template>

<script>
	
	export default {
		name: 'ruleBox',
		
		components: {
		},
		
		props: {
			//数组
			item: {
				type: Object,
				default: null
			},
			
			//showRule
			showRule:{
				type:Boolean,
				default:false,
			},
			
			
		},
		watch:{
			// item:function(v,o){
			// 	console.log(o)
			// 	console.log(v)
				
			// },
			showRule:function(){
				this.startItem();
			},
			num:function(){
			
				// let count=this.item.remainStock;
				// if(this.item.goodsSpecs.goodsSpecGroups.length>0){
				// 	count=this.remainStockKeeping;
				// }
				// if(this.num>count){
				// 	this.num=count;
				// }
			},
		},
		computed:{
			// itemNew:function(v,o){
			// 	return this.item;
			// }
		},
		data() {
			return {
				ruleId:'',//规格id
				goodsSpecsId:'',//规格
				salePrice:'',//现价
				price:'',//原价
				remainStockKeeping:0,//库存
				num:1,//数量
				rulename:'',
				ruleList:[],
			}
		},
		
		methods: {
			
			/**
			 * onChangeNum
			 */
			onChangeNum(){
				if(!this.num){
					this.num=1;
				}
			},
			
			onClose(){
				this.$emit('close',{});
			},
			
			// 点击Cell
			onSure(type) {
				// console.log(this)
				let data={
					ruleId:this.ruleId,
					itemId:this.item.id,
					goodsSpecsId:this.goodsSpecsId,
					rulename:this.rulename,
					num:this.num,
					salePrice:this.salePrice,//现价
					price:this.price,//原价
					remainStockKeeping:this.remainStockKeeping,//库存
					type:type
				}
				this.$emit('click',data);
			},
			
			//
			startItem(){
				if(this.item.isSpec==0){
					this.salePrice=this.item.salePrice;//现价
					this.price=this.item.salePrice;//原价
					this.remainStockKeeping=this.item.remainStock;//库存
					return
				}
				this.ruleList=[];
				for(let i=0;i<this.item.goodsSpecsExtend.goodsSKUs.length;i++){
					this.ruleList.push(0);
				}
				// console.log(this.ruleList)
				this.comruleList();
			},
			
			/**
			 * onSelect选择规格
			 */
			onSelect(n,i){
				// console.log(n,i)
				this.$set(this.ruleList,i,n)
				this.comruleList();
			},
			
			/**
			 * 计算最后数组规格等信息
			 */
			comruleList(){
				let this_=this;
				let list=this_.item.goodsSpecsExtend.goodsSpecGroups;
				let idStr='';
			
				for(let i=0;i<this_.item.goodsSpecsExtend.goodsSKUs.length;i++){
					idStr+=(this_.item.goodsSpecsExtend.goodsSKUs[i].specsItems[this_.ruleList[i]].id+',');
				}
			
				idStr=idStr.substr(0,idStr.length-1);
				// console.log(idStr)
				let data={};
				for(let i=0;i<list.length;i++){
					// console.log(list[i].specsId,idStr)
					if(list[i].specsId==idStr){
						data= list[i];
						break;
					}
				}
				// console.log(data)
				this.ruleId=data.specsId;
				this.goodsSpecsId=data.id;
				this.rulename=data.name;
				this.salePrice=data.salePrice;
				this.price=data.price;
				this.remainStockKeeping=data.remainStock;
			},
			
			/**
			 * 增加数量
			 */
			onAdd(){
				//todo remainStockKeeping判断库存值
				// console.log(this.num)
				this.num=parseInt(this.num)+1;
				return
				if(this.num<this.remainStockKeeping){
					this.num+=1;
				}
			},
			
			/**
			 * 减少数量
			 */
			onDel(){
				// console.log(this.num)
				if(parseInt(this.num)>1){
					this.num=parseInt(this.num)-1;
				}
			},
			
		}
	}
</script>

<style>
	.rule-bg{
		width: 100%;
		position: fixed;
		top: 0;
		bottom: 0;
		background: rgba(0,0,0,.75);
		z-index: 111;
		
	}
	.rule{
		width: 100%;
		min-height: 368rpx;
		position: fixed;
		bottom: 0;
		top: 0;
		z-index: 999;
		overflow-y: scroll;
		justify-content: flex-end;
	}
	.rules{
		position: relative;
		width: 100%;
		padding-bottom: 180rpx;
		/* margin-bottom: 1rpx; */
		border-radius: 30rpx 30rpx 0 0;
		background-color: #fff; 
	}
	.rule-cancal{
		position: absolute;
		width:42rpx;
		height:42rpx;
		right:30rpx;
		top: 40rpx;
		padding: 2rpx;
	}
	.rule-item-box{
		padding: 40rpx 30rpx 0;
		width: 690rpx;
		min-height: 170rpx;
	}
	.rule-item-img{
		width: 280rpx;
		height: 230rpx;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		background-color: #f7f7f7;
	}

	.rule-item-right{
		margin-left: 20rpx;
		width: 360rpx;
		height: 160rpx;
	}
	.rule-item-name{
		max-width: 100%;
		font-size: 32rpx;
		
		font-weight: 400;
		color: #333333;
		line-height: 36rpx;
	}
	.rule-item-kc{
		width: 100%;
		margin-top: 12rpx;
		font-size: 28rpx;
		
		font-weight: 400;
		color: #666666;
		line-height: 40rpx;
	}
	.rule-item-top{
		width: 100%;
		/* margin-top: 20rpx; */
	}
	.rule-item-price{
		width: 100%;
		font-size: 36rpx;
		
		font-weight: 400;
		color: #F91616;
	}
	.rule-item-price1{
		margin-left: 26rpx;
		
		font-size: 26rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: #666666;
		text-decoration: line-through;
	}
	
	
	.rule-item-sel{
		width: 100%;
		margin-top: 12rpx;
		font-size:24rpx;
		
		font-weight:500;
		color:rgba(153,153,153,1);
		line-height:36rpx;
	}
	.rule-item-title{
		
		font-size:30rpx;
		
		font-weight:500;
		color:rgba(51,51,51,1);
		line-height:36rpx;
		width: 100%;
		padding-left: 30rpx;
	}
	.rule-title{
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		
		font-size: 28rpx;
		
		font-weight: 400;
		color: #3D3D3D;
		line-height: 34rpx;
		padding-left: 50rpx;
	}
	.rule-line{
		margin: 30rpx;
		width: 690rpx;
		height: 1px;
		border-bottom: 1rpx #EEEEEE solid;
	}
	.rule-boxs{
		margin: 0 30rpx;
		padding: 0rpx 0 20rpx;
		flex-wrap: wrap;
		width: 690rpx;
		/* border-bottom: 1rpx #EEEEEE solid; */
	}
	.rule-box1{
		min-width: 70rpx;
		padding: 0 18rpx;
		height: 58rpx;
		background: #29CFA4;
		border-radius: 8rpx 8rpx 8rpx 8rpx;
		border: 1px solid #29CFA4;
		margin: 10rpx 15rpx;
		
		font-size: 24rpx;
		
		
		font-weight: 400;
		color: #fff;
	}
	.rule-box{
		min-width: 70rpx;
		padding: 0 18rpx;
		height: 58rpx;
		background: #F6F6F6;
		border-radius: 8rpx 8rpx 8rpx 8rpx;
		border: 1px solid #F6F6F6;
		margin: 10rpx 15rpx;
		
		font-size: 24rpx;
		
		
		font-weight: 400;
		color: #3d3d3d;
	}
	
	.rule-nums{
		min-height: 110rpx;
		width: 690rpx;
		margin: 0rpx 30rpx;
		/* border-bottom: #EEEEEE 1rpx solid; */
	}
	.nums-title{
		
		font-size: 28rpx;
		
		font-weight: 400;
		color: #3D3D3D;
		line-height: 34rpx;
		margin-left: 14rpx;
	}
	.nums-boxs{
		min-width:180rpx;
		height:56rpx;
		
		border-radius:5rpx;
	}
	.nums-img{
		width: 52rpx;
		height: 52rpx;
		/* background-color: #f7f7f7;
		border-radius: 6rpx 0 0 6rpx;
		font-size:40rpx;
		line-height: 56rpx; */
	}
	.nums-img1{
		width: 52rpx;
		height: 52rpx;
		/* background-color: #f7f7f7;
		border-radius:0 6rpx  6rpx 0;
		font-size:40rpx;
		line-height: 56rpx; */
	}
	.nums-img-img{
		width: 52rpx;
		height: 52rpx;
	}
	.nums-box{
		width: 80rpx;
		height: 56rpx;
		/* background-color: #f7f7f7; */
		margin: 0 2rpx;
		font-size: 36rpx;
		
		font-weight: 400;
		color: #3D3D3D;
		line-height: 50rpx;
		text-align: center;
	}
	
	.rule-btns{
		position: fixed;
		width: 100%;
		background-color: #fff;
		height: 80rpx;
		bottom: 40rpx;
	}

	
	.rule-btn  {
	width: 574rpx;
	height: 80rpx;
	border-radius: 40rpx;
	margin-right: 36rpx;
	font-size: 32rpx;
	
	font-weight: 400;
	color: #FFFFFF;
	line-height: 44rpx;
	}
	
	.btn-bg{
	width: 100%;
	height: 100%;
	}
	
	
	.a1{
		-webkit-transform:translate(0,0);
		-webkit-animation:animations 0.5s ease-out;
		transform:translate(0,0);
		animation:animations 0.5s ease-out;
	}
	@-webkit-keyframes animations{
		0%{-webkit-transform:translate(0,100%);opacity:.5;}
		100%{-webkit-transform:translate(0,0);opacity:1;}
	}
	@keyframes animations{
		0%{-webkit-transform:translate(0,100%);opacity:0.5;}
		100%{-webkit-transform:translate(0,0);opacity:1;}
	}

</style>
