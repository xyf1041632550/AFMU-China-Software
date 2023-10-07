<template>

	<view :class="classF" @click="onClick">
		<image class="en" src="/static/images/en.png" v-if="isEn" mode="widthFix"></image>
		<image class="en" src="/static/images/ch.png" v-else mode="widthFix"></image>
	</view>


</template>

<script>
	
	export default {
		components: {},
		props: {
			classF: {
				type: String,
				default: 'fid-t-l',
			},
		},
		data() {
			return {
				isEn:false
				
			}
		},
		methods: {
			
			onClick() {
				console.log(uni.getLocale())
				if(uni.getLocale()=='en'){
					uni.setLocale('zh-Hans');
					this.$i18n.locale = 'zh-Hans'
					this.isEn=false;
				}else{
					uni.setLocale('en');
					this.$i18n.locale = 'en'
					this.isEn=true;
				}
				
				this.$emit('change');
			},
			
		},
		created() {
			if(uni.getLocale()=='en'){
				this.isEn=true;
			}else{
				this.isEn=false;
			}
		}
	}
</script>

<style scoped>
	.en {
		width: 100rpx;
		margin: 80rpx;
	}


</style>
