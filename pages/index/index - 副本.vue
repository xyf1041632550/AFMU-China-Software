<style src='./index.css'></style>
<script src="./index.js"></script>
<template>
	<view>
		<uni-nav-bar  backgroundColor="#ffffff" title="图片对比" :border="false"></uni-nav-bar>
		<view class="canvas-box col_c">
			<canvas class="canvas" :style="{width:width+'px',height:width+'px'}"  canvas-id="myCanvas" id="myCanvas"></canvas>
		</view>
		
		<view class="btn row_c" @click="saveImg">选择第一张图</view>
		
		<view class="canvas-box col_c">
			<canvas class="canvas" :style="{width:width+'px',height:width+'px'}"  canvas-id="myCanvas1" id="myCanvas1"></canvas>
		</view>
		
		<view class="btn row_c" @click="saveImg1">选择第二张图</view>
		<view class="btn row_c" @click="onClick">获取差值</view>
		<view class="cha row_c">{{chazhi}}</view>
	</view>
</template>
