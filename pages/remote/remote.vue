<style src='./remote.css'></style>
<script src="./remote.js"></script>
<template>
	<view>
		<view class="top row_e">
			<image class="top-icon" src="/static/images/top.png" mode="widthFix"></image>
			<view class="title row_c">{{$t('tab.page3')}}</view>
		</view>
		<view class="fid-b-l w100">
			<image class="b-img" src="/static/images/bot.png" mode="widthFix"></image>
		</view>
		<view class="w100 col_s ree" style="z-index: 99;">
			<image class="ewm" src="/static/images/ewm.jpg" mode=""></image>
			<view class="txt row_c">{{$t('Scan code to follow')}}</view>
			<view class="txt row_c">{{$t('Waiting for your consultation')}}</view>
		</view>
		<lang></lang>
	</view>
</template>
