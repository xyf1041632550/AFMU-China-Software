<style src='./result.css'></style>
<script src="./result.js"></script>
<template>
	<view>
		<view class="top row_e">
			<image class="top-icon" src="/static/images/top.png" mode="widthFix"></image>
			<view class="title row_c">{{$t('tab.page3')}}</view>
		</view>
		<view class="fid-b-l w100">
			<image class="b-img" src="/static/images/bot.png" mode="widthFix"></image>
		</view>
		<view class="list col_s fid-t-l" v-if="info">
			<view class="list-title row_c">
				{{$t('report')}}
			</view>
			<view class="number row_c">{{$t('number')}}{{info.num}}</view>
			<view  class="box row_s ree" >
				<view class="box-title">{{$t('Name')}}</view>
				<view class="box-txt">{{info.name}}</view>
			</view>
			<view  class="box row_s ree" >
				<view class="box-title">{{$t('Sex')}}</view>
				<view class="box-txt">{{info.sex==1?$t('man'):$t('woman')}}</view>
			</view>
			<view  class="box row_s ree" >
				<view class="box-title">{{$t('Height')}}</view>
				<view class="box-txt">{{info.height}}cm</view>
			</view>
			<view  class="box row_s ree" >
				<view class="box-title">{{$t('Weight')}}</view>
				<view class="box-txt">{{info.weight}}kg</view>
			</view>
			<view  class="box row_s ree" >
				<view class="box-title">{{$t('Age')}}</view>
				<view class="box-txt">{{info.age}}</view>
			</view>
			<view  class="box row_s ree" >
				<view class="box-title">BMI</view>
				<view class="box-txt">{{info.bmi}}</view>
			</view>
			<view  class="box row_s ree" >
				<view class="box-title">{{$t('chromatism')}}</view>
				<view class="box-txt">{{info.chromatism}}</view>
			</view>
			<view class="zhpj row_c">{{$t('overall merit')}}</view>
			<view class="pj-txt"><text>{{info.name}}{{result}}</text></view>
		</view>
		
		<defaultBox txt='暂无报告单' v-else></defaultBox>
		
		
		<lang @change='changeLang'></lang>
	</view>
</template>
