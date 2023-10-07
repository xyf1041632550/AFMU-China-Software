<style src='./my.css'></style>
<script src="./my.js"></script>
<template>
	<view>
		<view class="top row_e">
			<image class="top-icon" src="/static/images/top.png" mode="widthFix"></image>
			<view class="title row_c">{{$t('Search Records')}}</view>
		</view>
		<view class="fid-b-l w100">
			<image class="b-img" src="/static/images/bot.png" mode="widthFix"></image>
		</view>
		<view class="w100 col_c fid-t-l" style="z-index: 99;top: 25vh;height: 50vh;">
			<view class="box box-nor row_b" @click="onNav('/pages/my/book/book')">
				<text>{{$t('Science Popularization Handbook')}}</text>
				<image class="box-right" src="/static/images/right.png" mode=""></image>
			</view>
			
			<view class="box box-act row_b">
				<text>{{$t('Nutritional conditioning')}}</text>
				<image class="box-right" src="/static/images/right-n.png" mode=""></image>
			</view>
			
			<view class="box box-nor row_b" @click="onNav('/pages/my/exercise/exercise')">
				<text>{{$t('body building exercise')}}</text>
				<image class="box-right" src="/static/images/right.png" mode=""></image>
			</view>
			
			<view class="box box-act row_b">
				<text>{{$t("Physician's advice")}}</text>
				<image class="box-right" src="/static/images/right-n.png" mode=""></image>
			</view>
		</view>
		<lang></lang>
	</view>
</template>
