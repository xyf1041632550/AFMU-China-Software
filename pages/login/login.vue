<style  src="./login.css"></style>
<script src="./login.js"></script>
<template>
	<view class="page" >
		<view class="floor-50"></view>
		<view class="w100 col_s" style="margin-top: 180rpx;margin-bottom: 80rpx;">
			<image class="login-logo" src="/static/images/logo.png" mode="widthFix"></image>
		</view>
		
		
		<view class="info-btn btn row_c " @tap="onClick">{{$t('Login')}}</view>
		<view class="register btn row_c" @tap="onNav('/pages/register/register')">{{$t('Register')}}</view>
		
		<view class="fid-b-l w100">
			<image class="b-img" src="/static/images/bot.png" mode="widthFix"></image>
		</view>
		<lang></lang>
	</view>
</template>

