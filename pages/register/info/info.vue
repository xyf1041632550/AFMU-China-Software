<style src='./info.css'></style>
<script src="./info.js"></script>
<template>
	<view class="page" >
		<uni-nav-bar left-icon="back" title="注册" ></uni-nav-bar>
		<view class="list col ree">
			<view class="box row_s" >
				<view class="box-title row_s">姓名：</view>
				<input  class="box-ipt" v-model="info.realName" placeholder="请填写姓名" ></input>
			</view>
			<view class="box row_s" >
				<view class="box-title row_s">电话：</view>
				<input class="box-ipt" type="number" maxlength="11" v-model="info.moblie" placeholder="请输入手机号" ></input>
			</view>
		</view>
		
		<view class="list col ree">
			<view class="box row_s"  >
				<view class="box-title row_s">车辆类型：</view>
				<uni-data-picker style='flex: 1;min-width: 400rpx; border:none;' :map="{text:'name',value:'id'}" v-model='info.shopType' :localdata="list" popup-title="请选择" @change="change" ></uni-data-picker>
				<!-- <view class="row_b" >
					<image class="picker-right" src="/static/images/index/right.png" mode=""></image>
				</view> -->
			</view>
			<view class="box row_s" >
				<view class="box-title row_s">车牌号：</view>
				<input :inputBorder="false" class="box-ipt" v-model="info.name" placeholder="请填写车牌号" ></input>
			</view>
		</view>
		
		<view class="list col ree">
			<view class="box row" style="min-height: 224rpx;">
				<view class="box-title row_s" style="height: 110rpx;">车辆照片：</view>
				<view class="pic-list row_s">
					<view class="pic-box col_b ree"  v-if="info.images">
						<image class="pic-img" :src="info.images" mode="aspectFill" @tap='onPreviewImage(info.images)'></image>
						<image class="pic-del abe-t-r" src="/static/images/my/close.png" mode="" @tap.stop="onDelectImg('images')"></image>
					</view>
					<view class="pic-box col_b ree" v-else  @tap="onSelectImgList('images')">
						<image class="pic-img" src="/static/images/index/add.png" mode="aspectFill" ></image>
					</view>
				</view>
			</view>
			<view class="box row" style="min-height: 224rpx;">
				<view class="box-title row_s" style="height: 110rpx;">上传头像：</view>
				<view class="pic-list row_s">
					<view class="pic-box col_b ree"  v-if="info.logo">
						<image class="pic-img" :src="info.logo" mode="aspectFill" @tap='onPreviewImage(info.logo)'></image>
						<image class="pic-del abe-t-r" src="/static/images/my/close.png" mode="" @tap.stop="onDelectImg('logo')"></image>
					</view>
					<view class="pic-box col_b ree" v-else  @tap="onSelectImgList('logo')">
						<image class="pic-img" src="/static/images/index/add.png" mode="aspectFill" ></image>
					</view>
				</view>
			</view>
			
			
			
			
		</view>
		
		<view class="btn row_c" @tap="onClick">确认</view>
		<view class="floor-100"></view>
	</view>
	
	
</template>

