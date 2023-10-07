<template>
	
	<!--norml 常规switch  -->
	<view class="row_s" :class="classTag+'-switch'" v-if='type=="norml"'>
		<view class="" :class="classTag+'-switch-list '+flexClass ">
			<view  :class="classTag+'-switch-boxs col_c'" v-for="(item,index) of list" :key='index' @click="onClick(index)">
				<view  :class="classTag+'-switch-box row_c '+classTag+'-switch-box-act'" v-if='switchIndex==index'>
					<image :class="classTag+'-switch-icon'" :src="v.selectIcon" mode="aspectFit" v-if="showIcon"></image>
					<view  :class="classTag+'-switch-title row_c '+classTag+'-switch-title-act'" v-else>
						{{item.title||item.name}}
					</view>
				</view>
				<view  :class="classTag+'-switch-box row_c '+classTag+'-switch-box-nor'" v-else>
					<image :class="classTag+'-switch-icon'"  :src="v.icon" mode="aspectFit" v-if="showIcon"></image>
					<view  :class="classTag+'-switch-title row_c '+classTag+'-switch-title-nor'" v-else>
						{{item.title||item.name}}
					</view>
				</view>
			</view>
		</view>
	</view>
	
	
</template>

<script>
	
	export default {
		name: 'lSwitch',
		components: {
		},
		props: {
			
			classTag: {
				type: String,
				default: 'l'
			},
			type: {
				type: String,
				default: 'norml'
			},
			flexClass: {
				type: String,
				default: 'row_a'
			},
			
			//是否显示图标
			showIcon:{
				type:Boolean,
				default:false
			},			
			
			//选中下表
			// switchIndex:{
			// 	type:Number,
			// 	default:0
			// },
			
			//数组
			list: {
				type: Array,
				default: [{
					title:'左侧'
				},{
					title:'右侧'
				}]
			},
			
			
		},
		data() {
			return {
				typeList:['norml','scorll','icon'],
				switchIndex:0
			}
		},
		methods: {
			// 点击Cell
			onClick(i) {
				if(i!=this.switchIndex){
					this.switchIndex=i;
					this.$emit('click',{index:i});
				}
				
			},
			
		}
	}
</script>

<style>
	.l-switch{
		width: 100%;
		min-height: 88rpx;
	}
	.l-switch-list{
		width: 100%;
		min-height: 88rpx;
	}
	.l-switch-boxs{
		width: 200rpx;
		height: 88rpx;
	}
	.l-switch-box{
		min-width: 70%;
		height: 84rpx;
		font-size: 30rpx;
		color: #333;
	}
	.l-switch-box-act{
		color: #007AFF;
		height: 80rpx;
		border-bottom: #007AFF 4rpx solid;
	}
	.l-switch-box-nor{
		color: #333;
		height: 80rpx;
		border-bottom: #fff 4rpx solid;
	}
	.l-switch-icon{
		width: 50rpx;
		height: 50rpx;
		margin-right: 10rpx;
	}
	.l-switch-title{
		
	}
	.l-switch-title-act{
		
	}
	.l-switch-title-nor{
		
	}
	


</style>
