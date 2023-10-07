<style  src="./exercise.css"></style>
<script src="./exercise.js"></script>
<template>
	<view class="" >
		<uni-nav-bar leftIcon="back" backgroundColor="#4394EF" color='#fff' :title="$t('body building exercise')" :border="false"></uni-nav-bar>
		<view class="w100 row_a" style="margin-top: 40rpx;">
			<view class="video-box col_s">
				<view class="title row_c">{{$t('large cardinal')}}</view>
				<video class="video" :custom-cache='false' poster="/static/images/fm.png" object-fit="contain" src="/static/images/url.mp4"    controls ></video>
			</view>
			<view class="video-box col_s">
				<view class="title row_c">{{$t('Small cardinality')}}</view>
				<video class="video" :custom-cache='false' poster="/static/images/fm.png" object-fit="contain" src="/static/images/url.mp4"    controls ></video>
			</view>
		</view>
	</view>
</template>

