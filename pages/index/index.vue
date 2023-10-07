<style src='./index.css'></style>
<script src="./index.js"></script>
<template>
	<view>
		<view class="top row_e">
			<image class="top-icon" src="/static/images/top.png" mode="widthFix"></image>
			<view class="title row_c">{{$t('Search Records')}}</view>
		</view>
		<view class="abe-b-l w100">
			<image class="b-img" src="/static/images/bot.png" mode="widthFix"></image>
		</view>
		
		<view class="pz-box col_c ree" style="z-index: 999;" @click="selctImg">
			<image class="pz-img" src="/static/images/pzhao.png" mode=""></image>
			<view class="pz-title row_c abe-b-l">{{$t('tab.page1')}}</view>
		</view>
		
		<lang></lang>
		
		
	</view>
</template>
