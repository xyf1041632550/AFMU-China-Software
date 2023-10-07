
export default {
	components: {},


	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		this.range=[
			{text:this.$t('man'),value:this.$t('1')},
			{text:this.$t('woman'),value:this.$t('2')},
		]
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {

	},

	methods: {
		changeLang(){
			this.range=[
				{text:this.$t('man'),value:this.$t('1')},
				{text:this.$t('woman'),value:this.$t('2')},
			]
			console.log(this.range)
		},
		onBack(){
			uni.navigateBack()
		},
		//onClick
		onClick() {
			if (!this.$Global.tool.checkClick()) {
				return
			};
			if (!this.name) {
				this.mint.alert(this.$t('Please enter Name'));
				return
			}
			if (!this.sex) {
				this.mint.alert(this.$t('Please select Sex'));
				return
			}
			if (!this.weight) {
				this.mint.alert(this.$t('Please enter Weight'));
				return
			}
			if (!this.height) {
				this.mint.alert(this.$t('Please enter Height'));
				return
			}
			if (!this.age) {
				this.mint.alert(this.$t('Please enter age'));
				return
			}
			let user={
				name:this.name,
				sex:this.sex,
				weight:this.weight,
				height:this.height,
				age:this.age,
				num:parseInt(new Date().getTime()/100000),
				bmi:(parseFloat(this.weight)/Math.pow(parseFloat(this.height/100),2)).toFixed(2),
				chromatism:0,
				}
			uni.setStorageSync('user',user)
			uni.navigateBack()
			
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
			id: '',
			age:'',
			name:'',
			sex:'',
			weight:'',
			height:'',
			range:[],
		}
	},

}
