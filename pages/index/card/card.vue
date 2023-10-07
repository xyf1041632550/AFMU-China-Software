<style src='./card.css'></style>
<script src="./card.js"></script>
<template>
	<view class="">
		<view class="top row_e">
			<image class="top-icon" src="/static/images/top.png" mode="widthFix"></image>
			<view class="title row_c">{{$t('Search Records')}}</view>
		</view>
		
		<lang></lang>
		<view class="container fid-t-l" style="width: 90%;height: 60vh;left: 5%;top: 20vh;">
			<view class="cropper">
				<!-- <bt-cropper ref="croper" :info='info' :cropMask='false'  :ratio="ratio" :dWidth="400" fileType="png"  @change="onChange"
					:imageSrc="imageSrc" :mask="mask">
				</bt-cropper> -->
				<bt-cropper ref="croper" :imageSrc="imageSrc"></bt-cropper>
			</view>
			
		</view>
		<view class="bot-bg fid-b-l">
			<image class="bot-bg" src="/static/images/bot-bg.png" mode="widthFix"></image>
			<view class="bot-bg1 row_b abe-all">
				<view class="btn row_c" @click="chooseImage">
					{{$t('retake')}}
					<image class="icon" src="/static/images/no.png" mode=""></image>
				</view>
				
				<view class="yuan"></view>
				<!-- <view class="btn back" @click="onBack">
					返回
				</view>
				
				<view class="btn choose" @click="chooseImage">
					选择图片
				</view> -->
				<view class="btn row_c" @click="onCrop">
					{{$t('Confirm')}}
					<image class="icon" src="/static/images/ok.png" mode=""></image>
				</view>
			</view>
			
		</view>
		
		
		<view class="canvas-box col_c fid-t-l" style="left: -115px;">
			<canvas class="canvas" :style="{width:width+'px',height:width+'px'}"  canvas-id="myCanvas" id="myCanvas"></canvas>
		</view>
		
		<!-- <view class="btn row_c" @click="saveImg">选择第一张图</view> -->
		
		<view class="canvas-box col_c fid-t-l" style="left: -115px;top:100px">
			<canvas class="canvas" :style="{width:width+'px',height:width+'px'}"  canvas-id="myCanvas1" id="myCanvas1"></canvas>
		</view>
		
		<!-- <view class="btn row_c" @click="saveImg1">选择第二张图</view>
		<view class="btn row_c" @click="onClick">获取差值</view>
		<view class="cha row_c">{{chazhi}}</view> -->
		
	</view>
</template>

<style lang="scss" scoped>
	.container {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		// #ifndef H5
		height: 100vh;
		// #endif
		// #ifdef H5
		height: 100%;
		// #endif
		background-color: #000;
		.cropper{
			flex: 1;
		}
	}
	
	

	.footer {
		width: 100%;
		height: 100rpx;
		.scroller {
			// align-items: center;
			width: 100vw;
			height: 100rpx;
			touch-action: none;

			.scrollerContainer {
				display: flex;
				flex-wrap: nowrap;
				height: 100rpx;
				align-items: center;
			}

			.item {
				display: flex;
				justify-content: center;
				align-items: center;
				margin-left: 40rpx;
				width: 70rpx;
				height: 70rpx;
				flex-shrink: 0;
				color: #FFFFFF;

				&.active {
					color: #0070F3;

					.itemContent {
						border: 1px solid #0070F3;
					}
				}

				.itemContent {
					border-radius: 10rpx;
					padding: 10rpx;
					border: 1px solid #FFFFFF;
					font-size: 16rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					white-space: nowrap;
				}

				.ratio-1-1 {
					width: 70%;
					height: 70%;
				}

				.ratio-16-9 {
					width: 100%;
					height: 56.25%;
				}

				.ratio-9-16 {
					width: 56.25%;
					height: 100%;
				}

				.ratio-4-3 {
					width: 100%;
					height: 75%;
				}

				.ratio-3-4 {
					width: 75%;
					height: 100%;
				}

				.ratio-3-2 {
					width: 100%;
					height: 66.6%;
				}

				.ratio-2-3 {
					width: 66.6%;
					height: 100%;
				}
			}
		}

		
	}
</style>
