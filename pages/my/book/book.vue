<style  src="./book.css"></style>
<script src="./book.js"></script>
<template>
	<view class="page" >
		<uni-nav-bar leftIcon="back" backgroundColor="#4394EF" color='#fff' :title="$t('Science Popularization Handbook')" :border="false"></uni-nav-bar>
		<view class="w100" v-for="(item,index) of list" :key="index">
			<image class="w100" :src="item" mode="widthFix"></image>
		</view>
	</view>
</template>

