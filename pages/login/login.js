
export default {
	components: {
		
	},


	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		// this.accout='18670913320';
		// this.password='123456'
		
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {
		
	},

	methods: {
		
		//
		onClick() {
			if(!uni.getStorageSync('user')){
				this.mint.toast(this.$t('Please Register'));
				return
			}
			
			uni.reLaunch({
				url:'/pages/index/index'
			})
		},
		
		
		
		
		

	},



	/**
	 * 生命周期函数--下拉刷新
	 */
	onPullDownRefresh() {


	},


	/**
	 * 生命周期函数--触底
	 */
	onReachBottom() {

	},

	data() {
		return {
			accout:'',
			password:'',
			isGre:false
		}
	},


}
