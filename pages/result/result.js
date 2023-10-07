
export default {
	components: {

	},

	onLoad(op) {
		
	},
	onReady(){
		
	},
	onShow(){
		console.log((parseFloat('77')/Math.pow(parseFloat('1.70'),2)).toFixed(2))
		this.getInfo();
	},
	methods: {
		getInfo(){
			this.info=uni.getStorageSync('user');
			if(!this.info){
				return
			}
			if(this.info.chromatism<1000){
				this.result=this.$t('merit1');
			}else if(this.info.chromatism<2000){
				this.result=this.$t('merit2');
			}else{
				this.result=this.$t('merit3');
			}
			console.log(this.result)
		},
		changeLang(){
			if(this.info.chromatism<1000){
				this.result=this.$t('merit1');
			}else if(this.info.chromatism<2000){
				this.result=this.$t('merit2');
			}else{
				this.result=this.$t('merit3');
			}
		}
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
		// this.getList();
	},

	

	data() {
		return {
			info:{},
			result:'',
		}
	}

}