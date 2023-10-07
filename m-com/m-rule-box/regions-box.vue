<template>
	<!-- v-if='isShow' -->
	<view class="m-type-list ree row_s" v-if='isShow' @click.stop="">
		<view class="abe-all" style="width: 750rpx;margin:20rpx 0;height: 500rpx;">
			<scroll-view scroll-y="true" class="pop-list abe-all ">
				<view class="m-type-box row_c" :class="typeIndex==index?'m-type-box-act':''"
					v-for="(item,index) of typeList" :key="index" @click.stop="onSelect(index)">{{item.title}}</view>
			</scroll-view>
			<scroll-view scroll-y="true" class="pop-list1 abe-all " v-if='sonList.length>0'>
				<view class="m-type-box row_c" :class="sonIndex==index?'m-type-box-act':''"
					v-for="(item,index) of sonList" :key="index" @click.stop="onSelectSon(index)">{{item.title}}</view>
			</scroll-view>
		</view>
	</view>


</template>

<script>
	export default {
		components: {},
		props: {


			//数组
			list: {
				type: Array,
				default: null
			},

			//showRule
			isShow: {
				type: Boolean,
				default: false,
			},
			selIndex: {
				type: Number,
				default: -1,
			}

		},
		watch: {

			list: function() {
				let list = JSON.parse(JSON.stringify(this.list));
				let data = {
					title: '附近',
					id: -1,
					list: [{
							title: '附近',
							value: 5000,
							type: 1
						},
						{
							title: '500米',
							value: 500,
							type: 1
						},
						{
							title: '1000米',
							value: 1000,
							type: 1
						},
						{
							title: '2000米',
							value: 2000,
							type: 1
						},
						{
							title: '3000米',
							value: 3000,
							type: 1
						},
						{
							title: '5000米',
							value: 5000,
							type: 1
						},
					]
				}
				
				list.unshift(data);
				this.typeList = list;
				this.sonList = data.list;
				
			},

		},
		computed: {
			// itemNew:function(v,o){
			// 	return this.item;
			// }
		},
		data() {
			return {
				typeList: [],
				sonList: [],
				typeIndex: 0,
				sonIndex: -1,
			}
		},
		mounted() {
			let list = JSON.parse(JSON.stringify(this.list));
			let data = {
				title: '附近',
				id: -1,
				list: [{
						title: '附近',
						value: 5000,
						type: 1
					},
					{
						title: '500米',
						value: 500,
						type: 1
					},
					{
						title: '1000米',
						value: 1000,
						type: 1
					},
					{
						title: '2000米',
						value: 2000,
						type: 1
					},
					{
						title: '3000米',
						value: 3000,
						type: 1
					},
					{
						title: '5000米',
						value: 5000,
						type: 1
					},
				]
			}
			
			list.unshift(data);
			this.typeList = list;
			this.sonList = data.list;
		},
		methods: {

			onClose() {
				this.$emit('close', {});
			},

			//onSelect
			onSelect(i) {
				this.typeIndex = i;
				this.sonList = this.typeList[i].list;
				console.log(this.sonList)
				this.sonIndex = -1;
			},

			//onSelectSon
			onSelectSon(i) {
				let data = this.sonList[i]
				this.$emit('click', data);
			},

			// 点击Cell
			onSure(index) {
				// console.log(this)
				let data = {
					index: index
				}
				this.$emit('click', data);
			},

		}
	}
</script>

<style>
	.m-type-list {
		padding: 30rpx 14rpx;
		width: 750rpx;
		min-height: 560rpx;
		background: #FFFFFF;
		border-radius: 0px 0px 20rpx 20rpx;
		flex-wrap: wrap;
	}

	.m-type-box {
		width: 100%;
		height: 58rpx;

		/* background: #F5F5F5; */
		/* border-radius: 4rpx; */
		font-size: 26rpx;
		
		font-weight: 500;
		color: #808080;
		/* margin: 8rpx; */
	}

	.m-type-box-act {
		color: #FF0000;
		background: #fff;

	}

	.pop-list {
		width: 160rpx;
		/* min-height: 750rpx; */
		background-color: #F5F5F5;
		right: 530rpx;
		bottom: 0rpx;

	}

	.pop-list1 {
		left: 160rpx;
		width: 590rpx;
		/* min-height: 750rpx; */
		background: #fff;
		bottom: 0rpx;
	}
</style>
