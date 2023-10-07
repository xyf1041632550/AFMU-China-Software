<template>
	<view class="mask fid-all col_c">
		<textarea v-model='html' maxlength="99999" class="text"></textarea>
		<view class="btn auth-btn row_c " @click="comText">立即计算</view>
		<!-- <span>{{content}}</span> -->
		
		
		<!-- <view class=" abe-b-r row_c"  @click='copy'>复制</view> -->
	</view>
</template>

<script>
	import uniCopy from '@/lib/uni-copy.js'
	export default {
		components: {},
		
		data() {
			return {
				isShow: false,
				html: '',
				nhtml:''
			}
		},
		mounted() {
			

		},
		methods: {
			
			comText() {
			      var str = this.html;
			      var re =
			        /row_c|row_b|row_s|row_e|col_c|col_s|col_e|col_b|row_a|row_e|ree|abe-t-l|abe-b-l|abe-t-r|abe-b-r|fid-t-l|fid-b-l|fid-t-r|fid-b-r|abe-all|fid-all|nowarp|btn/gi;
			      var output = str.replace(re, function(sMatch) {
			        return sMatch.replace(/./g, "");
			      });
			
			      var ree =/row|col/gi;
			       output=output.replace(ree, function(sMatch) {
			        return sMatch.replace(/./g, "");
			      });
			      
			      var srcReg = /class=[\"]?([^\"]*)[\"]?/g;
			      var arr = output.match(srcReg);
			      var list = [];
			      list = Array.from(new Set(arr));
			      let lists = [];
			      list.map(v => {
			        let k = v.replace(/class=|"|'/gi, "")
			        lists.push(k);
			      })
				
			      let content = '';
			      lists.map(v => {
			        if(v){content += '.' + v + '{\n\n}\n\n'};
			      })
			      this.nhtml = content;
				  this.html='';
			      let this_=this;
			      setTimeout(()=>{this_.copy()},500)
			    },
				
			// 触发方法
			copy() {
				uniCopy({
					content: this.nhtml,
					success: (res) => {
						uni.showToast({
							title: res,
							icon: 'none'
						})
					},
					error: (e) => {
						uni.showToast({
							title: e,
						})
					}
				})
			},
		}
	}
</script>

<style>
	.mask {
		/* background-color: rgba(0, 0, 0, 0.6); */
	}
	.text{
		width: 90%;
		height: 600rpx;
		background-color: #f3f3f3;
		border:#000 1px solid;
	}
	

	.auth-btn {
		margin-top: 50rpx;
		width: 248rpx;
		height: 80rpx;
		background: #FFFFFF;
		border: 2rpx solid #D2D2D2;
		border-radius: 40rpx;
		font-size: 32rpx;
		
		font-weight: bold;
		color: #AEAEAE;
		line-height: 50rpx;
border: 2rpx solid #19d5ff;
		background: #19d5ff;
		color: #FFFFFF;

	}

	.btn-act {
		border: 2rpx solid #E62A1A;
		background: #E62A1A;
		color: #FFFFFF;
	}
</style>
