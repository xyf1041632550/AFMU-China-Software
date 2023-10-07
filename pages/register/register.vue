<style src='./register.css'></style>
<script src="./register.js"></script>
<template>
	<view >
		<view class="floor-50"></view>
		<view class="w100 col_s" style="margin-top: 180rpx;margin-bottom: 80rpx;">
			<image class="login-logo" src="/static/images/logo.png" mode="widthFix"></image>
		</view>
		
		<view class="back-box fid-t-l row_c" @click="onBack" style="top: 120rpx;">
			<image class="back-icon" src="/static/images/back.png" mode="widthFix"></image>
			<view class="">{{$t('Back')}}</view>
		</view>
		
		<view class="list col">
			<view  class="box row_s ree" >
				<image class="box-icon" src="/static/images/xm.png" mode="aspectFit" ></image>
				<input class="box-ipt"  v-model="name" maxlength="11" placeholder-style="color:#888" :placeholder="$t('Name')"/>
			</view>
			<view  class="box row_s ree" >
				<image class="box-icon" src="/static/images/xb.png" mode="aspectFit" ></image>
				<!-- <input class="box-ipt"   v-model="sex" maxlength="11" placeholder-style="color:#888" :placeholder="$t('Sex')"/> -->
				<view class="box-ipt row_b ree" style="z-index: 50;">
					<uni-data-select styleText='font-size: 40rpx;
	
	font-weight: normal;
	color: #4394EF;
	line-height: 52rpx;'
					      v-model="sex"
					      :localdata="range"
						  :placeholder="$t('Please select')"
					    >
						</uni-data-select>
						<image style="width: 34rpx;" src="/static/images/sjx.png" mode="widthFix"></image>
				</view>
				
			</view>
			<view class="w100 row_b" style="width: 690rpx;margin: 0 auto ;">
				<view  class="box row_s ree" style="width: 49%;">
					<image class="box-icon" src="/static/images/sg.png" mode="aspectFit" ></image>
					<input class="box-ipt" type="digit"  style="width: 210rpx;"  v-model="height" maxlength="11" placeholder-style="color:#888" :placeholder="$t('Height')"/>
					<view class="unit abe-b-r">cm</view>
				</view>
				<view  class="box row_s ree" style="width: 49%;">
					<image class="box-icon" src="/static/images/tz.png" mode="aspectFit" ></image>
					<input class="box-ipt" type="digit"  style="width: 210rpx;" v-model="weight" maxlength="11" placeholder-style="color:#888" :placeholder="$t('Weight')"/>
					<view class="unit abe-b-r">kg</view>
				</view>
			</view>
			<view  class="box row_s ree" >
				<image class="box-icon" src="/static/images/nn.png" mode="aspectFit" ></image>
				<input class="box-ipt" type="number"  v-model="age" maxlength="3" placeholder-style="color:#888" :placeholder="$t('Age')"/>
			</view>
		</view>
		
		<view class="register btn  row_c" @tap="onClick">{{$t('Register')}}</view>
		
		<lang classF="fid-t-r" @change='changeLang'></lang>
	</view>

	
</template>

